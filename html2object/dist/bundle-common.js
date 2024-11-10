'use strict';

var htmlparser2 = require('htmlparser2');

function getNodeContent(node) {
  return node[Object.keys(node)[0]];
}

function generateNewNode(tagName, attributes = {}) {
  // build new node
  attributes.__children = [];
  const newNode = {
    [tagName]: attributes,
  };
  return newNode;
}

function parseHtml(htmlData) {
  return new Promise((resolve, reject) => {
    const root = generateNewNode("root");
    let currentAccessObject = root;
    let lastAccessStack = [root];

    // options docment: https://github.com/fb55/htmlparser2/wiki/Parser-options
    const parser = new htmlparser2.Parser({
      onopentag(tagname, attributes) {
        const newNode = generateNewNode(tagname, attributes);
        lastAccessStack.push(newNode);
        getNodeContent(currentAccessObject).__children.push(newNode);
        currentAccessObject = newNode;
      },
      ontext(text) {
        if (text.trim()) {
          getNodeContent(currentAccessObject).__text__ = text.trim();
        }
      },
      onclosetag(tagname) {
        lastAccessStack.pop();
        currentAccessObject = lastAccessStack[lastAccessStack.length - 1];
      },
      onend() {
        resolve(root);
      },

      onerror(error) {
        reject(error);
      },
    });
    parser.write(htmlData);
    parser.end();
  });
}

async function html2Json(htmlData) {
  return await parseHtml(htmlData);
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

const defaultOptions$1 = {
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
  attributeProtectArray: [],
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
  "attributeProtectArray",
];

function Parser(options) {
  this.options = buildOptions(options, defaultOptions$1, props);
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
    if (typeof jObj[key] === "undefined") ; else if (jObj[key] === null) {
      val += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
    } else if (jObj[key] instanceof Date) {
      val += this.buildTextNode(jObj[key], key, "", level);
    } else if (key === "__children") {
      const item = jObj[key];

      if (item instanceof Array) {
        item.forEach((i) => {
          const result = this.j2x(i, level + 1);
          val += result.val;
        });
      } else if (typeof item === "object") {
        console.warn(`some exception`);
      } else {
        val += this.buildTextNode(item, key, "", level);
      }
    } else if (typeof jObj[key] !== "object") {
      //premitive type
      const attr = this.isAttribute(key);

      if (key === "__text__") {
        val = jObj[key] + val;
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
          if (jObj[this.options.cdataTagName]) ; else {
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
          if (typeof item === "undefined") ; else if (item === null) {
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
    if (key === "img" || key === "input") {
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
};

const parser = new Parser(defaultOptions);

function object2Html(obj) {
  return Promise.resolve(parser.parse(obj));
}

exports.html2Object = html2Json;
exports.object2Html = object2Html;
