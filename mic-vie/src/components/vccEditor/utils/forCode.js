import {
  findVueInfo,
  isObject,
  getRawComponentKey,
  createUniqueId,
  isArray,
  findParentDom,
} from "./common";
import presetAttribute from "../../../libs/presetAttribute";

// 将预生成的ID替换，否则当有两个组件挂在同一个树上时，后一个会将前一个的属性覆盖
export function replaceRowID(codeObj, html) {
  // 生成一个唯一的ID，使Code和Dom一一对应，与原代码脱离关系
  let newHtml = html;
  function deep(obj) {
    if (isObject(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const element = obj[key];
          if (key == "lc_id") {
            const oldID = obj[key];
            const newID = createUniqueId();
            newHtml = newHtml.replace(oldID, newID);
            obj[key] = newID;
          } else if (isObject(element)) {
            deep(element);
          } else if (isArray(element)) {
            element.forEach((item) => deep(item));
          }
        }
      }
    }
  }
  deep(codeObj);
  return newHtml;
}

export function generateRawInfo(target) {
  if (target.querySelector(".title")) {
    target = target.querySelector(".title");
  }
  if (target.attributes.lc_id) {
    return findVueInfo(target);
  } else {
    // 这是一个普通的元素
    const temp = {
      [target.localName]: {
        __text__: target.innerText,
        class: target.className,
      },
    };
    return temp;
  }
}

// 特殊分隔符
export function getSplitTag() {
  return "@#$!";
}

export function flatCodeObj(codeObj) {
  function deep(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];

        // 如果对__children的子属性遍历时，它内部的元素需要指向外层的节点作为父节点
        if (
          object.hasOwnProperty("__key__") &&
          object["__key__"] === "__children" &&
          isObject(element)
        ) {
          delete object["__key__"];
        }

        if (key === "lc_id" && object.hasOwnProperty("__key__")) {
          const outerKey = object["__key__"];
          const newObj = {
            [outerKey]: object,
          };

          // 这个关系也需要链接
          newObj.__proto__ = object.__proto__;
          delete object.__key__;
          window.tree[element] = newObj;
        } else if (key === "__children") {
          object.__children.forEach((child) => {
            child["__key__"] = key;
            deep(child);
          });
        } else if (isObject(element)) {
          element["__key__"] = key;
          deep(element);
        }
      }
    }
  }
  deep(codeObj);
}

/** 在这里维护一棵以ID为KEY的树 */
export function updateLinkTree(codeObj) {
  if (!window.tree) {
    window.tree = {};
  }

  flatCodeObj(codeObj);
}

export function insertPresetAttribute(vueInfo) {
  const key = getRawComponentKey(vueInfo);
  const value = vueInfo[key];
  const presetAttr = presetAttribute[key];
  if (presetAttr) {
    for (const key in presetAttr) {
      if (presetAttr.hasOwnProperty(key)) {
        // 将原先的属性做新增或者替换操作
        const element = presetAttr[key];
        value[key] = element;
      }
    }
  }
}

/**
 * 获取这个元素所对应的代码结构
 */
export function findRawVueInfo(element) {
  const parentDom = findParentDom(element);
  return findVueInfo(parentDom);
}

export function merge(
  o1,
  o2,
  currentPointPositionAfterIndex = -1,
  onFinish = () => {}
) {
  if (o1 && o2) {
    if (!o1["__children"]) {
      o1["__children"] = [];
    }
    // 更新结构关系，将插入到指定的位置
    if (currentPointPositionAfterIndex > -1) {
      o1["__children"].splice(currentPointPositionAfterIndex, 0, o2);
    } else {
      o1["__children"].push(o2);
    }
    onFinish();

    // 这里踩了一个坑，所有的对象的默认属性__proto__都指向同一个对象，会引起意外的问题
    o2.__proto__ = { parentCodeNode: o1 };
  }
}
