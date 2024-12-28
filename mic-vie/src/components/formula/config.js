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
    children: [],
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
    children: [],
  },
  {
    title: "其他",
    children: [],
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
