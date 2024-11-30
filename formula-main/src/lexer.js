export const TokenName = {
  1: "Boolean",
  RAW: "RAW",
  Variable: "Variable",
  OpenScript: "OpenScript",
  CloseScript: "CloseScript",
  EOF: "EOF",
  Identifier: "Identifier",
  Literal: "Literal",
  Numeric: "Numeric",
  Punctuator: "Punctuator",
  String: "String",
  RegularExpression: "RegularExpression",
  TemplateRaw: "TemplateRaw",
  TemplateLeftBrace: "TemplateLeftBrace",
  TemplateRightBrace: "TemplateRightBrace",
  OpenFilter: "OpenFilter",
  Char: "Char",
};

const mainStates = {
  START: 0,
  SCRIPT: 1,
  EXPRESSION: 2,
  BLOCK: 3,
  Template: 4,
  Filter: 5,
};

const rawStates = {
  START: 0,
  ESCAPE: 1,
};

const numberStates = {
  START: 0,
  ZERO: 1,
  DIGIT: 2,
  POINT: 3,
  DIGIT_FRACTION: 4,
  EXP: 5,
};

const stringStates = {
  START: 0,
  START_QUOTE_OR_CHAR: 1,
  ESCAPE: 2,
};

const filterStates = {
  START: 0,
  Func: 1,
  SEP: 2,
  ESCAPE: 3,
};

const punctuatorList = [
  "===",
  "!==",
  ">>>",
  "==",
  "!=",
  "<>",
  "<=",
  ">=",
  "||",
  "&&",
  "++",
  "--",
  "<<",
  ">>",
  "**",
  "+=",
  "*=",
  "/=",
  "<",
  ">",
  "=",
  "*",
  "/",
  "-",
  "+",
  "^",
  "!",
  "~",
  "%",
  "&",
  "|",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  "?",
  ":",
  ";",
  ",",
  ".",
  "$",
];

const escapes = {
  '"': 0, // Quotation mask
  "\\": 1, // Reverse solidus
  "/": 2, // Solidus
  b: 3, // Backspace
  f: 4, // Form feed
  n: 5, // New line
  r: 6, // Carriage return
  t: 7, // Horizontal tab
  u: 8, // 4 hexadecimal digits
};

function isDigit1to9(char) {
  return char >= "1" && char <= "9";
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}

function isExp(char) {
  return char === "e" || char === "E";
}

/**
 * @param {*} text
 * @param {*} allowedLetter
 * @returns
 */
function escapeString(text, allowedLetter) {
  return text.replace(/\\(.)/g, function (_, text) {
    return text === "b"
      ? "\b"
      : text === "f"
      ? "\f"
      : text === "n"
      ? "\n"
      : text === "r"
      ? "\r"
      : text === "t"
      ? "\t"
      : text === "v"
      ? "\v"
      : ~allowedLetter.indexOf(text)
      ? text
      : _;
  });
}

function formatNumber(value) {
  return Number(value);
}

/**
 * @param {*} input
 * @param {*} options
 * @returns
 */
export function lexer(input, options = {}) {
  let line = 1;
  let column = 1;
  let index = 0;
  let mainState = mainStates.START;
  const states = [mainState];
  let tokenCache = [];
  const allowFilter = options.allowFilter !== false;

  // evalMode 直接是运算表达式？还是从模板开始 ${} 里面才算运算表达式 variableMode 只支持取变量。
  if (options.evalMode || options.variableMode) {
    pushState(mainStates.EXPRESSION);
  }

  /**
   * @param {*} state
   */
  function pushState(state) {
    states.push((mainState = state));
  }
  function popState() {
    states.pop();
    mainState = states[states.length - 1];
  }

  /**
   * @param {*} value
   * @returns
   */
  function position(value = "") {
    if (value && typeof value === "string") {
      const lines = value.split(/[\r\n]+/);
      return {
        index: index + value.length,
        line: line + lines.length - 1,
        column: column + lines[lines.length - 1].length,
      };
    }

    return { index: index, line, column };
  }

  function eof() {
    if (index >= input.length) {
      return {
        type: TokenName.EOF,
        value: undefined,
        start: position(),
        end: position(),
      };
    }
  }

  function raw() {
    if (mainState !== mainStates.START) {
      return null;
    }

    let buffer = "";
    let state = rawStates.START;
    let i = index;

    while (i < input.length) {
      const ch = input[i];

      if (state === rawStates.ESCAPE) {
        if (escapes.hasOwnProperty(ch) || ch === "$") {
          buffer += ch;
          i++;
          state = rawStates.START;
        } else {
          const pos = position(buffer + ch);
          throw new SyntaxError(
            `Unexpected token ${ch} in ${pos.line}:${pos.column}`
          );
        }
      } else {
        if (ch === "\\") {
          buffer += ch;
          i++;
          state = rawStates.ESCAPE;
          continue;
        } else if (ch === "$") {
          const nextCh = input[i + 1];
          if (nextCh === "{") {
            break;
          } else if (nextCh === "$") {
            // $$ 用法兼容
            tokenCache.push({
              type: TokenName.Variable,
              value: "&",
              raw: "$$",
              start: position(input.substring(index, i)),
              end: position(input.substring(index, i + 2)),
            });
            break;
          } else {
            // 支持旧的 $varName 的取值方法
            const match = /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*/.exec(
              input.substring(i + 1)
            );
            if (match) {
              tokenCache.push({
                type: TokenName.Variable,
                value: match[0],
                raw: match[0],
                start: position(input.substring(index, i)),
                end: position(input.substring(index, i + 1 + match[0].length)),
              });
              break;
            }
          }
        }
        i++;
        buffer += ch;
      }
    }

    if (i > index) {
      return {
        type: TokenName.RAW,
        value: escapeString(buffer, ["`", "$"]),
        raw: buffer,
        start: position(),
        end: position(buffer),
      };
    }
    return tokenCache.length ? tokenCache.shift() : null;
  }

  function openScript() {
    if (mainState === mainStates.Template) {
      return null;
    }

    const ch = input[index];
    if (ch === "$") {
      const nextCh = input[index + 1];
      if (nextCh === "{") {
        pushState(mainStates.SCRIPT);
        const value = input.substring(index, index + 2);
        return {
          type: TokenName.OpenScript,
          value,
          start: position(),
          end: position(value),
        };
      }
    }
    return null;
  }

  function expression() {
    if (
      mainState !== mainStates.SCRIPT &&
      mainState !== mainStates.EXPRESSION &&
      mainState !== mainStates.BLOCK &&
      mainState !== mainStates.Filter
    ) {
      return null;
    }

    const token =
      literal() ||
      identifier() ||
      numberLiteral() ||
      stringLiteral() ||
      punctuator() ||
      char();

    if (token && token.value === "{") {
      pushState(mainStates.BLOCK);
    } else if (token && token.value === "}") {
      if (mainState === mainStates.Filter) {
        popState();
      }

      const prevState = mainState;
      popState();

      if (
        prevState === mainStates.SCRIPT ||
        prevState === mainStates.EXPRESSION
      ) {
        return {
          type: TokenName[
            prevState === mainStates.EXPRESSION
              ? "TemplateRightBrace"
              : "CloseScript"
          ],
          value: token.value,
          start: position(),
          end: position(token.value),
        };
      }
    }

    // filter 过滤器部分需要特殊处理
    if (
      mainState === mainStates.SCRIPT &&
      token &&
      token.value === "|" &&
      allowFilter
    ) {
      pushState(mainStates.Filter);
      return {
        type: TokenName.OpenFilter,
        value: "|",
        start: position(),
        end: position("|"),
      };
    } else if (
      mainState === mainStates.Filter &&
      token &&
      token.value === "|"
    ) {
      return {
        type: TokenName.OpenFilter,
        value: "|",
        start: position(),
        end: position("|"),
      };
    }

    if (!token && input[index] === "`") {
      pushState(mainStates.Template);
      return {
        type: TokenName.Punctuator,
        value: "`",
        start: position(),
        end: position("`"),
      };
    }

    return token;
  }

  function char() {
    if (mainState !== mainStates.Filter) {
      return null;
    }

    let i = index;
    let ch = input[i];
    if (ch === "\\") {
      const nextCh = input[i + 1];

      if (
        nextCh === "$" ||
        ~punctuatorList.indexOf(nextCh) ||
        escapes.hasOwnProperty(nextCh)
      ) {
        i++;
        ch =
          nextCh === "b"
            ? "\b"
            : nextCh === "f"
            ? "\f"
            : nextCh === "n"
            ? "\n"
            : nextCh === "r"
            ? "\r"
            : nextCh === "t"
            ? "\t"
            : nextCh === "v"
            ? "\v"
            : nextCh;
      } else {
        const pos = position(input.substring(index, index + 2));
        throw new SyntaxError(
          `Unexpected token ${nextCh} in ${pos.line}:${pos.column}`
        );
      }
    }
    const token = {
      type: TokenName.Char,
      value: ch,
      start: position(),
      end: position(input.substring(index, i + 1)),
    };
    return token;
  }

  function template() {
    if (mainState !== mainStates.Template) {
      return null;
    }
    let state = stringStates.START;
    let i = index;
    while (i < input.length) {
      const ch = input[i];

      if (state === stringStates.ESCAPE) {
        if (escapes.hasOwnProperty(ch) || ch === "`" || ch === "$") {
          i++;
          state = stringStates.START_QUOTE_OR_CHAR;
        } else {
          const pos = position(input.substring(index, i + 1));
          throw new SyntaxError(
            `Unexpected token ${ch} in ${pos.line}:${pos.column}`
          );
        }
      } else if (ch === "\\") {
        i++;
        state = stringStates.ESCAPE;
      } else if (ch === "`") {
        popState();
        tokenCache.push({
          type: TokenName.Punctuator,
          value: "`",
          start: position(input.substring(index, i)),
          end: position(input.substring(index, i + 1)),
        });
        break;
      } else if (ch === "$") {
        const nextCh = input[i + 1];
        if (nextCh === "{") {
          pushState(mainStates.EXPRESSION);
          tokenCache.push({
            type: TokenName.TemplateLeftBrace,
            value: "${",
            start: position(input.substring(index, i)),
            end: position(input.substring(index, i + 2)),
          });
          break;
        }
        i++;
      } else {
        i++;
      }
    }
    if (i > index) {
      const value = input.substring(index, i);
      return {
        type: TokenName.TemplateRaw,
        value: escapeString(value, ["`", "$"]),
        raw: value,
        start: position(),
        end: position(value),
      };
    }
    return tokenCache.length ? tokenCache.shift() : null;
  }

  /**
   * 格式化
   */
  function skipWhiteSpace() {
    while (index < input.length) {
      const ch = input[index];
      if (ch === "\r") {
        // CR (Unix)
        index++;
        line++;
        column = 1;
        if (input.charAt(index) === "\n") {
          // CRLF (Windows)
          index++;
        }
      } else if (ch === "\n") {
        // LF (MacOS)
        index++;
        line++;
        column = 1;
      } else if (ch === "\t" || ch === " ") {
        index++;
        column++;
      } else {
        break;
      }
    }
  }

  function punctuator() {
    const find = punctuatorList.find(
      (punctuator) =>
        input.substring(index, index + punctuator.length) === punctuator
    );
    if (find) {
      return {
        type: TokenName.Punctuator,
        value: find,
        start: position(),
        end: position(find),
      };
    }
    return null;
  }

  function literal() {
    let keyword = input.substring(index, index + 4).toLowerCase();
    let value = keyword;
    let isLiteral = false;
    if (keyword === "true" || keyword === "null") {
      isLiteral = true;
      value = keyword === "true" ? true : null;
    } else if (
      (keyword = input.substring(index, index + 5).toLowerCase()) === "false"
    ) {
      isLiteral = true;
      value = false;
    } else if (
      (keyword = input.substring(index, index + 9).toLowerCase()) ===
      "undefined"
    ) {
      isLiteral = true;
      value = undefined;
    }

    if (isLiteral) {
      return {
        type:
          value === true || value === false
            ? TokenName.BooleanLiteral
            : TokenName.Literal,
        value,
        raw: keyword,
        start: position(),
        end: position(keyword),
      };
    }
    return null;
  }

  function numberLiteral() {
    let i = index;

    let passedValueIndex = i;
    let state = numberStates.START;

    iterator: while (i < input.length) {
      const char = input.charAt(i);

      switch (state) {
        case numberStates.START: {
          if (char === "0") {
            passedValueIndex = i + 1;
            state = numberStates.ZERO;
          } else if (isDigit1to9(char)) {
            passedValueIndex = i + 1;
            state = numberStates.DIGIT;
          } else {
            return null;
          }
          break;
        }

        case numberStates.ZERO: {
          if (char === ".") {
            state = numberStates.POINT;
          } else if (isExp(char)) {
            state = numberStates.EXP;
          } else {
            break iterator;
          }
          break;
        }

        case numberStates.DIGIT: {
          if (isDigit(char)) {
            passedValueIndex = i + 1;
          } else if (char === ".") {
            state = numberStates.POINT;
          } else if (isExp(char)) {
            state = numberStates.EXP;
          } else {
            break iterator;
          }
          break;
        }

        case numberStates.POINT: {
          if (isDigit(char)) {
            passedValueIndex = i + 1;
            state = numberStates.DIGIT_FRACTION;
          } else {
            break iterator;
          }
          break;
        }

        case numberStates.DIGIT_FRACTION: {
          if (isDigit(char)) {
            passedValueIndex = i + 1;
          } else if (isExp(char)) {
            state = numberStates.EXP;
          } else {
            break iterator;
          }
          break;
        }
      }

      i++;
    }

    if (passedValueIndex > 0) {
      const value = input.slice(index, passedValueIndex);
      return {
        type: TokenName.NumericLiteral,
        value: formatNumber(value),
        raw: value,
        start: position(),
        end: position(value),
      };
    }

    return null;
  }

  function stringLiteral() {
    let startQuote = '"';
    let state = stringStates.START;
    let i = index;
    while (i < input.length) {
      const ch = input[i];

      if (state === stringStates.START) {
        if (ch === '"' || ch === "'") {
          startQuote = ch;
          i++;
          state = stringStates.START_QUOTE_OR_CHAR;
        } else {
          break;
        }
      } else if (state === stringStates.ESCAPE) {
        if (escapes.hasOwnProperty(ch) || ch === startQuote) {
          i++;
          state = stringStates.START_QUOTE_OR_CHAR;
        } else {
          const pos = position(input.substring(index, i + 1));
          throw new SyntaxError(
            `Unexpected token ${ch} in ${pos.line}:${pos.column}`
          );
        }
      } else if (ch === "\\") {
        i++;
        state = stringStates.ESCAPE;
      } else if (ch === startQuote) {
        i++;
        break;
      } else {
        i++;
      }
    }
    if (i > index) {
      const value = input.substring(index, i);
      return {
        type: TokenName.StringLiteral,
        value: escapeString(value.substring(1, value.length - 1), [startQuote]),
        raw: value,
        start: position(),
        end: position(value),
      };
    }
    return null;
  }

  function identifier() {
    // 变量模式是 resolveVariable 的时候使用的
    // 这个纯变量获取模式，不支持其他什么表达式
    // 仅仅支持 xxx.xxx 或者 xxx[ exression ] 这类语法
    // 所以纯变量模式支持纯数字作为变量名
    const reg = options.variableMode
      ? /^[\u4e00-\u9fa5A-Za-z0-9_$@][\u4e00-\u9fa5A-Za-z0-9_\-$@]*/
      : /^(?:[\u4e00-\u9fa5A-Za-z_$@]([\u4e00-\u9fa5A-Za-z0-9_\-$@]|\\(?:\.|\[|\]|\(|\)|\{|\}|\s|=|!|>|<|\||&|\+|-|\*|\/|\^|~|%|&|\?|:|;|,))*|\d+[\u4e00-\u9fa5A-Za-z_$@](?:[\u4e00-\u9fa5A-Za-z0-9_\-$@]|\\(?:\.|\[|\]|\(|\)|\{|\}|\s|=|!|>|<|\||&|\+|-|\*|\/|\^|~|%|&|\?|:|;|,))*)/;

    const match = reg.exec(
      input.substring(index, index + 256) // 变量长度不能超过 256
    );
    if (match) {
      return {
        type: TokenName.Identifier,
        value: match[0].replace(
          /\\(\.|\[|\]|\(|\)|\{|\}|\s|=|!|>|<|\||&|\+|-|\*|\/|\^|~|%|&|\?|:|;|,)/g,
          (_, v) => v
        ),
        start: position(),
        end: position(match[0]),
      };
    }
    return null;
  }

  function getNextToken() {
    if (tokenCache.length) {
      return tokenCache.shift();
    }

    if (
      mainState === mainStates.SCRIPT ||
      mainState === mainStates.EXPRESSION ||
      mainState === mainStates.BLOCK
    ) {
      skipWhiteSpace();
    }
    return eof() || raw() || openScript() || expression() || template();
  }

  return {
    next: function () {
      const token = getNextToken();

      if (token) {
        index = token.end.index;
        line = token.end.line;
        column = token.end.column;
        return token;
      }

      const pos = position();
      throw new SyntaxError(
        `unexpected character "${input[index]}" at ${pos.line}:${pos.column}`
      );
    },
  };
}
