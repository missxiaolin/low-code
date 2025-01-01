/** 统一处理 Cookie */

import CacheKey from "../../constants/cache-key";
import Cookies from "js-cookie";
export function getDomain() {
  // 获取前端域名
  let host = location.host,
    domain = "";
  if (host.includes(".missxiaolin.com")) {
    domain = ".missxiaolin.com";
  } else {
    domain = "localhost";
  }
  return domain;
}

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN, {
    domain: getDomain(),
  });
};
export const setToken = (token) => {
  Cookies.set(CacheKey.TOKEN, token, {
    domain: getDomain(),
  });
};
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN, {
    domain: getDomain(),
  });
};

/**
 * 存储
 * @param key
 * @param value
 */
export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    domain: getDomain(),
  });
};

/**
 * 取
 * @param key
 * @returns
 */
export const getCookie = (key) => {
  return Cookies.get(key, {
    domain: getDomain(),
  });
};
