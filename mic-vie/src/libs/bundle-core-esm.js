//该文件会遍历Object，获取关键的class,事件,data, 最终拼装为一个完整的SFC文件

import postcss from "postcss";
import isRegexp from "is-regexp";
import isObject from "is-obj";
import _ from "lodash";
import prettier from "prettier/standalone.js";
import parserBabel from "prettier/parser-babel.js";
import { jsSetup } from "./setup";

// 导出组件模板文件

function vueTemplate() {
  return `
  <template> 
    <!--在此自动生成--> 
  </template>
  
<script>
import { // $vueExport } from "vue";
import events from "./events.json";
const vccEvents = events;
// $script
</script>
  
  <style scoped>
  /** $stylesTemplate */
  </style>
    `;
}

const scriptTemplate = `{
  data() {
    return {
      // $datas
    };
  },
  methods: {
    // $eventMethods
  },
  
};`;

function mergeSameClassStyles() {
  return {
    postcssPlugin: "merge-same-class-styles",
    Once: function (root) {
      const mergedRules = {};

      root.walkRules((rule) => {
        const selector = rule.selector;
        const declarations = rule.nodes;

        if (mergedRules[selector]) {
          declarations.forEach((declaration) => {
            const property = declaration.prop;
            const value = declaration.value;
            const important = declaration.important;

            if (mergedRules[selector][property]) {
              // Check if the property value is important and update accordingly
              if (important || !mergedRules[selector][property].important) {
                mergedRules[selector][property] = {
                  value: value,
                  important: important,
                };
              } else {
                const existingValue = mergedRules[selector][property].value;
                const newValue = value;

                if (existingValue !== newValue) {
                  // Compare and update if new value is greater
                  if (parseInt(newValue, 10) > parseInt(existingValue, 10)) {
                    mergedRules[selector][property] = {
                      value: value,
                      important: important,
                    };
                  }
                }
              }
            } else {
              mergedRules[selector][property] = {
                value: value,
                important: important,
              };
            }
          });
        } else {
          mergedRules[selector] = {};
          declarations.forEach((declaration) => {
            const property = declaration.prop;
            const value = declaration.value;
            const important = declaration.important;
            mergedRules[selector][property] = {
              value: value,
              important: important,
            };
          });
        }
      });

      root.removeAll();

      Object.keys(mergedRules).forEach((selector) => {
        const rule = postcss.rule({ selector: selector });

        Object.keys(mergedRules[selector]).forEach((property) => {
          const { value, important } = mergedRules[selector][property];
          const declaration = postcss.decl({ prop: property, value: value });

          if (important) {
            declaration.important = true;
          }

          rule.append(declaration);
        });

        root.append(rule);
      });
    },
  };
}

function mCss(cssStr1, cssStr2) {
  return new Promise((resolve, reject) => {
    // 合并两个CSS字符串
    const combinedCss = cssStr1 + cssStr2;

    // 将合并后的CSS字符串转换为PostCSS Root对象
    const root = postcss.parse(combinedCss);

    // 使用自定义插件和autoprefixer处理CSS
    postcss([mergeSameClassStyles()])
      .process(root, { from: undefined }) // `from`设置为undefined避免PostCSS在输出中添加source map注释
      .then((result) => {
        // 输出或使用处理后的CSS
        const finalCss = result.css;
        resolve(finalCss);
        // 或者写入文件等其他操作
      })
      .catch((error) => {
        console.error("Error processing CSS:", error);
      });
  });
}

// 生成一个方法
function generateFunction(functionName) {
  return `${functionName}: function(){}`;
}

// 生成一个class
function generateClass(className) {
  return `.${className}{}`;
}

// 生成一个键值对
function generateData(dataName) {
  return `${dataName}:''`;
}

// 合成方法集
function convertMethods(set, options) {
  let methodsStr = [...set].map(generateFunction);
  // 回调外部，使外部作用最后结果
  if (options.convertMethodResult) {
    methodsStr = options.convertMethodResult(methodsStr);
  }
  return methodsStr.join(",\n");
}

// 合成style集
function convertStyles(set, options) {
  let result = "";
  // 因为set的结果不好解析，所以优先由业务处解析，再交给默认处理方式。不过业务处需要将已处理的值从set中删除，否则会有两条样式
  if (options.preConvertStyleResult) {
    result = options.preConvertStyleResult(set);
  }

  const classStr = [...set].map(generateClass);
  return classStr.join("\n") + "\n" + result;
}

// 合成data集
function convertDatas(set, options) {
  let dataStr = [...set].map(generateData);
  // 回调外部，使外部作用最后结果
  if (options.convertDataResult) {
    dataStr = options.convertDataResult(dataStr);
  }
  return dataStr.join(",\n");
}

// 从模板中替换方法
function replaceMethods(template, set, options) {
  return template.replace("// $eventMethods", convertMethods(set, options));
}

// 从模板中替换样式
// 从模板中替换样式
const replaceStyles = async (template, set, options, customCss = "") => {
  return template.replace(
    "/** $stylesTemplate */",
    await mCss(convertStyles(set, options), customCss)
  );
};

// 从模板中替换样式
function replaceDatas(template, set, options) {
  const defaultCode = convertDatas(set, options);
  return template.replace("// $datas", defaultCode);
}

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

function buildOptions(options, defaultOptions, props) {
  var newOptions = {};
  if (!options) {
    return defaultOptions; //if there are not options
  }

  for (let i = 0; i < props.length; i++) {
    if (options[props[i]] !== undefined) {
      newOptions[props[i]] = options[props[i]];
    } else {
      newOptions[props[i]] = defaultOptions[props[i]];
    }
  }
  return newOptions;
}

const defaultOptions = {
  attributeNamePrefix: "@_",
  attrNodeName: false,
  textNodeName: "#text",
  ignoreAttributes: true,
  cdataTagName: false,
  cdataPositionChar: "\\c",
  format: true,
  indentBy: "  ",
  supressEmptyNode: false,
  tagValueProcessor: function (a) {
    return a;
  },
  attrValueProcessor: function (a) {
    return a;
  },
  singleTags: [],
  attributeProtectArray: [], // 哪些属性的值为''但需要渲染出来，默认：如果value为''就不生成key=value，只生成key
};

const props = [
  "attributeNamePrefix",
  "attrNodeName",
  "textNodeName",
  "ignoreAttributes",
  "cdataTagName",
  "cdataPositionChar",
  "format",
  "indentBy",
  "supressEmptyNode",
  "tagValueProcessor",
  "attrValueProcessor",
  "singleTags",
  "attributeProtectArray",
];

function Parser(options) {
  this.options = buildOptions(options, defaultOptions, props);
  if (this.options.ignoreAttributes || this.options.attrNodeName) {
    this.isAttribute = function (/*a*/) {
      return false;
    };
  } else {
    this.attrPrefixLen = this.options.attributeNamePrefix.length;
    this.isAttribute = isAttribute;
  }
  if (this.options.cdataTagName) {
    this.isCDATA = isCDATA;
  } else {
    this.isCDATA = function (/*a*/) {
      return false;
    };
  }
  this.replaceCDATAstr = replaceCDATAstr;
  this.replaceCDATAarr = replaceCDATAarr;

  if (this.options.format) {
    this.indentate = indentate;
    this.tagEndChar = ">\n";
    this.newLine = "\n";
  } else {
    this.indentate = function () {
      return "";
    };
    this.tagEndChar = ">";
    this.newLine = "";
  }

  if (this.options.supressEmptyNode) {
    this.buildTextNode = buildEmptyTextNode;
    this.buildObjNode = buildEmptyObjNode;
  } else {
    this.buildTextNode = buildTextValNode;
    this.buildObjNode = buildObjectNode;
  }

  this.buildTextValNode = buildTextValNode;
  this.buildObjectNode = buildObjectNode;
}

Parser.prototype.parse = function (jObj) {
  return this.j2x(jObj, 0).val;
};

Parser.prototype.j2x = function (jObj, level) {
  let attrStr = "";
  let val = "";
  const keys = Object.keys(jObj);
  const len = keys.length;
  for (let i = 0; i < len; i++) {
    const key = keys[i];
    if (typeof jObj[key] === "undefined");
    else if (jObj[key] === null) {
      val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
    } else if (jObj[key] instanceof Date) {
      val += this.buildTextNode(jObj[key], key, "", level);
    } else if (key === "__children") {
      // 生成子节点
      const item = jObj[key];

      if (item instanceof Array) {
        item.forEach((i) => {
          const result = this.j2x(i, level + 1);
          val += result.val;
        });
      } else if (typeof item === "object") {
        console.info(`不应该出现的意外`);
      } else {
        val += this.buildTextNode(item, key, "", level);
      }
    } else if (typeof jObj[key] !== "object") {
      //premitive type
      const attr = this.isAttribute(key);

      if (key === "__text__") {
        val = jObj[key] + val; // 2020年12月14日19:35:54 文本内容通常在子节点之前
        continue;
      }

      if (attr) {
        if (typeof jObj[key] === "boolean" && jObj[key]) {
          attrStr += ` ${key} `;
        } else if (
          jObj[key] ||
          this.options.attributeProtectArray.includes(key)
        ) {
          attrStr +=
            " " +
            key +
            '="' +
            this.options.attrValueProcessor("" + jObj[key]) +
            '"';
        } else {
          attrStr += " " + key;
        }
      } else if (this.isCDATA(key)) {
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAstr(
            jObj[this.options.textNodeName],
            jObj[key]
          );
        } else {
          val += this.replaceCDATAstr("", jObj[key]);
        }
      } else {
        //tag value
        if (key === this.options.textNodeName) {
          if (jObj[this.options.cdataTagName]);
          else {
            val += this.options.tagValueProcessor("" + jObj[key]);
          }
        } else {
          val += this.buildTextNode(jObj[key], key, "", level);
        }
      }
    } else if (Array.isArray(jObj[key])) {
      //repeated nodes
      if (this.isCDATA(key)) {
        val += this.indentate(level);
        if (jObj[this.options.textNodeName]) {
          val += this.replaceCDATAarr(
            jObj[this.options.textNodeName],
            jObj[key]
          );
        } else {
          val += this.replaceCDATAarr("", jObj[key]);
        }
      } else {
        //nested nodes
        const arrLen = jObj[key].length;
        for (let j = 0; j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === "undefined");
          else if (item === null) {
            val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          } else if (typeof item === "object") {
            const result = this.j2x(item, level + 1);
            val += this.buildObjNode(result.val, key, result.attrStr, level);
          } else {
            val += this.buildTextNode(item, key, "", level);
          }
        }
      }
    } else {
      //nested node
      if (this.options.attrNodeName && key === this.options.attrNodeName) {
        const Ks = Object.keys(jObj[key]);
        const L = Ks.length;
        for (let j = 0; j < L; j++) {
          attrStr +=
            " " +
            Ks[j] +
            '="' +
            this.options.attrValueProcessor("" + jObj[key][Ks[j]]) +
            '"';
        }
      } else {
        const result = this.j2x(jObj[key], level + 1);
        val += this.buildObjNode(result.val, key, result.attrStr, level);
      }
    }
  }
  return { attrStr: attrStr, val: val };
};

function replaceCDATAstr(str, cdata) {
  str = this.options.tagValueProcessor("" + str);
  if (this.options.cdataPositionChar === "" || str === "") {
    return str + "<![CDATA[" + cdata + "]]" + this.tagEndChar;
  } else {
    return str.replace(
      this.options.cdataPositionChar,
      "<![CDATA[" + cdata + "]]" + this.tagEndChar
    );
  }
}

function replaceCDATAarr(str, cdata) {
  str = this.options.tagValueProcessor("" + str);
  if (this.options.cdataPositionChar === "" || str === "") {
    return (
      str + "<![CDATA[" + cdata.join("]]><![CDATA[") + "]]" + this.tagEndChar
    );
  } else {
    for (let v in cdata) {
      str = str.replace(
        this.options.cdataPositionChar,
        "<![CDATA[" + cdata[v] + "]]>"
      );
    }
    return str + this.newLine;
  }
}

function buildObjectNode(val, key, attrStr, level) {
  if (attrStr && !val.includes("<")) {
    if (
      key === "img" ||
      key === "a-icon" ||
      key === "input" ||
      (this.options.singleTags && this.options.singleTags.includes(key))
    ) {
      return this.indentate(level) + "<" + key + attrStr + "/>";
    }

    return (
      this.indentate(level) +
      "<" +
      key +
      attrStr +
      ">" +
      val +
      //+ this.newLine
      // + this.indentate(level)
      "</" +
      key +
      this.tagEndChar
    );
  } else {
    return (
      this.indentate(level) +
      "<" +
      key +
      attrStr +
      this.tagEndChar +
      val +
      //+ this.newLine
      this.indentate(level) +
      "</" +
      key +
      this.tagEndChar
    );
  }
}

function buildEmptyObjNode(val, key, attrStr, level) {
  if (val !== "") {
    return this.buildObjectNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
    //+ this.newLine
  }
}

function buildTextValNode(val, key, attrStr, level) {
  return (
    this.indentate(level) +
    "<" +
    key +
    attrStr +
    ">" +
    this.options.tagValueProcessor(val) +
    "</" +
    key +
    this.tagEndChar
  );
}

function buildEmptyTextNode(val, key, attrStr, level) {
  if (val !== "") {
    return this.buildTextValNode(val, key, attrStr, level);
  } else {
    return this.indentate(level) + "<" + key + attrStr + "/" + this.tagEndChar;
  }
}

function indentate(level) {
  return this.options.indentBy.repeat(level);
}

function isAttribute(name /*, options*/) {
  return true;
}

function isCDATA(name) {
  return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag

const getOwnEnumPropSymbols = (object) =>
  Object.getOwnPropertySymbols(object).filter((keySymbol) =>
    Object.prototype.propertyIsEnumerable.call(object, keySymbol)
  );

export function stringifyObject(input, options, pad) {
  const seen = [];

  return (function stringify(input, options = {}, pad = "") {
    const indent = options.indent || "\t";

    let tokens;
    if (options.inlineCharacterLimit === undefined) {
      tokens = {
        newline: "\n",
        newlineOrSpace: "\n",
        pad,
        indent: pad + indent,
      };
    } else {
      tokens = {
        newline: "@@__STRINGIFY_OBJECT_NEW_LINE__@@",
        newlineOrSpace: "@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@",
        pad: "@@__STRINGIFY_OBJECT_PAD__@@",
        indent: "@@__STRINGIFY_OBJECT_INDENT__@@",
      };
    }

    const expandWhiteSpace = (string) => {
      if (options.inlineCharacterLimit === undefined) {
        return string;
      }

      const oneLined = string
        .replace(new RegExp(tokens.newline, "g"), "")
        .replace(new RegExp(tokens.newlineOrSpace, "g"), " ")
        .replace(new RegExp(tokens.pad + "|" + tokens.indent, "g"), "");

      if (oneLined.length <= options.inlineCharacterLimit) {
        return oneLined;
      }

      return string
        .replace(
          new RegExp(tokens.newline + "|" + tokens.newlineOrSpace, "g"),
          "\n"
        )
        .replace(new RegExp(tokens.pad, "g"), pad)
        .replace(new RegExp(tokens.indent, "g"), pad + indent);
    };

    if (seen.includes(input)) {
      return '"[Circular]"';
    }

    if (
      input === null ||
      input === undefined ||
      typeof input === "number" ||
      typeof input === "boolean" ||
      typeof input === "function" ||
      typeof input === "symbol" ||
      isRegexp(input)
    ) {
      return String(input);
    }

    if (input instanceof Date) {
      return `new Date('${input.toISOString()}')`;
    }

    if (Array.isArray(input)) {
      if (input.length === 0) {
        return "[]";
      }

      seen.push(input);

      const returnValue =
        "[" +
        tokens.newline +
        input
          .map((element, i) => {
            const eol =
              input.length - 1 === i
                ? tokens.newline
                : "," + tokens.newlineOrSpace;

            let value = stringify(element, options, pad + indent);
            if (options.transform) {
              value = options.transform(input, i, value);
            }

            return tokens.indent + value + eol;
          })
          .join("") +
        tokens.pad +
        "]";

      seen.pop();

      return expandWhiteSpace(returnValue);
    }

    if (isObject(input)) {
      let objectKeys = [...Object.keys(input), ...getOwnEnumPropSymbols(input)];

      if (options.filter) {
        objectKeys = objectKeys.filter((element) =>
          options.filter(input, element)
        );
      }

      if (objectKeys.length === 0) {
        return "{}";
      }

      seen.push(input);

      const returnValue =
        "{" +
        tokens.newline +
        objectKeys
          .map((element, i) => {
            const eol =
              objectKeys.length - 1 === i
                ? tokens.newline
                : "," + tokens.newlineOrSpace;
            const isSymbol = typeof element === "symbol";
            const isClassic = !isSymbol && /^[a-z$_][$\w]*$/i.test(element);
            const key =
              isSymbol || isClassic ? element : stringify(element, options);

            let value = stringify(input[element], options, pad + indent);
            if (options.transform) {
              value = options.transform(input, element, value);
            }

            return tokens.indent + String(key) + ": " + value + eol;
          })
          .join("") +
        tokens.pad +
        "}";

      seen.pop();

      return expandWhiteSpace(returnValue);
    }

    input = String(input).replace(/[\r\n]/g, (x) =>
      x === "\n" ? "\\n" : "\\r"
    );

    if (options.singleQuotes === false) {
      input = input.replace(/"/g, '\\"');
      return `"${input}"`;
    }

    input = input.replace(/\\?'/g, "\\'");
    return `'${input}'`;
  })(input, options, pad);
}

const { merge, cloneDeep } = _;

const rawAdd = Set.prototype.add;
try {
  // 为何不能给add赋值？且没有报错？
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

function sort(set) {
  return new Set(Array.from(set).sort());
}

// 核心代码
class CodeGenerator {
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

    // 外部JS
    this.externalJS = {};

    // 外部css
    this.customCss = "";

    // 事件流
    this.eventNode = {};

    // 需要替换的变量
    this.customData = {};
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
   * 设置外部css
   * @param {*} cssCode
   */
  setExternalCss(cssCode) {
    this.customCss = cssCode;
  }

  /**
   * 事件流
   * @param {*} eventNode
   */
  setEventNode(eventNode) {
    this.eventNode = eventNode;
  }

  /**
   * 外部 data 设置
   * @param {*} customData
   */
  setCustomData(customData) {
    this.customData = customData;
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
  async replaceKeyInfo() {
    let $data,
      funs,
      vueExport,
      str = "",
      settingData;

    // 解析外层代码
    if (this.externalJS) {
      const js = jsSetup(this.externalJS);
      $data = js.$data || "";
      funs = js.funs || [];
      vueExport = js.vueExport || [];
      str = js.str || "";
      settingData = js.settingData || [];
    }
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
    if ($data) {
      const regExp = /toRefs\(([\s\S]+?)\)/;
      const match = $data.match(regExp);
      if (match && match[1]) {
        const objStr = match[1].trim();
        try {
          const newObj = eval(`(${objStr})`);
          externalData = newObj;
        } catch (e) {}
      }
    }

    // 生成新的data返回值
    const newData = merge({}, JSCodeInfo.data(), externalData, this.customData);

    const dataFunction = new Function(`return ${stringifyObject(newData)}`);

    JSCodeInfo.data = dataFunction;

    let externalJSLogic = {
      methods: {},
    };

    if (funs && funs.length > 0) {
      funs.forEach((methodString) => {
        // 获取方法名
        const match = methodString.match(/(let|const)\s+(\w+)\s*=\s*([\s\S]+)/);
        if (match && match[1] && match[2] && match[3]) {
          const variableName = match[2];
          externalJSLogic.methods[variableName] = match[3];
        }
      });
    }

    const mergedJSObject = merge(JSCodeInfo, externalJSLogic);

    let toRefsData = mergedJSObject.data(),
      functionData = ``;
    Object.keys(mergedJSObject.methods).forEach((key) => {
      functionData += `const ${key} = ${mergedJSObject.methods[key]};\n`;
    });
    let dataStr = ``,
      dataKeys = Object.keys(toRefsData) || [];
    Object.keys(toRefsData).forEach((key) => {
      let v = toRefsData[key];
      dataStr = `const ${key} = ref(${
        typeof v === "string" ? `'${v}'` : v
      });\n`;
    });
    const finalJSCode = `
{
setup(props, {emit}) {
  const instance = getCurrentInstance();
  ${dataStr}

  // 执行事件流
  const eventFun = (eventStr, e = null) => {
    const eventObj = vccEvents[eventStr];
    if (!eventStr || !eventObj) return;
    
    instance.proxy.$execEventFlow(instance, eventObj.children, e);
  };

  onMounted(() => {
    eventFun("init")
  })
  
  ${str}
  ${functionData}
  return {
    ${dataKeys && dataKeys.length > 0 ? dataKeys.join(",") + "," : ""}
    eventFun,
    ${settingData && settingData.length > 0 ? settingData.join(",") + "," : ""}
    ${Object.keys(mergedJSObject.methods).join(",")}
  }
}

}
    `;

    // ==================== 生成脚本 ====================

    const beautiful = prettier.format(`export default ` + finalJSCode, {
      semi: false,
      parser: "babel",
      plugins: [parserBabel],
    });

    const excludeUnuseal = beautiful;

    // 插入到最终模板
    const JSTemp = templateTemp.replace("// $script", excludeUnuseal);
    // 生成class
    const styleTemp = await replaceStyles(
      JSTemp,
      this.classSet,
      this.options,
      this.customCss
    );

    vueExport.push("onMounted", "ref", "getCurrentInstance");
    vueExport = Array.from(new Set(vueExport));
    const zTemp = styleTemp.replace("// $vueExport", vueExport.join(","));
    return zTemp;
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
        value && this.dataSet.addeee(value);
      } else {
        this.options.unSupportedKey && this.options.unSupportedKey(key, value);
      }
    } else if (key === "__text__") {
      // 匹配v-text,{{}}
      if (/[{]{2}.+[}]{2}/g.test(value)) {
        // 用于匹配v-text {{}}
        const temp = findVarFormExpression(value);
        temp.forEach((element) => {
          this.dataSet.addeee(element);
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

export { CodeGenerator, sort };
