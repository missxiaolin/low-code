import attrJson from "./attrJson.json";
import tagsJson from "./tagsJson.json";

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
 * @param {*} oldAttr
 * @param {*} tag
 * @param {*} v
 * @returns
 */
export function getAttrJson(oldAttr, tag, v) {
  let arr = [];
  let tagAttr = tagsJson[tag];
  let attrValKeys = tagAttr ? tagAttr[v] : null;
  let json = attrJson[v];
  if (!tag || !tagAttr || !attrValKeys || !json) {
    return [];
  }
  attrValKeys.forEach((item) => {
    let obj = json[item];
    if (obj) {
      obj.value = oldAttr[item] || "";
      arr.push(obj);
    }
  });

  return arr;
}
