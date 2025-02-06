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
