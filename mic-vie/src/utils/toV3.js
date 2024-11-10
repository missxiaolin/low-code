import $ from "gogocode";
import setup from "./src/setup";
import prettier from "prettier/standalone.js";
import parserBabel from "prettier/parser-babel.js";

const apiRules = [setup];

export function toV3(sourceCode) {
  const ast = $(sourceCode, { parseOptions: { language: "vue" } });
  const rules = [].concat(apiRules);

  const api = { gogocode: $ };
  const outAst = rules.reduce((ast, rule) => rule(ast, api), ast);

  let outputCode = outAst.root().generate();
  outputCode = outputCode.replace("<script>", "<script setup>");
  return outputCode
}
