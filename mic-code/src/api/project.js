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

/**
 * 获取全部
 * @param {*} data
 * @returns
 */
export function getProjectAll(data) {
  return request({
    url: "/adm/project/all",
    method: "post",
    data,
  });
}

/**
 * 生成代码
 * @param {*} data
 * @returns
 */
export function projectGenerate(data) {
  return request({
    url: "/adm/project/generate",
    method: "post",
    data,
  });
}

export function getRemoteEntry(data) {
  return request({
    url: "/adm/project/remote/entry",
    method: "get",
    params: data,
  });
}
