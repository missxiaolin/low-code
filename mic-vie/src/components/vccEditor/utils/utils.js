/**
 * @description: 角度转弧度
 * Math.PI = 180 度
 */
function angleToRadian(angle) {
  return (angle * Math.PI) / 180;
}

/**
 * 点旋转函数
 * @param point 被旋转的点
 * @param center 旋转中心
 * @param rotate 旋转弧度
 * @returns
 */
export function rotatePoint(point, center, rotate) {
  rotate = rotate ? rotate : 1;
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x:
      (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
      (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
      (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
      center.y,
  };
}

/**
 * style to obj
 * @param {*} str
 * @returns
 */
export function styleStringToObj(str) {
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
 * obj to array
 * @param {*} obj
 * @returns
 */
export function objectToArray(obj) {
  let result = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (
        typeof element !== "object" &&
        key != "lc-mark" &&
        key != "lc_id" &&
        key != "div-lc-mark" &&
        key != "vccName"
      ) {
        // 这两个是保留字段，不对外提供使用
        if (key != "") result.push({ key: key, value: element });
      }
    }
  }
  return result;
}

/**
 * {'top':20,'left':20,'width':300,'height':200}
 * @param {*} str
 * @returns
 */
export function attrStringToObj(str) {
  str = `(${str})`;
  const obj = eval(str);
  return obj;
}

/**
 * @param {*} obj
 * @returns
 */
export function attrObjToString(obj) {
  const jsonString = JSON.stringify(obj);
  const replacedString = jsonString.replace(/"/g, "'");
  return replacedString;
}

/**
 * 指定长度和基数
 * @param {*} len
 * @param {*} radix
 * @returns
 */
export function uuid(len, radix) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
