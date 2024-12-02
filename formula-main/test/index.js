import { evaluate, tokenize } from "../src/index";
import { resolveVariableAndFilter } from "../src";

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

// console.log(
//   resolveVariableAndFilter(
//     "${b | default:-}",
//     {
//       a: 1,
//     },
//     "| raw"
//   )
// );

// const data = {
//   "a-b": "c",
//   222: 10222,
//   "222_221": 233,
//   "222_abcde": "abcde",
//   "222-221": 333,
// };

// console.log(typeof evaluate("${222_221}", data));

// console.log(
//   resolveVariableAndFilter(
//     "${a | default:undefined}",
//     {
//       a: 12,
//     },
//     "| raw"
//   )
// );

// console.log(
//   evaluate(
//     "a is ${a | concat:233}",
//     {
//       a: 123,
//     },
//     {
//       filters: {
//         concat(input, arg) {
//           return `${input}${arg}`;
//         },
//       },
//     }
//   )
// );

// console.log(
//   resolveVariableAndFilter('${items|filter:text:match:"ab"}', {
//     items: [
//       {
//         text: "abc",
//       },
//       {
//         text: "bcd",
//       },
//       {
//         text: "cde",
//       },
//     ],
//   })
// );

// console.log(
//   resolveVariableAndFilter("${a | map: toInt}", {
//     a: ["123", "3434"],
//   })
// );

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

// console.log(
//   tokenize("abc${a}", {
//     a: "",
//   })
// );
