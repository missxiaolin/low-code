import vueTemplate from "../template/index.js";
import { scriptTemplate } from "../template/script.js";
import { replaceDatas, replaceMethods, replaceStyles } from "./replace.js";
import { Parser } from "../utils/json2xml.js";
import stringifyObject from "stringify-object";
import _ from "lodash";
import prettier from "prettier/standalone.js";
import parserBabel from "prettier/parser-babel.js";

const { merge, cloneDeep } = _;

const rawAdd = Set.prototype.add;
try {
  //为何不能给add赋值？且没有报错？
  Set.prototype.addeee = function (value) {
    if (typeof value === "string" && checkKeyword(value))
      rawAdd.apply(this, arguments);
  };
  // 经验证可以赋值，而代码会直接跳转至最后一行
} catch (error) {
  console.error(error);
}

function checkKeyword(value) {
  return value != "true" && value != "false";
}

/**
 * @param {*} template
 * @param {*} jsonObj
 * @returns
 */
function replaceHtmlTemplate(template, jsonObj) {
  const defaultOptions = {
    attributeNamePrefix: "@_",
    attrNodeName: false, //default is false
    textNodeName: "#text",
    ignoreAttributes: false,
    cdataTagName: "__cdata", //default is false
    cdataPositionChar: "\\c",
    format: true,
    indentBy: "  ",
    supressEmptyNode: false,
    attributeProtectArray: [], // 哪些属性的值为''但需要渲染出来，默认：如果value为''就不生成key=value，只生成key
  };

  const parser = new Parser(defaultOptions);
  // 只面向代码生成使用，故jsonObj.template不能变更，2020年12月15日16:04:28
  const xml = parser.parse(jsonObj.template);

  return template.replace("<!--在此自动生成-->", xml);
}

function getVueTemplate() {
  return vueTemplate();
}

/**
 * 获取这个变量的实际key
 * @param {*} value
 */
function getVarName(value) {
  let result = null;
  if (/^[_a-z]{1}[_0-9a-zA-Z]*$/g.test(value)) {
    result = value;
  } else if (value.indexOf(".") > 0 && getVarName(value.split(".")[0])) {
    //这个case用于处理xxx.yy的情况，需提取出xxx
    result = value.split(".")[0];
  } else if (value.indexOf("in") > 0) {
    // 匹配v-for="xx in yy", 提取yy
    const temp = value.split(" in "); // 防止匹配到index这样容易混淆的变量
    if (temp.length === 2) {
      result = getVarName(temp[1].trim());
    }
  }
  return result;
}

/**
 * 从表达式中提取变量，这里情况特殊，不可以以大写字母开头，以驼峰命名为准
 * @param {*} expression
 */
function findVarFormExpression(expression) {
  if (typeof expression === "string") {
    let temp = expression.match(/[_a-z]{1}[_0-9a-zA-Z]*/g);
    if (!temp) {
      temp = [];
    }
    return temp;
  } else {
    return [];
  }
}

// 核心代码
export class CodeGenerator {
  constructor(options = {}) {
    this.options = options;
    // 解析后的Json对象
    this.jsonObj = null;
    // 类定义放入其中
    this.classSet = new Set();
    // 事件放入其中
    this.methodSet = new Set();
    // 数据引用放入其中
    this.dataSet = new Set();
    this.externalJS = {};
  }
  clearDataSet() {
    this.classSet.clear();
    this.methodSet.clear();
    this.dataSet.clear();
  }
  /**
   * 设置外部编辑代码
   * @param {*} code
   */
  setExternalJS(JSCodeInfo) {
    this.externalJS = cloneDeep(JSCodeInfo);
  }
  /**
   * 直接输入Json文本
   * @param {*} json
   */
  outputVueCode(json) {
    this.jsonObj = JSON.parse(json);
    return this.outputVueCodeWithJsonObj(this.jsonObj);
  }
  /**
   * 输入Json对象
   * @param {*} jsonObj
   */
  outputVueCodeWithJsonObj(_jsonObj) {
    this.jsonObj = _jsonObj;
    // 解析对象
    this.parseJson(_jsonObj);
    // 对集合进行排序
    this.dataSet = sort(this.dataSet);
    this.methodSet = sort(this.methodSet);
    this.classSet = sort(this.classSet);
    // 生成执行结果
    return this.generateResult();
  }

  // 将所有需要替换的内容通过装饰器逐步替换
  replaceKeyInfo() {
    // 将对象转换为html并替换
    const templateTemp = replaceHtmlTemplate(getVueTemplate(), this.jsonObj);
    // ==================== 生成脚本 ====================
    // 生成方法
    const methodTemp = replaceMethods(
      scriptTemplate,
      this.methodSet,
      this.options
    );
    // 生成data
    const dataTemp = replaceDatas(methodTemp, this.dataSet, this.options);
    // 转化为对象
    const JSCodeInfo = eval(`(function(){return ${dataTemp}})()`);
    // 合并外部脚本对象
    let externalData = {};
    if (this.externalJS && typeof this.externalJS.data === "function") {
      externalData = this.externalJS.data();
      // 防止在后面的生成污染新的对象
      delete this.externalJS.data;
    }
    // 生成新的data返回值
    const newData = merge({}, JSCodeInfo.data(), externalData);
    const dataFunction = new Function(`return ${stringifyObject(newData)}`);
    JSCodeInfo.data = dataFunction;
    let externalJSLogic = {};
    if (this.externalJS) {
      externalJSLogic = this.externalJS;
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
    // ==================== 生成脚本 ====================
    const beautiful = prettier.format(`export default ` + finalJSCode, {
      semi: false,
      parser: "babel",
      plugins: [parserBabel],
    });
    const excludeUnuseal = beautiful.replace("export default ", "");
    // 插入到最终模板
    const JSTemp = templateTemp.replace("// $script", excludeUnuseal);
    // 生成class
    const styleTemp = replaceStyles(JSTemp, this.classSet, this.options);
    return styleTemp;
  }
  // 分发解析结果
  deliveryResult(key, value) {
    if (key === "class") {
      const classes = value.split(" ");
      classes.forEach((item) => {
        // 处理多个空字符串
        if (!item) return;
        this.classSet.addeee(item);
      });
    } else if (/^v-on/g.test(key) || /^@/g.test(key)) {
      // 匹配@,v-on
      if (getVarName(value)) {
        this.methodSet.addeee(value);
      }
    } else if (/^v-/g.test(key) || /^:+/g.test(key)) {
      // 优先使Method消费，因为有的:也是method
      if (
        this.options.checkIsMethodDirectives &&
        this.options.checkIsMethodDirectives(key)
      ) {
        value = getVarName(value);
        value && this.methodSet.addeee(value);
      }
      // 业务侧可能会全部消费/^:+/g.test(key)
      else if (
        this.options.checkIsDataDirectives &&
        this.options.checkIsDataDirectives(key)
      ) {
        value = getVarName(value);
        value && this.dataSet.add(value);
      } else {
        this.options.unSupportedKey && this.options.unSupportedKey(key, value);
      }
    } else if (key === "__text__") {
      // 匹配v-text,{{}}
      if (/[{]{2}.+[}]{2}/g.test(value)) {
        // 用于匹配v-text {{}}
        const temp = findVarFormExpression(value);
        temp.forEach((element) => {
          this.dataSet.add(element);
        });
      }
    } else {
      // 通过回调给业务实现方做处理
      this.options.unSupportedKey && this.options.unSupportedKey(key, value);
    }
  }
  generateResult() {
    // 需要输出的结果有：
    // 1.html template
    // 1) 支持解析v-model/@click/
    // 2.script template
    // 3.style template
    // 返回一个格式化后的字符串
    return this.replaceKeyInfo();
  }
  // 递归解析Json
  parseJson(json) {
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key];
        if (value instanceof Array) {
          value.forEach((item) => this.parseJson(item));
        } else if (value instanceof Object) {
          this.parseJson(value);
        } else {
          this.deliveryResult(key, value);
        }
      }
    }
  }
}
