import { evaluate } from "../src/index";
function evalFormual(expression, data) {
  return evaluate(expression, data, {
    evalMode: true,
  });
}
console.log(evalFormual("IF(true, 2, 3)"));
