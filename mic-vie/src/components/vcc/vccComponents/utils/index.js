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
export function getAttrJson(oldAttr, tag, v) {
  const aJson = JSON.parse(JSON.stringify(attrJson));

  let arr = [];
  let tagAttr = tagsJson[tag];
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
          item.value = oldAttr[item.key] || item.value;
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
        item.children = item.children.concat(customObj[item.key].children);
      }
    });
    console.log(arr);
  }

  return arr;
}
