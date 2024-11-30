import { Evaluator } from "./evalutor";
import { parse } from "./parser";
import { lexer } from "./lexer";
export { parse, lexer, Evaluator };

export function evaluate(astOrString, data, options = {}) {
  let ast = astOrString;
  if (typeof astOrString === "string") {
    ast = parse(astOrString, options);
  }
  return new Evaluator(data, options).evalute(ast);
}
