import { findVueInfo, isObject } from "./common";

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
