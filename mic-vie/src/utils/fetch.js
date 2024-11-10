import axios from "axios";
import { ElMessage } from "element-plus";
import { get, merge } from "lodash-es";
import { getCookie, getToken } from "./cache/cookies";

/** 退出登录并强制刷新页面（会重定向到登录页） */
function logout() {
  window.microApp.dispatch({isPushLogin: true})
}

/** 创建请求实例 */
function createService() {
  // 创建一个 axios 实例命名为 service
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  );
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 api 返回的数据
      const apiData = response.data;
      // 这个 code 是和后端约定的业务 code
      const code = apiData.errorCode;
      if (code === 10000) {
        // Token 过期时
        return logout();
      } else if (!apiData.success) {
        ElMessage.error(apiData.errorMessage);
        return apiData;
      } else {
        return apiData;
      }
    },
    (error) => {
      // status 是 HTTP 状态码
      const status = get(error, "response.status");
      switch (status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          // Token 过期时
          logout();
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP 版本不受支持";
          break;
        default:
          break;
      }
      ElMessage.error(error.message);
      return Promise.reject(error);
    }
  );
  return service;
}

let baseURL = "http://micro-serve.missxiaolin.com"
const urls = ['127.0.0.1', "localhost", "mic.missxiaolin.com", "micro-adm-h.missxiaolin.com"]

if (urls.indexOf(window.location.hostname) > -1) {
  baseURL = "http://127.0.0.1:9002";
}

export {
  baseURL
}

/** 创建请求方法 */
function createRequest(service) {
  return function (config) {
    const token = getToken();
    const defaultConfig = {
      headers: {
        // 携带 Token
        Authorization: token ? `${token}` : undefined,
        MonitorAppId: getCookie("PROJECT_ID"),
        "Content-Type": "application/json",
      },
      timeout: 5000,
      baseURL: baseURL,
      data: {},
    };
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config);
    return service(mergeConfig);
  };
}

/** 用于网络请求的实例 */
const service = createService();
/** 用于网络请求的方法 */
export const request = createRequest(service);
