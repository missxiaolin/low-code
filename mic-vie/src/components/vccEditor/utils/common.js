import { customAlphabet, nanoid } from "nanoid";

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

export function getRawComponentKey(__rawVueInfo__) {
  return Object.keys(__rawVueInfo__)[0];
}

export function getRawComponentContent(__rawVueInfo__) {
  return __rawVueInfo__[getRawComponentKey(__rawVueInfo__)];
}

/**
 * @description 生成唯一ID
 */
export function createUniqueId() {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return nanoid();
}

/**
 * 获得一个数据节点的lc_id属性值
 * @param {*} __rawVueInfo__
 * @returns
 */
export function getVueInfoLcid(__rawVueInfo__) {
  const lcid = getRawComponentContent(__rawVueInfo__).lc_id;
  return lcid;
}

/**
 * 是组件库的组件
 * @param {*} __rawVueInfo__
 * @returns
 */
export function isRawComponents(__rawVueInfo__) {
  const lcid = getVueInfoLcid(__rawVueInfo__);
  return !!window.templateSourceMap[lcid];
}

/**
 * 获得一个DOM节点的组件父DOM节点
 * @param {*} parentNode 要传入parentDom
 * @returns
 */
export function findParentDom(parentNode) {
  if (parentNode.attributes && parentNode.attributes.lc_id) {
    return parentNode;
  } else if (parentNode.parentNode) {
    return findParentDom(parentNode.parentNode);
  } else {
    return null;
  }
}
