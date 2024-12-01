import { evaluate, parse } from "../src";

test("evalute:simple", () => {
  expect(
    evaluate("a is ${a}", {
      a: 123,
    })
  ).toBe("a is 123");
});

test("evalute:filter", () => {
  expect(
    evaluate(
      "a is ${a | abc}",
      {
        a: 123,
      },
      {
        filters: {
          abc(input) {
            return `${input}456`;
          },
        },
      }
    )
  ).toBe("a is 123456");

  // expect(
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
  // ).toBe("a is 123233");

  // expect(
  //   evaluate(
  //     "a is ${concat(a, a)}",
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
  // ).toBe("a is 123123");
});
