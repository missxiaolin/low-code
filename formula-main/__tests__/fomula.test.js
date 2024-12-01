import moment from "moment";
import { evaluate, parse } from "../src";

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

test("formula:expression", () => {
  expect(evalFormual("a + 3")).toBe(4);
  expect(evalFormual("b * 3")).toBe(6);
  expect(evalFormual("b * 3 + 4")).toBe(10);
  expect(evalFormual("c * (3 + 4)")).toBe(21);
  expect(evalFormual("d / (a + 1)")).toBe(2);
  expect(evalFormual("5 % 3")).toBe(2);
  expect(evalFormual("3 | 4")).toBe(7);
  expect(evalFormual("4 ^ 4")).toBe(0);
  expect(evalFormual("4 ^ 4")).toBe(0);
  expect(evalFormual("4 & 4")).toBe(4);
  expect(evalFormual("4 & 3")).toBe(0);
  expect(evalFormual("~-1")).toBe(0);
  expect(evalFormual("!!1")).toBe(true);
  expect(evalFormual('!!""')).toBe(false);
  expect(evalFormual("1 || 2")).toBe(1);
  expect(evalFormual("1 && 2")).toBe(2);
  expect(evalFormual("1 && 2 || 3")).toBe(2);
  expect(evalFormual("1 || 2 || 3")).toBe(1);
  expect(evalFormual("1 || 2 && 3")).toBe(1);
  expect(evalFormual("(1 || 2) && 3")).toBe(3);
  expect(evalFormual('1 == "1"')).toBe(true);
  expect(evalFormual('1 === "1"')).toBe(false);
  expect(evalFormual("1 < 1")).toBe(false);
  expect(evalFormual("1 <= 1")).toBe(true);
  expect(evalFormual("1 > 1")).toBe(false);
  expect(evalFormual("1 >= 1")).toBe(true);
  expect(evalFormual("3 >> 1")).toBe(1);
  expect(evalFormual("3 << 1")).toBe(6);
  expect(evalFormual("10 ** 3")).toBe(1000);

  expect(evalFormual("10 ? 3 : 2")).toBe(3);
  expect(evalFormual("0 ? 3 : 2")).toBe(2);
});

test("formula:expression2", () => {
  expect(evalFormual("a[0]", { a: [1, 2, 3] })).toBe(1);
  expect(evalFormual("a[b]", { a: [1, 2, 3], b: 1 })).toBe(2);
  expect(evalFormual("a[b - 1]", { a: [1, 2, 3], b: 1 })).toBe(1);
  expect(evalFormual("a[b ? 1 : 2]", { a: [1, 2, 3], b: 1 })).toBe(2);
  expect(evalFormual("a[c ? 1 : 2]", { a: [1, 2, 3], b: 1 })).toBe(3);
});

test("formula:if", () => {
  expect(evalFormual("IF(true, 2, 3)")).toBe(2);
  expect(evalFormual("IF(false, 2, 3)")).toBe(3);
  expect(evalFormual("IF(false, 2, IF(true, 3, 4))")).toBe(3);
});

test("formula:and", () => {
  expect(!!evalFormual("AND(0, 1)")).toBe(false);
  expect(!!evalFormual("AND(1, 1)")).toBe(true);
  expect(!!evalFormual("AND(1, 1, 1, 0)")).toBe(false);
});

test("formula:or", () => {
  expect(!!evalFormual("OR(0, 1)")).toBe(true);
  expect(!!evalFormual("OR(1, 1)")).toBe(true);
  expect(!!evalFormual("OR(1, 1, 1, 0)")).toBe(true);
  expect(!!evalFormual("OR(0, 0, 0, 0)")).toBe(false);
});

test("formula:xor", () => {
  expect(evalFormual("XOR(0, 1)")).toBe(false);
  expect(evalFormual("XOR(1, 0)")).toBe(false);
  expect(evalFormual("XOR(1, 1)")).toBe(true);
  expect(evalFormual("XOR(0, 0)")).toBe(true);
});

test("formula:ifs", () => {
  expect(!!evalFormual("IFS(0, 1, 2)")).toBe(true);
  expect(!!evalFormual("IFS(0, 1, 2, 2, 3)")).toBe(true);
  expect(!!evalFormual("IFS(0, 1, 0, 2, 0)")).toBe(false);
});
test("formula:math", () => {
  expect(evalFormual("ABS(1)")).toBe(1);
  expect(evalFormual("ABS(-1)")).toBe(1);
  expect(evalFormual("ABS(0)")).toBe(0);

  expect(evalFormual("MAX(1, -1, 2, 3, 5, -9)")).toBe(5);
  expect(evalFormual("MIN(1, -1, 2, 3, 5, -9)")).toBe(-9);

  expect(evalFormual("MOD(3, 2)")).toBe(1);

  expect(evalFormual("PI()")).toBe(Math.PI);

  expect(evalFormual("ROUND(3.5)")).toBe(4);
  expect(evalFormual("ROUND(3.4)")).toBe(3);

  expect(evalFormual("ROUND(3.456789, 2)")).toBe(3.46);
  expect(evalFormual("CEIL(3.456789)")).toBe(4);
  expect(evalFormual("FLOOR(3.456789)")).toBe(3);

  expect(evalFormual("SQRT(4)")).toBe(2);
  expect(evalFormual("AVG(4, 6, 10, 10, 10)")).toBe(8);

  // 示例来自 https://support.microsoft.com/zh-cn/office/devsq-%E5%87%BD%E6%95%B0-8b739616-8376-4df5-8bd0-cfe0a6caf444
  expect(evalFormual("DEVSQ(4,5,8,7,11,4,3)")).toBe(48);
  // 示例来自 https://support.microsoft.com/zh-cn/office/avedev-%E5%87%BD%E6%95%B0-58fe8d65-2a84-4dc7-8052-f3f87b5c6639
  expect(evalFormual("ROUND(AVEDEV(4,5,6,7,5,4,3), 2)")).toBe(1.02);
  // 示例来自 https://support.microsoft.com/zh-cn/office/harmean-%E5%87%BD%E6%95%B0-5efd9184-fab5-42f9-b1d3-57883a1d3bc6
  expect(evalFormual("ROUND(HARMEAN(4,5,8,7,11,4,3), 3)")).toBe(5.028);

  expect(evalFormual("LARGE([1,3,5,4,7,6], 3)")).toBe(5);
  expect(evalFormual("LARGE([1,3,5,4,7,6], 1)")).toBe(7);

  expect(evalFormual("UPPERMONEY(7682.01)")).toBe("柒仟陆佰捌拾贰元壹分");
  expect(evalFormual("UPPERMONEY(7682)")).toBe("柒仟陆佰捌拾贰元整");

  // 非数字类型转换是否正常？
  expect(evalFormual('"3" + "3"')).toBe(6);
  expect(evalFormual('"3" - "3"')).toBe(0);
  expect(evalFormual('AVG(4, "6", "10", 10, 10)')).toBe(8);
});

test("formula:text", () => {
  expect(evalFormual('LEFT("abcdefg", 2)')).toBe("ab");
  expect(evalFormual('RIGHT("abcdefg", 2)')).toBe("fg");
  expect(evalFormual('LENGTH("abcdefg")')).toBe(7);
  expect(evalFormual('LEN("abcdefg")')).toBe(7);
  expect(evalFormual('ISEMPTY("abcdefg")')).toBe(false);
  expect(evalFormual('ISEMPTY("")')).toBe(true);
  expect(evalFormual('CONCATENATE("a", "b", "c", "d")')).toBe("abcd");
  expect(evalFormual("CHAR(97)")).toBe("a");
  expect(evalFormual('LOWER("AB")')).toBe("ab");
  expect(evalFormual('UPPER("ab")')).toBe("AB");
  expect(evalFormual('SPLIT("a,b,c")')).toMatchObject(["a", "b", "c"]);
  expect(evalFormual('TRIM("  ab ")')).toBe("ab");
  expect(evalFormual('STARTSWITH("xab", "ab")')).toBe(false);
  expect(evalFormual('STARTSWITH("xab", "x")')).toBe(true);
  expect(evalFormual('ENDSWITH("xab", "x")')).toBe(false);
  expect(evalFormual('ENDSWITH("xab", "b")')).toBe(true);
  expect(evalFormual('UPPERFIRST("xab")')).toBe("Xab");
  expect(evalFormual('PADSTART("5", 3, "0")')).toBe("005");
  expect(evalFormual("PADSTART(5, 3, 0)")).toBe("005");
  expect(evalFormual('CAPITALIZE("star")')).toBe("Star");
  expect(evalFormual('ESCAPE("&")')).toBe("&amp;");
  expect(evalFormual('TRUNCATE("amis.baidu.com", 7)')).toBe("amis...");
  expect(evalFormual('BEFORELAST("amis.baidu.com", ".")')).toBe("amis.baidu");
  expect(evalFormual('BEFORELAST("amis", ".")')).toBe("amis");
  expect(evalFormual('STRIPTAG("<b>amis</b>")')).toBe("amis");
  expect(evalFormual('LINEBREAK("am\nis")')).toBe("am<br/>is");
  expect(evalFormual('CONTAINS("xab", "x")')).toBe(true);
  expect(evalFormual('CONTAINS("xab", "b")')).toBe(true);
  expect(evalFormual('REPLACE("xabab", "ab", "cd")')).toBe("xcdcd");
  expect(evalFormual('SEARCH("xabab", "ab")')).toBe(1);
  expect(evalFormual('SEARCH("xabab", "cd")')).toBe(-1);
  expect(evalFormual('SEARCH("xabab", "ab", 2)')).toBe(3);
  expect(evalFormual('MID("xabab", 2, 2)')).toBe("ba");
});

test("formula:date", () => {
  expect(evalFormual('TIMESTAMP(DATE(2021, 11, 21, 0, 0, 0), "x")')).toBe(
    new Date(2021, 11, 21, 0, 0, 0).getTime()
  );
  expect(
    evalFormual('DATETOSTR(DATE(2021, 11, 21, 0, 0, 0), "YYYY-MM-DD")')
  ).toBe("2021-12-21");
  expect(evalFormual('DATETOSTR(DATE("2021-12-21"), "YYYY-MM-DD")')).toBe(
    "2021-12-21"
  );
  expect(evalFormual('DATETOSTR(TODAY(), "YYYY-MM-DD")')).toBe(
    moment().format("YYYY-MM-DD")
  );
  expect(evalFormual('DATETOSTR(NOW(), "YYYY-MM-DD")')).toBe(
    moment().format("YYYY-MM-DD")
  );
  expect(evalFormual('YEAR(STRTODATE("2021-10-24 10:10:10"))')).toBe(2021);
});

test("formula:last", () => {
  expect(evalFormual("LAST([1, 2, 3])")).toBe(3);
});

test("formula:basename", () => {
  expect(evalFormual('BASENAME("/home/amis/a.json")')).toBe("a.json");
});

test("evalute:filter2", () => {
  expect(
    evaluate(
      "a is ${[1, 2, 3] | concat:4 | join}",
      {},
      {
        filters: {
          concat(input, ...args) {
            return input.concat.apply(input, args);
          },
          join(input) {
            return input.join(",");
          },
        },
      }
    )
  ).toBe("a is 1,2,3,4");
});

test("evalute:filter3", () => {
  expect(
    evaluate(
      'a is ${[1, 2, 3] | concat:"4" | join}',
      {},
      {
        filters: {
          concat(input, ...args) {
            return input.concat.apply(input, args);
          },
          join(input) {
            return input.join(",");
          },
        },
      }
    )
  ).toBe("a is 1,2,3,4");
});

test("evalute:filter4", () => {
  expect(
    evaluate(
      "a is ${[1, 2, 3] | concat:${a + 3} | join}",
      {
        a: 4,
      },
      {
        filters: {
          concat(input, ...args) {
            return input.concat.apply(input, args);
          },
          join(input) {
            return input.join(",");
          },
        },
      }
    )
  ).toBe("a is 1,2,3,7");
});

test("evalute:oldVariable", () => {
  expect(
    evaluate("a is $a", {
      a: 4,
    })
  ).toBe("a is 4");

  expect(
    evaluate("b is $b", {
      a: 4,
    })
  ).toBe("b is ");

  expect(
    evaluate("a.b is $a.b", {
      a: {
        b: 233,
      },
    })
  ).toBe("a.b is 233");
});

test("evalute:ariable2", () => {
  expect(
    evaluate("a is $$", {
      a: 4,
    })
  ).toBe("a is [object Object]");
});

test("evalute:ariable3", () => {
  expect(
    evaluate(
      "$$",
      {
        a: 4,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toMatchObject({
    a: 4,
  });
});

test("evalute:conditional", () => {
  expect(
    evaluate(
      "${a | isTrue: true : false}",
      {
        a: 4,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toBe(true);

  expect(
    evaluate(
      "${a | isTrue: b : false}",
      {
        a: 4,
        b: 5,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toBe(5);

  expect(
    evaluate(
      "${a | isTrue: b : false}",
      {
        a: null,
        b: 5,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toBe(false);

  expect(
    evaluate(
      '${a | isEquals: 1 : "1" |isEquals: 2 : "2" | isEquals: 3 : "3" }',
      {
        a: 3,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toBe("3");

  expect(
    evaluate(
      '${a | isEquals: 1 : "1" |isEquals: 1 : "2" | isEquals: 1 : "3" }',
      {
        a: 1,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toBe("1");

  expect(
    evaluate(
      '${a | isEquals: 1 : "1" : "12" |isEquals: 2 : "2" | isEquals: 3 : "3" }',
      {
        a: 2,
      },
      {
        defaultFilter: "raw",
      }
    )
  ).toBe("12");
});

test("evalute:object-variable", () => {
  // const data = {
  //   key: "x",
  //   obj: {
  //     x: 1,
  //     y: 2,
  //   },
  // };
  // expect(evaluate("a is ${obj.x}", data)).toBe("a is 1");
  // expect(evaluate("a is ${obj[x]}", data)).toBe("a is 1");
  // expect(evaluate("a is ${obj[`x`]}", data)).toBe("a is 1");
  // expect(evaluate('a is ${obj["x"]}', data)).toBe("a is 1");
  // expect(evaluate("a is ${obj[key]}", data)).toBe("a is 1");
  // expect(evaluate("a is ${obj[`${key}`]}", data)).toBe("a is 1");
  // expect(evaluate("a is ${obj[${key}]}", data)).toBe("a is 1");
});

test("evalute:tempalte", () => {
  const data = {
    key: "x",
  };

  expect(evaluate("abc${`11${3}22`}xyz", data)).toBe("abc11322xyz");
  expect(evaluate("abc${`${3}22`}xyz", data)).toBe("abc322xyz");
  expect(evaluate("abc${`11${3}`}xyz", data)).toBe("abc113xyz");
  expect(evaluate("abc${`${3}`}xyz", data)).toBe("abc3xyz");
  expect(evaluate("abc${`${key}`}xyz", data)).toBe("abcxxyz");
});

test("evalute:literal", () => {
  const data = {
    dynamicKey: "alpha",
  };

  expect(
    evaluate('${{a: 1, 0: 2, "3": 3}}', data, {
      defaultFilter: "raw",
    })
  ).toMatchObject({
    a: 1,
    0: 2,
    3: 3,
  });

  expect(
    evaluate('${{a: 1, 0: 2, "3": 3, [`4`]: 4}}', data, {
      defaultFilter: "raw",
    })
  ).toMatchObject({
    a: 1,
    0: 2,
    3: 3,
    4: 4,
  });

  expect(
    evaluate('${{a: 1, 0: 2, "3": 3, [`${dynamicKey}233`]: 4}}', data, {
      defaultFilter: "raw",
    })
  ).toMatchObject({
    a: 1,
    0: 2,
    3: 3,
    alpha233: 4,
  });

  expect(
    evaluate('${[1, 2, `2${dynamicKey}2`, {a: 1, 0: 2, [`2`]: "3"}]}', data, {
      defaultFilter: "raw",
    })
  ).toMatchObject([1, 2, `2alpha2`, { a: 1, 0: 2, [`2`]: "3" }]);
});

test("evalute:variableName", () => {
  // const data = {
  //   "a-b": "c",
  //   222: 10222,
  //   "222_221": 233,
  //   "222_abcde": "abcde",
  //   "222-221": 333,
  // };
  // expect(evaluate("${a-b}", data)).toBe("c");
  // expect(evaluate("${222}", data)).toBe(222);
  // expect(evaluate("${222_221}", data)).toBe("233");
  // expect(evaluate("${222-221}", data)).toBe(1);
  // expect(evaluate("${222_abcde}", data)).toBe("abcde");
  // expect(
  //   evaluate('${&["222-221"]}', data, {
  //     defaultFilter: "raw",
  //   })
  // ).toBe(333);
  // expect(
  //   evaluate("222", data, {
  //     variableMode: true,
  //   })
  // ).toBe(10222);
});

test("evalute:3-1", () => {
  const data = {};

  expect(evaluate("${3-1}", data)).toBe(2);
  expect(evaluate("${-1 + 2.5 + 3}", data)).toBe(4.5);
  expect(evaluate("${-1 + -1}", data)).toBe(-2);
  expect(evaluate("${3 * -1}", data)).toBe(-3);

  expect(evaluate("${3 + +1}", data)).toBe(4);
});

test("evalate:0.1+0.2", () => {
  expect(evaluate("${0.1 + 0.2}", {})).toBe(0.3);
});

test("evalute:variable:com.xxx.xx", () => {
  const data = {
    "com.xxx.xx": "abc",
    "com xxx%xx": "cde",
    "com[xxx]": "eee",
  };

  expect(evaluate("${com\\.xxx\\.xx}", data)).toBe("abc");
  expect(evaluate("${com\\ xxx\\%xx}", data)).toBe("cde");
  expect(evaluate("${com\\[xxx\\]}", data)).toBe("eee");
});

test("evalute:anonymous:function", () => {
  const data = {
    arr: [1, 2, 3],
    arr2: [
      {
        a: 1,
      },
      {
        a: 2,
      },
      {
        a: 3,
      },
    ],
    outter: 4,
  };

  expect(evaluate("${() => 233}", data)).toMatchObject({
    args: [],
    return: { type: "literal", value: 233 },
    type: "anonymous_function",
  });

  expect(evaluate("${ARRAYMAP(arr, () => 1)}", data)).toMatchObject([1, 1, 1]);
  expect(evaluate("${ARRAYMAP(arr, item => item)}", data)).toMatchObject([
    1, 2, 3,
  ]);
  expect(evaluate("${ARRAYMAP(arr, item => item * 2)}", data)).toMatchObject([
    2, 4, 6,
  ]);
  expect(
    evaluate("${ARRAYMAP(arr2, (item, index) => `a${item.a}${index}`)}", data)
  ).toMatchObject(["a10", "a21", "a32"]);
  expect(
    evaluate(
      "${ARRAYMAP(arr2, (item, index) => `a${item.a}${index}${outter}`)}",
      data
    )
  ).toMatchObject(["a104", "a214", "a324"]);
  expect(
    evaluate(
      "${ARRAYMAP(arr2, (item, index) => {x: item.a, index: index})}",
      data
    )
  ).toMatchObject([
    {
      x: 1,
      index: 0,
    },
    {
      x: 2,
      index: 1,
    },
    {
      x: 3,
      index: 2,
    },
  ]);
});

test("evalute:anonymous:function2", () => {
  const data = {
    arr: [1, 2, 3],
    arr2: [
      {
        x: 1,
        y: [
          {
            z: 1,
          },
          {
            z: 1,
          },
        ],
      },
      {
        x: 2,
        y: [
          {
            z: 2,
          },
          {
            z: 2,
          },
        ],
      },
    ],
  };

  expect(
    evaluate(
      "${ARRAYMAP(ARRAYMAP(arr, item => item * 2), item => item + 2)}",
      data
    )
  ).toMatchObject([4, 6, 8]);

  expect(
    evaluate("${ARRAYMAP(arr2, item => ARRAYMAP(item.y, i => i.z))}", data)
  ).toMatchObject([
    [1, 1],
    [2, 2],
  ]);
});

test("evalute:array:func", () => {
  const data = {
    arr1: [0, 1, false, 2, "", 3],
    arr2: ["a", "b", "c"],
    arr3: [1, 2, 3],
    arr4: [2, 4, 6],
  };

  expect(evaluate("${COMPACT(arr1)}", data)).toMatchObject([1, 2, 3]);

  expect(evaluate("${COMPACT([0, 1, false, 2, '', 3])}", data)).toMatchObject([
    1, 2, 3,
  ]);

  expect(evaluate('${JOIN(arr2, "~")}', data)).toMatch("a~b~c");

  expect(evaluate("${SUM(arr3)}", data)).toBe(6);

  expect(evaluate("${AVG(arr4)}", data)).toBe(4);

  expect(evaluate("${MIN(arr4)}", data)).toBe(2);

  expect(evaluate("${MAX(arr4)}", data)).toBe(6);
});
