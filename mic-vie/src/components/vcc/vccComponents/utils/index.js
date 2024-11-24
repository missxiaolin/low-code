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
 * 获取属性
 * @param {*} oldAttr
 * @param {*} tag
 * @param {*} v
 * @returns
 */
export function getAttrJson(oldAttr, tag, v) {
  let arr = [];
  let tagAttr = tagsJson[tag];
  let attrValKeys = tagAttr ? tagAttr[v] : null;
  if (!tagAttr || !attrValKeys) {
    return [];
  }
  const att = attrJson[v];
  Object.keys(att).forEach((a) => {
    console.log(a);
    let obj = {
      title: att[a].title,
      children: [],
    };
    if (att[a].children && att[a].children.length > 0) {
      att[a].children.forEach((item) => {
        if (attrValKeys.includes(item.key)) {
          item.value = oldAttr[item.key] || "";
          obj.children.push(item);
        }
      });
      arr.push(obj);
    }
  });

  return arr;
}
