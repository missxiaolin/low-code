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
    children: [
      {
        title: "LEFT",
        doc: `LEFT(text, len)`,
        desc: "返回传入文本左侧的指定长度字符串。",
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
          {
            name: "len",
            type: "number",
            desc: `要处理的长度`,
          },
        ],
      },
      {
        title: "RIGHT",
        doc: `RIGHT(text, len)`,
        desc: "返回传入文本右侧的指定长度字符串。",
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
          {
            name: "len",
            type: "number",
            desc: `要处理的长度`,
          },
        ],
      },
      {
        title: "LEN",
        doc: `LEN(text)`,
        desc: "计算文本的长度。",
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
        ],
      },
      {
        title: "LENGTH",
        doc: `LENGTH(textArr)`,
        desc: "计算文本集合中所有文本的长度。",
        children: [
          {
            name: "textArr",
            type: "Array<string>",
            desc: "要处理的文本集合",
          },
        ],
      },
      {
        title: "ISEMPTY",
        doc: `ISEMPTY(text)`,
        desc: "判断文本是否为空。",
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
        ],
      },
      {
        title: "CONCATENATE",
        doc: `CONCATENATE(text1, text2, ...textN)`,
        desc: "将多个传入值连接成文本。",
        children: [
          {
            name: "text",
            type: "...string",
            desc: "文本集合",
          },
        ],
      },
      {
        title: "CHAR",
        doc: `CHAR(code)`,
        desc: `返回计算机字符集的数字代码所对应的字符。 示例：\`CHAR(97)\` 等价于 "a"。`,
        children: [
          {
            name: "code",
            type: "number",
            desc: "编码值",
          },
        ],
      },
      {
        title: "LOWER",
        doc: `LOWER(text)`,
        desc: `将传入文本转成小写。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "UPPER",
        doc: `UPPER(text)`,
        desc: `将传入文本转成大写。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "UPPERFIRST",
        doc: `UPPERFIRST(text)`,
        desc: `将传入文本首字母转成大写。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "PADSTART",
        doc: `PADSTART(text)`,
        desc: `向前补齐文本长度。 示例 \`PADSTART("6", 2, "0")\`， 返回 \`06\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "CAPITALIZE",
        doc: `CAPITALIZE(text)`,
        desc: `将文本转成标题。 示例 \`CAPITALIZE("star")\`， 返回 \`Star\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "ESCAPE",
        doc: `ESCAPE(text)`,
        desc: `对文本进行 HTML 转义。 示例 \`ESCAPE("<star>&")\`， 返回 \`&lt;start&gt;&amp;\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "TRUNCATE",
        doc: `TRUNCATE(text, 6)`,
        desc: `对文本长度进行截断。 示例 \`TRUNCATE("xiaolin.com", 6)\`， 返回 \`xiaolin...\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
          {
            name: "text",
            type: "number",
            desc: "最长长度",
          },
        ],
      },
      {
        title: "BEFORELAST",
        doc: `BEFORELAST(text, '.')`,
        desc: `取在某个分隔符之前的所有字符串。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
          {
            name: "delimiter",
            type: "string",
            desc: "结束文本",
          },
        ],
      },
      {
        title: "SPLIT",
        doc: `SPLIT(text, ',')`,
        desc: `将文本根据指定片段分割成数组。 示例：\`SPLIT("a,b,c", ",")\`， 返回 \`["a", "b", "c"]\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
          {
            name: "delimiter",
            type: "string",
            desc: "文本片段",
          },
        ],
      },
      {
        title: "TRIM",
        doc: `TRIM(text)`,
        desc: `将文本去除前后空格。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "STRIPTAG",
        doc: `STRIPTAG(text)`,
        desc: `去除文本中的 HTML 标签。 示例：\`STRIPTAG("<b>xialin</b>")\`， 返回：\`xiaolin\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "LINEBREAK",
        doc: `LINEBREAK(text)`,
        desc: `将字符串中的换行转成 HTML \` <br >\`，用于简单换行的场景。 示例：\`LINEBREAK("\n")\`， 返回：\`<br/>\`。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
        ],
      },
      {
        title: "STARTSWITH",
        doc: `STARTSWITH(text, '片段')`,
        desc: `判断字符串(text)是否以特定字符串(startString)开始，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
          {
            name: "startString",
            type: "string",
            desc: "起始文本",
          },
        ],
      },
      {
        title: "ENDSWITH",
        doc: `ENDSWITH(text, '片段')`,
        desc: `判断字符串(text)是否以特定字符串(endString)结束，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
          {
            name: "startString",
            type: "string",
            desc: "起始文本",
          },
        ],
      },
      {
        title: "CONTAINS",
        doc: `CONTAINS(text, searchText)`,
        desc: `判断参数 1 中的文本是否包含参数 2 中的文本，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "文本",
          },
          {
            name: "searchText",
            type: "string",
            desc: "搜索文本",
          },
        ],
      },
      {
        title: "REPLACE",
        doc: `REPLACE(text, search, replace)`,
        desc: `对文本进行全量替换。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
          {
            name: "search",
            type: "string",
            desc: "要被替换的文本",
          },
          {
            name: "replace",
            type: "string",
            desc: "要替换的文本",
          },
        ],
      },
      {
        title: "SEARCH",
        doc: `SEARCH(text, search, 0)`,
        desc: `对文本进行搜索，返回命中的位置。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
          {
            name: "search",
            type: "string",
            desc: "要被替换的文本",
          },
          {
            name: "start",
            type: "number",
            desc: "起始位置",
          },
        ],
      },
      {
        title: "MID",
        doc: `MID(text, from, len)`,
        desc: `返回文本字符串中从指定位置开始的特定数目的字符。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
          {
            name: "from",
            type: "number",
            desc: "起始位置",
          },
          {
            name: "len",
            type: "number",
            desc: "处理长度",
          },
        ],
      },
      {
        title: "BASENAME",
        doc: `BASENAME(text)`,
        desc: `返回路径中的文件名。 示例：\`/home/xiaolin/a.json\`， 返回：a.json。`,
        children: [
          {
            name: "text",
            type: "string",
            desc: "要处理的文本",
          },
        ],
      },
      {
        title: "UUID",
        doc: `UUID(8)`,
        desc: `生成UUID字符串`,
        children: [
          {
            name: "length",
            type: "number",
            desc: "生成的UUID字符串长度，默认为32位",
          },
        ],
      },
    ],
  },
  {
    title: "日期函数",
    children: [
      {
        title: "DATE",
        doc: "DATE('2021-12-06 08:20:00')",
        desc: "创建日期对象，可以通过特定格式的字符串，或者数值。 需要注意的是，其中月份的数值是从0开始的， 即如果是12月份，你应该传入数值11。",
        children: [],
      },
      {
        title: "TIMESTAMP",
        doc: `TIMESTAMP(date[, format = "X"])`,
        desc: "返回时间的时间戳。",
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "format",
            type: "string",
            desc: `时间戳格式，带毫秒传入 'x'。默认为 'X' 不带毫秒的。`,
          },
        ],
      },
      {
        title: "TODAY",
        doc: `TODAY()`,
        desc: "返回今天的日期。",
        children: [],
      },
      {
        title: "NOW",
        doc: `NOW()`,
        desc: "返回现在的日期",
        children: [],
      },
      {
        title: "WEEKDAY",
        doc: `WEEKDAY(date)`,
        desc: "获取日期的星期几。 示例 WEEKDAY('2023-02-27') 得到 0。 WEEKDAY('2023-02-27', 2) 得到 1。",
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期",
          },
          {
            name: "type",
            type: "number",
            desc: "星期定义类型，默认为1，1表示0至6代表星期一到星期日，2表示1至7代表星期一到星期日",
          },
        ],
      },
      {
        title: "WEEK",
        doc: `WEEK(date)`,
        desc: `获取年份的星期，即第几周。 示例 WEEK('2023-03-05') 得到 9。`,
        children: [
          {
            name: "date",
            type: "any",
            desc: "日期",
          },
          {
            name: "isISO",
            type: "boolean",
            desc: "是否ISO星期",
          },
        ],
      },
      {
        title: "DATETOSTR",
        doc: `DATETOSTR(date, 'YYYY-MM-DD')`,
        desc: `对日期、日期字符串、时间戳进行格式化。 示例 DATETOSTR('12/25/2022', 'YYYY-MM-DD') 得到 '2022.12.25'， DATETOSTR(1676563200, 'YYYY.MM.DD') 得到 '2023.02.17'， DATETOSTR(1676563200000, 'YYYY.MM.DD hh:mm:ss') 得到 '2023.02.17 12:00:00'， DATETOSTR(DATE('2021-12-21'), 'YYYY.MM.DD hh:mm:ss') 得到 '2021.12.21 08:00:00'。`,
        children: [
          {
            name: "date",
            type: "any",
            desc: "日期对象、日期字符串、时间戳",
          },
          {
            name: "format",
            type: "string",
            desc: `日期格式，默认为 "YYYY-MM-DD HH:mm:ss`,
          },
        ],
      },
      {
        title: "DATERANGESPLIT",
        doc: `DATERANGESPLIT(date, 'YYYY-MM-DD')`,
        desc: `获取日期范围字符串中的开始时间、结束时间。 示例： DATERANGESPLIT('1676563200, 1676735999') 得到 [1676563200, 1676735999]， DATERANGESPLIT('1676563200, 1676735999', undefined , 'YYYY.MM.DD hh:mm:ss') 得到 [2023.02.17 12:00:00, 2023.02.18 11:59:59]， DATERANGESPLIT('1676563200, 1676735999', 0 , 'YYYY.MM.DD hh:mm:ss') 得到 '2023.02.17 12:00:00'， DATERANGESPLIT('1676563200, 1676735999', 'start' , 'YYYY.MM.DD hh:mm:ss') 得到 '2023.02.17 12:00:00'， DATERANGESPLIT('1676563200, 1676735999', 1 , 'YYYY.MM.DD hh:mm:ss') 得到 '2023.02.18 11:59:59'， DATERANGESPLIT('1676563200, 1676735999', 'end' , 'YYYY.MM.DD hh:mm:ss') 得到 '2023.02.18 11:59:59'。`,
        children: [
          {
            name: "date",
            type: "string",
            desc: "日期范围字符串",
          },
          {
            name: "key",
            type: "string",
            desc: `取值标识，0或'start'表示获取开始时间，1或'end'表示获取结束时间`,
          },
          {
            name: "format",
            type: "string",
            desc: `日期格式，可选`,
          },
          {
            name: "delimiter",
            type: "string",
            desc: `分隔符，可选，默认为','`,
          },
        ],
      },
      {
        title: "STARTOF",
        doc: `STARTOF(date[unit = "day"])`,
        desc: `返回日期的指定范围的开端。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "unit",
            type: "string",
            desc: `比如可以传入 'day'、'month'、'year' 或者 'week' 等等`,
          },
          {
            name: "format",
            type: "string",
            desc: `日期格式，可选`,
          },
        ],
      },
      {
        title: "ENDOF",
        doc: `ENDOF(date[unit = "day"])`,
        desc: `返回日期的指定范围的末尾。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "unit",
            type: "string",
            desc: `比如可以传入 'day'、'month'、'year' 或者 'week' 等等`,
          },
          {
            name: "format",
            type: "string",
            desc: `日期格式，可选`,
          },
        ],
      },
      {
        title: "YEAR",
        doc: `YEAR(date)`,
        desc: `返回日期的年份。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "MONTH",
        doc: `MONTH(date)`,
        desc: `返回日期的月份，这里就是自然月份。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "DAY",
        doc: `DAY(date)`,
        desc: `返回日期的天。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "HOUR",
        doc: `HOUR(date)`,
        desc: `返回日期的小时。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "MINUTE",
        doc: `MINUTE(date)`,
        desc: `返回日期的分。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "SECOND",
        doc: `SECOND(date)`,
        desc: `返回日期的秒。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "YEARS",
        doc: `YEARS(endDate, startDate)`,
        desc: `返回两个日期相差多少年。`,
        children: [
          {
            name: "endDate",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "startDate",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "MINUTES",
        doc: `MINUTES(endDate, startDate)`,
        desc: `返回两个日期相差多少分钟。`,
        children: [
          {
            name: "endDate",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "startDate",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "DAYS",
        doc: `DAYS(endDate, startDate)`,
        desc: `返回两个日期相差多少天。`,
        children: [
          {
            name: "endDate",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "startDate",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "HOURS",
        doc: `HOURS(endDate, startDate)`,
        desc: `返回两个日期相差多少小时。`,
        children: [
          {
            name: "endDate",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "startDate",
            type: "date",
            desc: "日期对象",
          },
        ],
      },
      {
        title: "DATEMODIFY",
        doc: `DATEMODIFY(date, 2, 'days')`,
        desc: `修改日期，对日期进行加减天、月份、年等操作。 示例： DATEMODIFY(A, -2, 'month')， 对日期 A 进行往前减2月的操作。`,
        children: [
          {
            name: "date",
            type: "date",
            desc: "日期对象",
          },
          {
            name: "num",
            type: "number",
            desc: "数值",
          },
          {
            name: "unit",
            type: "string",
            desc: "单位：支持年、月、天等等",
          },
        ],
      },
      {
        title: "STRTODATE",
        doc: `STRTODATE(value[, format=""])`,
        desc: `将字符日期转成日期对象，可以指定日期格式。 示例：STRTODATE('2021/12/6', 'YYYY/MM/DD')`,
        children: [
          {
            name: "value",
            type: "string",
            desc: "日期字符",
          },
          {
            name: "format",
            type: "string",
            desc: "日期格式",
          },
        ],
      },
      {
        title: "ISBEFORE",
        doc: `ISBEFORE(a, b)`,
        desc: `判断两个日期，是否第一个日期在第二个日期的前面，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "a",
            type: "data",
            desc: "第一个日期",
          },
          {
            name: "b",
            type: "data",
            desc: "第二个日期",
          },
          {
            name: "unit",
            type: "string",
            desc: `单位，默认是 'day'， 即之比较到天`,
          },
        ],
      },
      {
        title: "ISAFTER",
        doc: `ISAFTER(a, b)`,
        desc: `判断两个日期，是否第一个日期在第二个日期的后面，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "a",
            type: "data",
            desc: "第一个日期",
          },
          {
            name: "b",
            type: "data",
            desc: "第二个日期",
          },
          {
            name: "unit",
            type: "string",
            desc: `单位，默认是 'day'， 即之比较到天`,
          },
        ],
      },
      {
        title: "BETWEENRANGE",
        doc: `BETWEENRANGE(date, [start, end])`,
        desc: `判断日期是否在指定范围内，是则返回 true，否则返回 false。 示例：BETWEENRANGE('2021/12/6', ['2021/12/5','2021/12/7'])。`,
        children: [
          {
            name: "date",
            type: "any",
            desc: "第一个日期",
          },
          {
            name: "daterange",
            type: "Array<any>",
            desc: "日期范围",
          },
          {
            name: "unit",
            type: "string",
            desc: `单位，默认是 'day'， 即之比较到天`,
          },
          {
            name: "inclusivity",
            type: "string",
            desc: `包容性规则，默认为'[]'。[ 表示包含、( 表示排除，如果使用包容性参数，则必须传入两个指示符，如'()'表示左右范围都排除'。`,
          },
        ],
      },
      {
        title: "ISSAMEORBEFORE",
        doc: `ISSAMEORBEFORE(a, b)`,
        desc: `判断两个日期，是否第一个日期在第二个日期的前面或者相等，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "a",
            type: "data",
            desc: "第一个日期",
          },
          {
            name: "b",
            type: "data",
            desc: "第二个日期",
          },
          {
            name: "unit",
            type: "string",
            desc: `单位，默认是 'day'， 即之比较到天。`,
          },
        ],
      },
      {
        title: "ISSAMEORAFTER",
        doc: `ISSAMEORAFTER(a, b)`,
        desc: `判断两个日期，是否第一个日期在第二个日期的后面或者相等，是则返回 true，否则返回 false。`,
        children: [
          {
            name: "a",
            type: "data",
            desc: "第一个日期",
          },
          {
            name: "b",
            type: "data",
            desc: "第二个日期",
          },
          {
            name: "unit",
            type: "string",
            desc: `单位，默认是 'day'， 即之比较到天。`,
          },
        ],
      },
    ],
  },
  {
    title: "数组",
    children: [
      {
        title: "COUNT",
        doc: "COUNT(arr)",
        desc: "返回数组的长度。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
        ],
      },
      {
        title: "ARRAYMAP",
        doc: "ARRAYMAP(arr, item => item)",
        desc: "数组做数据转换，需要搭配箭头函数一起使用，注意箭头函数只支持单表达式用法。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "iterator",
            type: "Array<any>",
            desc: "箭头函数",
          },
        ],
      },
      {
        title: "ARRAYFILTER",
        doc: "ARRAYFILTER(arr, item => item)",
        desc: "数据做数据过滤，需要搭配箭头函数一起使用，注意箭头函数只支持单表达式用法。 将第二个箭头函数返回为 false 的成员过滤掉。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "iterator",
            type: "Array<any>",
            desc: "箭头函数",
          },
        ],
      },
      {
        title: "ARRAYFINDINDEX",
        doc: "ARRAYFINDINDEX(arr, item => item === 2)",
        desc: "数据做数据查找，需要搭配箭头函数一起使用，注意箭头函数只支持单表达式用法。 找出第二个箭头函数返回为 true 的成员的索引。 示例： ARRAYFINDINDEX([0, 2, false], item => item === 2) 得到 1。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "iterator",
            type: "Array<any>",
            desc: "箭头函数",
          },
        ],
      },
      {
        title: "ARRAYFIND",
        doc: "ARRAYFIND(arr, item => item === 2)",
        desc: "数据做数据查找，需要搭配箭头函数一起使用，注意箭头函数只支持单表达式用法。 找出第二个箭头函数返回为 true 的成员。 示例： ARRAYFIND([0, 2, false], item => item === 2) 得到 2。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "iterator",
            type: "Array<any>",
            desc: "箭头函数",
          },
        ],
      },
      {
        title: "ARRAYSOME",
        doc: "ARRAYSOME(arr, item => item === 2)",
        desc: "数据做数据遍历判断，需要搭配箭头函数一起使用，注意箭头函数只支持单表达式用法。 判断第二个箭头函数是否存在返回为 true 的成员，是则返回 true，否则返回 false。 示例： ARRAYSOME([0, 2, false], item => item === 2) 得到 true。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "iterator",
            type: "Array<any>",
            desc: "箭头函数",
          },
        ],
      },
      {
        title: "ARRAYEVERY",
        doc: "ARRAYEVERY(arr, item => item === 2)",
        desc: "数据做数据遍历判断，需要搭配箭头函数一起使用，注意箭头函数只支持单表达式用法。 判断第二个箭头函数返回是否都为 true，是则返回 true，否则返回 false。 示例： ARRAYEVERY([0, 2, false], item => item === 2) 得到 false",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "iterator",
            type: "Array<any>",
            desc: "箭头函数",
          },
        ],
      },
      {
        title: "ARRAYINCLUDES",
        doc: "ARRAYINCLUDES(arr, 2)",
        desc: "判断数据中是否存在指定元素。 示例： ARRAYINCLUDES([0, 2, false], 2) 得到 true。",
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "item",
            type: "any",
            desc: "元素",
          },
        ],
      },
      {
        title: "COMPACT",
        doc: "COMPACT(arr)",
        desc: `数组过滤掉 false、null、0 和 ""。 示例： COMPACT([0, 1, false, 2, '', 3]) 得到 [1, 2, 3]。`,
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
        ],
      },
      {
        title: "JOIN",
        doc: "JOIN(arr, string)",
        desc: `数组转成字符串。 示例： JOIN(['a', 'b', 'c'], '=') 得到 'a=b=c'。`,
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "separator",
            type: "string",
            desc: "分隔符",
          },
        ],
      },
      {
        title: "CONCAT",
        doc: "CONCAT(['a', 'b', 'c'], ['1'], ['3'])",
        desc: `数组合并。 示例： CONCAT(['a', 'b', 'c'], ['1'], ['3']) 得到 ['a', 'b', 'c', '1', '3']。`,
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
        ],
      },
      {
        title: "UNIQ",
        doc: "UNIQ([{a: '1'}, {b: '2'}, {a: '1'}], 'x')",
        desc: `数组去重，第二个参数「field」，可指定根据该字段去重。 示例： UNIQ([{a: '1'}, {b: '2'}, {a: '1'}]， 'id')。`,
        children: [
          {
            name: "arr",
            type: "array",
            desc: "数组",
          },
          {
            name: "field",
            type: "string",
            desc: "字段",
          },
        ],
      },
    ],
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
