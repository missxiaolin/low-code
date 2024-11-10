import { isArray, isObject } from "@vue/shared";
import stringifyObject from "@/libs/stringify-object";
import merge from "lodash-es/merge";
import prettier from "prettier/standalone.js";
import parserBabel from "prettier/parser-babel.js";

/**
 * @param {*} origin
 * @param {*} target
 * @returns
 */
export const deepClone = (origin, target) => {
  const tar = target || {};
  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === "object" && typeof origin[key] !== null) {
        tar[key] = isArray(origin[key]) ? [] : {};
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
};

/**
 * 解析字符串，例如'xx?a={a}&b={b}' ==> 'xx?a=123&b=456'
 * @param fullPath 需要解析的url
 * @param currentNode 参与解析对象
 * @returns 解析后url
 */
export function extUrl(fullPath, currentNode = {}) {
  let url = fullPath;
  let RegArr = url.match(/\{(.+?)\}/g) || [];
  if (!RegArr.length) return "";

  RegArr.forEach((item) => {
    const key = item.slice(1, -1);
    if (currentNode[key]) {
      url = url.replace(item, currentNode[key]);
    } else {
      url = url.replace(item, "*");
    }
  });

  return url;
}

/**
 * 指定长度和基数
 * @param {*} len
 * @param {*} radix
 * @returns
 */
export function uuid(len, radix) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}

export function replaceKeyInfo(dataTemp, externalJS) {
  // 转化为对象
  const JSCodeInfo = eval(`(function(){return ${dataTemp}})()`);
  
  // 合并外部脚本对象
  let externalData = {};

  if (externalJS && typeof externalJS.data === "function") {
    externalData = externalJS.data();
    // 防止在后面的生成污染新的对象
    delete externalJS.data;
  }

  // 生成新的data返回值
  let newData = merge({}, externalData);
  try {
    for (let key in JSCodeInfo.data()) {
      newData[key] = JSCodeInfo.data()[key]
    }
  } catch(e) {

  }

  const dataFunction = new Function(`return ${stringifyObject(newData)}`);

  JSCodeInfo.data = dataFunction;

  let externalJSLogic = {};

  if (externalJS) {
    externalJSLogic = externalJS;
  }

  const mergedJSObject = merge(JSCodeInfo, externalJSLogic);

  // 序列化为脚本代码
  const finalJSCode = stringifyObject(mergedJSObject, {
    transform: (object, property, originalResult) => {
      if (
        !originalResult.match(/^\([^\(]+/g) &&
        !originalResult.match(/^\{/g)
      ) {
        // 不对以(/{ 开头的情况做处理，只对包含有方法名的情况做处理
        const after = originalResult.replace(
          /[^\(]+?\(([\w,\s]*)\)/,
          "($1)=>"
        );
        return after;
      }

      return originalResult;
    },
  });

  const beautiful = prettier.format(`export default ` + finalJSCode, {
    semi: false,
    parser: "babel",
    plugins: [parserBabel],
  });

  const excludeUnuseal = beautiful.replace("export default ", "");

  return excludeUnuseal
}

/**
 * @param {*} d 
 * @param {*} fn
 * @returns 
 */
export function getJsTemData(d, fn = []) {
  const data = JSON.stringify(d)
  let f = ''
  if (fn && fn.length > 0) {
    f = fn.join(',');
  }
  return `{
    data() {
      return ${data}
    },
    methods: {
      ${f}
    }
  };`
}