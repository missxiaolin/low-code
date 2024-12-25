import { request } from "../utils/fetch";

/**
 * 保存
 * @param data
 * @returns
 */
export function projectMenuSave(data) {
  return request({
    url: "/adm/project/menu/save",
    method: "post",
    data,
  });
}

/**
 * 列表
 * @param data
 * @returns
 */
export function projectMenuList(data) {
  return request({
    url: "/adm/project/menu/list",
    method: "post",
    data,
  });
}

/**
 * 获取所有
 * @param data
 * @returns
 */
export function projectMenuAll(data) {
  return request({
    url: "/adm/project/menu/all",
    method: "post",
    data,
  });
}
