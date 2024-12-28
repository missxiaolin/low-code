import { Evaluator } from "./evalutor";
import { parse } from "./parser";
import { lexer } from "./lexer";
import { getFilters } from "./filter";
export { parse, lexer, Evaluator };
export * from "./util";

export function evaluate(astOrString, data, options = {}) {
  let ast = astOrString;
  if (typeof astOrString === "string") {
    ast = parse(astOrString, options);
  }
  return new Evaluator(data, options)
    .setDefaultFilters(getFilters())
    .evalute(ast);
}
