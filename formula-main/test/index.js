import { evaluate, tokenize } from "../src/index";

const defaultContext = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

function evalFormual(expression, data = defaultContext) {
  return evaluate(expression, data, {
    evalMode: true,
  });
}

// 基本运算
// console.log(evalFormual("a + 3"));
// console.log(evalFormual("a == 1"));
// console.log(evalFormual("a[0]", { a: [1, 2, 3] }));
// evalFormual("a[b]", { a: [1, 2, 3], b: 1 });

// IF 判断
// console.log(evalFormual("IF(true, 2, 3)"));
// console.log(evalFormual("IF(IF(true, false, true), 2, 3)"));

// AND
// console.log(evalFormual("AND(0, 1)"));
// console.log(evalFormual("AND(1, 1)"));

// OR
// console.log(evalFormual("OR(0, 1)"));

// XOR
// console.log(evalFormual("XOR(0, 1)"));

// IFS
// console.log(evalFormual("IFS(1, 2, 3, 4, 5)"));

console.log(
  tokenize("abc${a}", {
    a: "",
  })
);
