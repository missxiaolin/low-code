import attrJson from "./attrJson.json";
import tagsJson from "./tagsJson";

/**
 * style to obj
 * @param {*} str
 * @returns
 */
export function stringToObj(str) {
  const styles = str.split(";").reduce((obj, item) => {
    const [key, value] = item.split(":").map((item) => item.trim());
    if (key && value) {
      obj[key] = value;
    }
    return obj;
  }, {});
  return styles;
}

/**
 * 数据拍平
 * @param {*} tags
 * @returns
 */
export function getAttrKeys(tags) {
  const flattenedObject = tags.reduce((obj, item) => {
    const { key, value } = item;
    obj[key] = value;
    return obj;
  }, {});
  return flattenedObject;
}

/**
 * 获取属性
 * @param {*} oldAttr
 * @param {*} tag
 * @param {*} v
 * @returns
 */
export function getAttrJson(oldAttr, tag, v, attrObj = {}) {
  const aJson = JSON.parse(JSON.stringify(attrJson));

  let arr = [];
  let tagAttr = tagsJson[tag];
  // 远程组件
  if (!tagAttr && tag === "mic-async-component") {
    const vccAsyncComponents = window.vccAsyncComponents;
    let obj = {};
    vccAsyncComponents.forEach((item) => {
      if (
        attrObj.component_name &&
        item.componentName == attrObj.component_name
      ) {
        try {
          obj = item.attribute ? JSON.parse(item.attribute) : {};
        } catch (error) {}
      }
    });
    tagAttr = obj;
  }
  let attrValKeys = tagAttr ? tagAttr[v] : null;
  if (!tagAttr || !attrValKeys) {
    return [];
  }
  const att = aJson[v];
  Object.keys(att).forEach((a) => {
    let obj = {
      key: a,
      title: att[a].title,
      children: [],
    };
    if (att[a].children && att[a].children.length > 0) {
      att[a].children.forEach((item) => {
        if (attrValKeys.includes(item.key)) {
          item.value = oldAttr[item.key] ? oldAttr[item.key] : item.value;
          item.value = item.value == "false" ? false : item.value;
          item.value = item.value == "true" ? true : item.value;
          obj.children.push(item);
        }
      });
      arr.push(obj);
    }
  });

  const nV = v.charAt(0).toUpperCase() + v.slice(1);
  if (tagAttr[`custom${nV}`]) {
    let customObj = tagAttr[`custom${nV}`];
    arr.forEach((item) => {
      if (customObj[item.key]) {
        let c = customObj[item.key].children;
        c.forEach((item) => {
          if (
            Object.keys(attrObj).length > 0 &&
            Object.keys(attrObj).includes(item.key)
          ) {
            item.value = attrObj[item.key];
            item.value = item.value == "false" ? false : item.value;
            item.value = item.value == "true" ? true : item.value;
          }
        });
        item.children = item.children.concat(customObj[item.key].children);
      }
    });
  }

  return arr;
}
