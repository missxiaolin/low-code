import { request } from "../utils/fetch";

/**
 * 列表
 * @param data
 * @returns
 */
export function componentList(data) {
  return request({
    url: "/adm/component/list",
    method: "post",
    data,
  });
}

/**
 * 保存
 * @param {*} data
 * @returns
 */
export function componentSave(data) {
  return request({
    url: "/adm/component/save",
    method: "post",
    data,
  });
}

/**
 * 详情
 * @param {*} data
 * @returns
 */
export function componentDetail(data) {
  return request({
    url: "/adm/component/detail",
    method: "post",
    data,
  });
}

/**
 * 发布
 * @param {*} data
 * @returns
 */
export function componentGenerate(data) {
  return request({
    url: "/adm/component/generate",
    method: "post",
    data,
  });
}
