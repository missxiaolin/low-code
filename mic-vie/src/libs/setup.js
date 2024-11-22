import traverse from "ast-traverse";
import * as parser from "@babel/parser";

export function extractLines(str, startLine, endLine) {
  const lines = str.split("\n");
  return lines.slice(startLine - 1, endLine).join("\n");
}

export function jsSetup(code) {
  let $data = "";
  let settingData = [];
  let funs = [];
  let vueExport = [];
  let str = "";

  const ast = parser.parse(code, {
    sourceType: "module",
  });
  traverse(ast, {
    pre: function (node, parent, prop, idx) {
      if (
        node.type === "VariableDeclarator" &&
        node.init &&
        node.init.type === "ArrowFunctionExpression"
      ) {
        // 方法
        funs.push(extractLines(code, node.loc.start.line, node.loc.end.line));
      } else if (
        // 拿到系统变量
        node.type === "VariableDeclarator" &&
        node.init &&
        node.init.type === "CallExpression" &&
        node.id &&
        node.id.name == "$data"
      ) {
        vueExport.push(node.init.callee.name);
        $data = extractLines(code, node.loc.start.line, node.loc.end.line);
      } else if (
        // vue ref toRefs ……
        node.type === "VariableDeclarator" &&
        node.init &&
        node.init.type === "CallExpression"
      ) {
        node.id.name && settingData.push(node.id.name);
        vueExport.push(node.init.callee.name);
        str = `${str}${extractLines(
          code,
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
          code,
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
          code,
          node.loc.start.line,
          node.loc.end.line
        )}\n`;
      }
    },
  });
  return {
    settingData,
    funs,
    vueExport,
    str,
    $data,
  };
}
