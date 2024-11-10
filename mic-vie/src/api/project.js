import { request } from "../utils/fetch";

/**
 * 项目保存
 * @param data
 * @returns
 */
export function projectSave(data) {
  return request({
    url: "/adm/project/save",
    method: "post",
    data,
  });
}

/**
 * 列表
 * @param {*} data 
 * @returns 
 */
export function projectList(data) {
  return request({
    url: "/adm/project/list",
    method: "post",
    data,
  });
}

/**
 * 详情
 * @param {*} data 
 * @returns 
 */
export function projectDetail(data) {
  return request({
    url: "/adm/project/detail",
    method: "post",
    data,
  });
}