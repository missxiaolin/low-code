let traverse = require("ast-traverse");
let parser = require("@babel/parser");

const b = `export default {
    setup() {
        let message = ref("Hello, Vue 3!");
        let Obj = toRefs({
            a: 1
        });
        let b = "bbbbbbbbb";
        watch(Obj, (newValue, oldValue) => {
            console.log(Obj)
        });
        const ceshi = () => {
            console.log("ceshi1")
            console.log("ceshi2")
        }
            
        const ceshi222 = () => {
            console.log("ceshi1")
            console.log("ceshi2")
        }
        return {
            message,
            ceshi
        }
    },
};`;

function extractLines(str, startLine, endLine) {
  const lines = str.split("\n");
  return lines.slice(startLine - 1, endLine).join("\n");
}

const ast = parser.parse(b, {
  sourceType: "module",
});

let config = [];
let vueExport = [];
let str = "";

traverse(ast, {
  pre: function (node, parent, prop, idx) {
    if (
      node.type === "VariableDeclarator" &&
      node.init &&
      node.init.type === "ArrowFunctionExpression"
    ) {
      // 方法
      //   extractLines(b, node.loc.start.line, node.loc.end.line)
      config.push(extractLines(b, node.loc.start.line, node.loc.end.line));
    } else if (
      // vue ref toRefs ……

      node.type === "VariableDeclarator" &&
      node.init &&
      node.init.type === "CallExpression"
    ) {
      vueExport.push(node.init.callee.name);
      str = `${str}${extractLines(
        b,
        node.loc.start.line,
        node.loc.end.line
      )}\n`;
    } else if (
      // 普通变量
      node.type === "VariableDeclarator" &&
      node.init &&
      node.init.type === "StringLiteral"
    ) {
      str = `${str}${extractLines(
        b,
        node.loc.start.line,
        node.loc.end.line
      )}\n`;
    } else if (
      node.type === "ExpressionStatement" &&
      node.expression &&
      node.expression.type === "CallExpression" &&
      node.expression.callee &&
      node.expression.callee.name === "watch"
    ) {
      vueExport.push(node.expression.callee.name);
      str = `${str}${extractLines(
        b,
        node.loc.start.line,
        node.loc.end.line
      )}\n`;
    }
  },
});

console.log(config, str, vueExport);
