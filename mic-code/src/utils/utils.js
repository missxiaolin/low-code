import { isArray, isObject } from "@vue/shared";

/**
 * @param {*} origin
 * @param {*} target
 * @returns
 */
export const deepClone = (origin, target) => {
  const tar = target || {};
  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === "object" && typeof origin[key] !== null) {
        tar[key] = isArray(origin[key]) ? [] : {};
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
};

/**
 * 解析字符串，例如'xx?a={a}&b={b}' ==> 'xx?a=123&b=456'
 * @param fullPath 需要解析的url
 * @param currentNode 参与解析对象
 * @returns 解析后url
 */
export function extUrl(fullPath, currentNode = {}) {
  let url = fullPath;
  let RegArr = url.match(/\{(.+?)\}/g) || [];
  if (!RegArr.length) return "";

  RegArr.forEach((item) => {
    const key = item.slice(1, -1);
    if (currentNode[key]) {
      url = url.replace(item, currentNode[key]);
    } else {
      url = url.replace(item, "*");
    }
  });

  return url;
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

// 获取树的深度
export function getTreeDepth(node) {
  if (!node) {
    return 0; // 如果节点为空，深度为0
  }

  let maxChildDepth = 0; // 当前节点的子节点的最大深度

  // 遍历当前节点的所有子节点，递归调用 getTreeDepth 函数获取子节点的深度
  for (const child of node.children || []) {
    const childDepth = getTreeDepth(child);
    if (childDepth > maxChildDepth) {
      maxChildDepth = childDepth;
    }
  }

  return maxChildDepth + 1; // 当前节点的深度为子节点的最大深度加1
}

/**
 * 获取某个对象的 key
 * @param object
 * @param path
 * @returns
 */
export function getObjectValueByPath(object, path) {
  return path.split(".").reduce((accumulator, currentKey) => {
    return (accumulator || {})[currentKey];
  }, object);
}

/**
 * 设置某个对象的 key
 * @param object
 * @param path
 * @param value
 */
export function setObjectValueByPath(object, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop(); // 获取最后一个键
  const targetObject = keys.reduce((accumulator, currentKey) => {
    // 确保每一层都有对象
    if (!accumulator[currentKey]) {
      accumulator[currentKey] = {};
    }
    return accumulator[currentKey];
  }, object);
  targetObject[lastKey] = value; // 设置新的值
}
