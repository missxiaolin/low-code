export const customLanguageM = {
  // 定义关键词和操作符
  keywords: ["IF", "AND", "OR", "XOR", "IFS"],
  operators: ["+", "-", "*", "/"],
  symbols: /[=><!~?:&|+\-*\/^%]+/,

  tokenizer: {
    root: [
      // 数字
      [/\d+/, "number"],

      // 函数名
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // 操作符
      [/[{}()\[\]]/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],
    ],
  },
};

export const suggestionsFun = (monaco) => {
  return [
    {
      label: "IF",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "IF(${1:condition}, ${2:consequent}, ${3:alternate})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: "IF function",
      documentation: {
        value:
          "The `IF` function returns one value if a logical expression is TRUE and another if it is FALSE.",
        isTrusted: true, // 确保文档内容被正确信任
      },
    },
    {
      label: "AND",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "AND(${1:expression1}, ${2:expression1})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: "AND function",
      documentation: {
        value:
          "The `AND` function returns TRUE if all of its arguments are TRUE, and FALSE if any of the arguments are FALSE.",
        isTrusted: true, // 确保文档内容被正确信任
      },
    },
    {
      label: "OR",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "OR(${1:expression1}, ${2:expression1})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: "OR function",
      documentation: {
        value:
          "The `OR` function returns TRUE if any of its arguments are TRUE, and FALSE if all of the arguments are FALSE.",
        isTrusted: true, // 确保文档内容被正确信任
      },
    },
    {
      label: "XOR",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "XOR(${1:condition1}, ${2:condition1})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: "XOR function",
      documentation: {
        value:
          "The `XOR` function returns TRUE if an odd number of its arguments are TRUE, and FALSE if an even number of the arguments are TRUE.",
        isTrusted: true, // 确保文档内容被正确信任
      },
    },
    {
      label: "IFS",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "IFS()",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: "IFS function",
      documentation: {
        value:
          "The `IFS` function returns the value of the first argument if it is TRUE, and the value of the second argument if the first argument is FALSE.",
        isTrusted: true, // 确保文档内容被正确信任
      },
    },
  ];
};

export const collapseList = [
  {
    title: "函数",
    children: [
      {
        title: "IF",
        doc: "IF(condition, consequent, alternate)",
        desc: "如果满足条件condition，则返回consequent，否则返回alternate，支持多层嵌套IF函数。 等价于直接用JS表达式如：condition ? consequent : alternate。",
        children: [
          {
            name: "condition",
            type: "expression",
            desc: "条件表达式。例如：语文成绩>80",
          },
          {
            name: "consequent",
            type: "any",
            desc: "条件判断通过的返回结果",
          },
          {
            name: "alternate",
            type: "any",
            desc: "条件判断不通过的返回结果",
          },
        ],
      },
      {
        title: "AND",
        doc: "AND(expression1, expression2, ...expressionN)",
        desc: "条件全部符合，返回 true，否则返回 false。 示例：AND(语文成绩>80, 数学成绩>80)， 语文成绩和数学成绩都大于 80，则返回 true，否则返回 false， 等价于直接用JS表达式如：语文成绩>80 && 数学成绩>80。",
        children: [
          {
            name: "conditions",
            type: "...expression",
            desc: "条件表达式，多个用逗号隔开。例如：语文成绩>80, 数学成绩>80",
          },
        ],
      },
      {
        title: "OR",
        doc: "OR(expression1, expression2, ...expressionN)",
        desc: "条件任意一个满足条件，返回 true，否则返回 false。 示例：OR(语文成绩>80, 数学成绩>80)， 语文成绩和数学成绩任意一个大于 80，则返回 true，否则返回 false， 等价于直接用JS表达式如：语文成绩>80 || 数学成绩>80。",
        children: [
          {
            name: "conditions",
            type: "...expression",
            desc: "...expression	条件表达式，多个用逗号隔开。例如：语文成绩>80, 数学成绩>80",
          },
        ],
      },
      {
        title: "XOR",
        doc: "XOR(condition1, condition2, ...expressionN)",
        desc: "异或处理，多个表达式组中存在奇数个真时认为真。 示例：XOR(语文成绩 > 80, 数学成绩 > 80, 英语成绩 > 80) 三门成绩中有一门或者三门大于 80，则返回 true，否则返回 false。",
        children: [
          {
            name: "condition",
            type: "...expression",
            desc: "条件表达式，多个用逗号隔开。例如：语文成绩>80, 数学成绩>80",
          },
        ],
      },
      {
        title: "IFS",
        doc: "IFS(condition1, result1, condition2, result2,...conditionN, resultN)",
        desc: `判断函数集合，相当于多个 else if 合并成一个。 示例：IFS(语文成绩 > 80, "优秀", 语文成绩 > 60, "良", "继续努力")， 如果语文成绩大于 80，则返回优秀，否则判断大于 60 分，则返回良，否则返回继续努力。`,
        children: [
          {
            name: "condition",
            type: "...expression",
            desc: "条件表达式",
          },
          {
            name: "result",
            type: "...any",
            desc: "返回值",
          },
        ],
      },
    ],
  },
  {
    title: "数学函数",
    children: [
      {
        title: "ABS",
        doc: "ABS(num)",
        desc: "返回传入数字的绝对值。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "数值",
          },
        ],
      },
      {
        title: "MIN",
        doc: "MIN(num1, num2, ...numN)",
        desc: "获取最小值，如果只有一个参数且是数组，则计算这个数组内的值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "数值",
          },
        ],
      },
      {
        title: "MAX",
        doc: "MAX(num1, num2, ...numN)",
        desc: "获取最大值，如果只有一个参数且是数组，则计算这个数组内的值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "数值",
          },
        ],
      },
      {
        title: "MAX",
        doc: "SUM(num1, num2, ...numN)",
        desc: "求和，如果只有一个参数且是数组，则计算这个数组内的值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "数值",
          },
        ],
      },
      {
        title: "INT",
        doc: "INT(num)",
        desc: "将数值向下取整为最接近的整数。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "数值",
          },
        ],
      },
      {
        title: "MOD",
        doc: "MOD(num, divisor)",
        desc: "将返回两数相除的余数，参数 number 是被除数，divisor 是除数。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "被除数",
          },
          {
            name: "divisor",
            type: "number",
            desc: "除数",
          },
        ],
      },
      {
        title: "PI",
        doc: "PI()",
        desc: "圆周率 3.1415...。",
        children: [],
      },
      {
        title: "ROUND",
        doc: "ROUND(num[, numDigits = 2])",
        desc: "将数字四舍五入到指定的位数，可以设置小数位。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "要处理的数字",
          },
          {
            name: "numDigits",
            type: "number",
            desc: "小数位数，默认为2",
          },
        ],
      },
      {
        title: "FLOOR",
        doc: "FLOOR(num[, numDigits=2])",
        desc: "将数字向下取整到指定的位数，可以设置小数位。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "要处理的数字",
          },
          {
            name: "numDigits",
            type: "number",
            desc: "小数位数，默认为2",
          },
        ],
      },
      {
        title: "CEIL",
        doc: "CEIL(num[, numDigits=2])",
        desc: "将数字向上取整到指定的位数，可以设置小数位。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "要处理的数字",
          },
          {
            name: "numDigits",
            type: "number",
            desc: "小数位数，默认为2",
          },
        ],
      },
      {
        title: "SQRT",
        doc: "SQRT(num)",
        desc: "开平方，参数 number 为非负数",
        children: [
          {
            name: "num",
            type: "number",
            desc: "要处理的数字",
          },
        ],
      },
      {
        title: "AVG",
        doc: "AVG(num1, num2, ...numN)",
        desc: "返回所有参数的平均值，如果只有一个参数且是数组，则计算这个数组内的值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "要处理的数字",
          },
        ],
      },
      {
        title: "DEVSQ",
        doc: "DEVSQ(num1, num2, ...numN)",
        desc: "返回数据点与数据均值点之差（数据偏差）的平方和，如果只有一个参数且是数组，则计算这个数组内的值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "要处理的数字",
          },
        ],
      },
      {
        title: "AVEDEV",
        doc: "AVEDEV(num1, num2, ...numN)",
        desc: "数据点到其算术平均值的绝对偏差的平均值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "要处理的数字",
          },
        ],
      },
      {
        title: "HARMEAN",
        doc: "HARMEAN(num1, num2, ...numN)",
        desc: "数据点的调和平均值，如果只有一个参数且是数组，则计算这个数组内的值。",
        children: [
          {
            name: "num",
            type: "...number",
            desc: "要处理的数字",
          },
        ],
      },
      {
        title: "LARGE",
        doc: "LARGE(array, k)",
        desc: "数据集中第 k 个最大值。",
        children: [
          {
            name: "nums",
            type: "array",
            desc: "要处理的数字",
          },
          {
            name: "k",
            type: "number",
            desc: "第几大",
          },
        ],
      },
      {
        title: "UPPERMONEY",
        doc: "UPPERMONEY(num)",
        desc: "将数值转为中文大写金额。",
        children: [
          {
            name: "num",
            type: "number",
            desc: "要处理的数字",
          },
        ],
      },
      {
        title: "RAND",
        doc: "RAND()",
        desc: "返回大于等于 0 且小于 1 的均匀分布随机实数。每一次触发计算都会变化。 示例：`RAND()*100`， 返回 0-100 之间的随机数。",
        children: [],
      },
      {
        title: "LAST",
        doc: "LAST(array)",
        desc: "取数据最后一个。",
        children: [
          {
            name: "arr",
            type: "...number",
            desc: "要处理的数组",
          },
        ],
      },
      {
        title: "POW",
        doc: "POW(base, exponent)",
        desc: "返回基数的指数次幂，参数base为基数，exponent为指数，如果参数值不合法则返回基数本身，计算结果不合法，则返回NaN。",
        children: [
          {
            name: "base",
            type: "number",
            desc: "基数",
          },
          {
            name: "exponent",
            type: "number",
            desc: "指数",
          },
        ],
      },
    ],
  },
  {
    title: "文本函数",
    children: [],
  },
  {
    title: "日期函数",
    children: [],
  },
  {
    title: "数组",
    children: [],
  },
  {
    title: "编码",
    children: [
      {
        title: "ENCODEJSON",
        doc: "ENCODEJSON({name: 'xiaolin'})",
        desc: `将JS对象转换成JSON字符串。 示例： ENCODEJSON({name: 'xiaolin'}) 得到 '{"name":"xiaolin"}'。`,
        children: [
          {
            name: "obj",
            type: "any",
            desc: "对象或数组",
          },
        ],
      },
      {
        title: "DECODEJSON",
        doc: `DECODEJSON('{\"name\": "xiaolin"}')`,
        desc: `解析JSON编码数据，返回JS对象。 示例： DECODEJSON('{\"name\": "xiaolin"}') 得到 {name: 'xiaolin'}。`,
        children: [
          {
            name: "str",
            type: "string",
            desc: "字符串",
          },
        ],
      },
    ],
  },
  {
    title: "其他",
    children: [
      {
        title: "GET",
        doc: "GET(arr, 2)",
        desc: "根据对象或者数组的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。 示例： GET([0, 2, {name: 'xiaolin', age: 18}], 1) 得到 2， GET([0, 2, {name: 'xiaolin', age: 18}], '2.name') 得到 'xiaolin'， GET({arr: [{name: 'xiaolin', age: 18}]}, 'arr[0].name') 得到 'xiaolin'， GET({arr: [{name: 'xiaolin', age: 18}]}, 'arr.0.name') 得到 'xiaolin'， GET({arr: [{name: 'xiaolin', age: 18}]}, 'arr.1.name', 'not-found') 得到 'not-found'。",
        children: [
          {
            name: "obj",
            type: "any",
            desc: "对象或数组",
          },
          {
            name: "path",
            type: "string",
            desc: "路径",
          },
          {
            name: "defaultValue",
            type: "any",
            desc: "如果解析不到则返回该值",
          },
        ],
      },
      {
        title: "ISTYPE",
        doc: "ISTYPE([{a: '1'}, {b: '2'}, {a: '1'}], 'array')",
        desc: "判断是否为类型支持：string, number, array, date, plain-object。",
        children: [
          {
            name: "判断对象	string",
            type: "string",
            desc: "",
          },
        ],
      },
    ],
  },
];

export const collapseColumns = [
  {
    title: "参数名称",
    dataIndex: "name",
  },
  {
    title: "参数类型",
    dataIndex: "type",
  },
  {
    title: "参数描述",
    dataIndex: "desc",
  },
];
