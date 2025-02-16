import { request } from "../utils/fetch";

/**
 * 页面保存
 * @param data
 * @returns
 */
export function pageRouteSave(data) {
  return request({
    url: "/adm/dp/page/save",
    method: "post",
    data,
  });
}

/**
 * 页面详情
 * @param {*} data
 * @returns
 */
export function pageRouteDetail(data) {
  return request({
    url: "/adm/dp/page/detail",
    method: "post",
    data,
  });
}

/**
 * 页面列表
 * @param {*} data
 * @returns
 */
export function pageRouteList(data) {
  return request({
    url: "/adm/dp/page/list",
    method: "post",
    data,
  });
}
