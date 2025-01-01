import { request } from "../utils/fetch";

/** 登录 */
export const login = (data) => {
  return request({
    url: "/adm/login",
    method: "post",
    data,
  });
};
