/**
 * 获得一个节点对应的数据信息，这个函数不负责向上递归查找
 * @param {*} element
 * @returns
 */
export function findVueInfo(element) {
  if (element) {
    const lcid = element.attributes.lc_id.nodeValue;
    // 获取源代码结构
    let rowCode = window.templateSourceMap[lcid];

    if (!rowCode && window.tree) {
      // 如果不在templateSourceMap，则可能当前的操作是在渲染面板上，这部分数据存放在tree中
      rowCode = window.tree[lcid];
    }
    return rowCode;
  } else {
    return null;
  }
}

/**
 * 比较两个对象是否完全相等
 */
export function compareTwoObjectIsEqual(o1, o2) {
  return isEqual(o1, o2);
}

export function isArray(arr) {
  return Object.prototype.toString.apply(arr) === "[object Array]";
}

export function isObject(obj) {
  return Object.prototype.toString.apply(obj) === "[object Object]";
}

/**
 * @description 生成唯一ID
 */
export function createUniqueId() {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return nanoid();
}
