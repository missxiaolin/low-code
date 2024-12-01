import { lexer as createLexer, TokenName } from "./lexer";
const argListStates = {
  START: 0,
  COMMA: 1,
  SET: 2,
};

const tempalteStates = {
  START: 0,
  SCRIPTING: 1,
};

const objectStates = {
  START: 0,
  KEY: 1,
  COLON: 2,
  VALUE: 3,
  COMMA: 4,
};

export function parse(input, options) {
  let token;
  const lexer = createLexer(input, options);
  const tokens = [];
  const tokenChunk = [];

  // 允许的变量名字空间
  let variableNamespaces = options.variableNamespaces
    ? options.variableNamespaces
    : ["window", "cookie", "ls", "ss"];

  if (!Array.isArray(variableNamespaces)) {
    variableNamespaces = [];
  }

  function next() {
    token = tokenChunk.length ? tokenChunk.shift() : lexer.next();

    if (!token) {
      throw new TypeError("next token is undefined");
    }
    tokens.push(token);
  }

  function back() {
    tokenChunk.unshift(tokens.pop());
    token = tokens[tokens.length - 1];
  }

  function matchPunctuator(operator) {
    return (
      token.type === TokenName.Punctuator &&
      (Array.isArray(operator)
        ? ~operator.indexOf(token.value)
        : token.value === operator)
    );
  }

  function fatal() {
    throw TypeError(
      `Unexpected token ${token.value} in ${token.start.line}:${token.start.column}`
    );
  }

  function assert(result) {
    if (!result) {
      fatal();
    }
    return result;
  }

  function expression() {
    return assignmentExpression();
  }

  function skipWhiteSpaceChar() {
    while (token.type === TokenName.Char && /^\s+$/m.test(token.value)) {
      next();
    }
  }

  function collectFilterArg() {
    const arg = [];
    while (
      !matchPunctuator(":") &&
      token.type !== TokenName.OpenFilter &&
      token.type !== TokenName.CloseScript
    ) {
      const item =
        literal() ||
        numberLiteral() ||
        stringLiteral() ||
        template() ||
        arrayLiteral() ||
        rawScript() ||
        objectLiteral();

      if (item) {
        arg.push(item);
      } else {
        assert(
          ~[TokenName.Identifier, TokenName.Punctuator, TokenName.Char].indexOf(
            token.type
          )
        );

        // 其他的都当字符处理
        if (arg.length && typeof arg[arg.length - 1] === "string") {
          arg[arg.length - 1] += token.raw || token.value;
        } else {
          arg.push(token.raw || token.value);
        }
        next();
      }
    }
    if (arg.length && typeof arg[arg.length - 1] === "string") {
      arg[arg.length - 1] = arg[arg.length - 1].replace(/\s+$/, "");
      if (!arg[arg.length - 1]) {
        arg.pop();
      }
    }
    return arg;
  }

  function complexExpression() {
    let ast = expression();

    const filters = [];
    while (token.type === TokenName.OpenFilter) {
      next();

      skipWhiteSpaceChar();
      const name = assert(identifier());
      const fnName = name.name;
      const args = [];

      skipWhiteSpaceChar();
      while (matchPunctuator(":")) {
        next();
        skipWhiteSpaceChar();

        let argContents = collectFilterArg();
        if (argContents.length === 1) {
          argContents = argContents[0];
        } else if (!argContents.length) {
          argContents = "";
        }

        args.push(
          Array.isArray(argContents)
            ? {
                type: "mixed",
                body: argContents,
              }
            : argContents
        );
      }
      filters.push({
        name: fnName,
        args,
      });
    }

    if (filters.length) {
      ast = {
        type: "filter",
        input: ast,
        filters,
        start: ast.start,
        end: filters[filters.length - 1].end,
      };
    }

    return ast;
  }

  function arrowFunction() {
    let ast = argList() || variable();
    let args = [];
    let start;

    if (ast && ast.type === "variable") {
      args = [ast];
      start = ast.start;
    } else if (ast && ast.type === "arg-list") {
      start = ast.start;
      args = ast.body;
    }

    if (Array.isArray(args) && matchPunctuator("=")) {
      next();
      if (matchPunctuator(">")) {
        next();
        const body = assert(expression());
        return {
          type: "anonymous_function",
          args: args,
          return: body,
          start: start,
          end: body.end,
        };
      } else {
        back();
      }
    }

    return ast;
  }

  function conditionalExpression() {
    const ast = logicalOrExpression();

    if (!ast) {
      return null;
    }

    if (matchPunctuator("?")) {
      next();
      let consequent = assignmentExpression();
      assert(consequent);
      assert(matchPunctuator(":"));

      next();
      let alternate = assignmentExpression();
      assert(alternate);

      return {
        type: "conditional",
        test: ast,
        consequent: consequent,
        alternate: alternate,
        start: ast.start,
        end: alternate.end,
      };
    }

    return ast;
  }

  function binaryExpressionParser(
    type,
    operator,
    parseFunction,
    rightParseFunction = parseFunction,
    leftKey = "left",
    rightKey = "right"
  ) {
    let ast = parseFunction();
    if (!ast) {
      return null;
    }

    if (matchPunctuator(operator)) {
      while (matchPunctuator(operator)) {
        next();
        const right = assert(rightParseFunction());

        ast = {
          type: type,
          op: operator,
          [leftKey]: ast,
          [rightKey]: right,
          start: ast.start,
          end: right.end,
        };
      }
    }

    return ast;
  }

  function logicalOrExpression() {
    return binaryExpressionParser("or", "||", logicalAndExpression);
  }

  function logicalAndExpression() {
    return binaryExpressionParser("and", "&&", bitwiseOrExpression);
  }

  function bitwiseOrExpression() {
    return binaryExpressionParser("binary", "|", bitwiseXOrExpression);
  }

  function bitwiseXOrExpression() {
    return binaryExpressionParser("binary", "^", bitwiseAndExpression);
  }

  function bitwiseAndExpression() {
    return binaryExpressionParser("binary", "&", equalityExpression);
  }

  function equalityExpression() {
    return binaryExpressionParser("eq", "==", () =>
      binaryExpressionParser("ne", "!=", () =>
        binaryExpressionParser("streq", "===", () =>
          binaryExpressionParser("strneq", "!==", relationalExpression)
        )
      )
    );
  }

  function relationalExpression() {
    return binaryExpressionParser("lt", "<", () =>
      binaryExpressionParser("gt", ">", () =>
        binaryExpressionParser("le", "<=", () =>
          binaryExpressionParser("ge", ">=", shiftExpression)
        )
      )
    );
  }

  function shiftExpression() {
    return binaryExpressionParser("shift", "<<", () =>
      binaryExpressionParser("shift", ">>", () =>
        binaryExpressionParser("shift", ">>>", additiveExpression)
      )
    );
  }

  function additiveExpression() {
    return binaryExpressionParser("add", "+", () =>
      binaryExpressionParser("minus", "-", multiplicativeExpression)
    );
  }

  function multiplicativeExpression() {
    return binaryExpressionParser("multiply", "*", () =>
      binaryExpressionParser("divide", "/", () =>
        binaryExpressionParser("remainder", "%", powerExpression)
      )
    );
  }

  function powerExpression() {
    return binaryExpressionParser("power", "**", unaryExpression);
  }

  function unaryExpression() {
    const unaryOperators = ["+", "-", "~", "!"];
    const stack = [];
    while (matchPunctuator(unaryOperators)) {
      stack.push(token);
      next();
    }
    let ast = postfixExpression();
    assert(!stack.length || ast);
    while (stack.length) {
      const op = stack.pop();

      ast = {
        type: "unary",
        op: op.value,
        value: ast,
        start: op.start,
        end: op.end,
      };
    }
    return ast;
  }

  function postfixExpression(parseFunction = leftHandSideExpression) {
    let ast = parseFunction();
    if (!ast) {
      return null;
    }

    while (matchPunctuator("[") || matchPunctuator(".")) {
      const isDot = matchPunctuator(".");
      next();
      const right = assert(
        isDot ? identifier() || numberLiteral() || rawScript() : expression()
      );

      if (!isDot) {
        assert(matchPunctuator("]"));
        next();
      }

      ast = {
        type: "getter",
        host: ast,
        key: right,
        start: ast.start,
        end: right.end,
      };
    }

    return ast;
  }

  function leftHandSideExpression() {
    return functionCall() || arrowFunction() || primaryExpression();
  }

  function varibleKey(allowVariable = false, inObject = false) {
    return (
      (allowVariable ? variable() : identifier()) ||
      stringLiteral() ||
      numberLiteral() ||
      (inObject ? objectTemplateKey() : template())
    );
  }

  function objectTemplateKey() {
    if (matchPunctuator("[")) {
      next();
      const key = assert(template());
      assert(matchPunctuator("]"));
      next();
      return key;
    }
    return null;
  }

  function stringLiteral() {
    if (token.type && token.type === TokenName.StringLiteral) {
      const cToken = token;
      next();
      return {
        type: "string",
        value: cToken.value,
        start: cToken.start,
        end: cToken.end,
      };
    }
    return null;
  }

  function numberLiteral() {
    if (token.type && token.type === TokenName.NumericLiteral) {
      const value = token.value;
      const cToken = token;
      next();
      return {
        type: "literal",
        value: value,
        start: cToken.start,
        end: cToken.end,
      };
    }

    return null;
  }

  function template() {
    if (matchPunctuator("`")) {
      const start = token;
      let end = start;
      next();
      let state = tempalteStates.START;
      const ast = {
        type: "template",
        body: [],
        start: start.start,
        end: start.end,
      };
      while (true) {
        if (state === tempalteStates.SCRIPTING) {
          const exp = assert(expression());
          ast.body.push(exp);
          assert(token.type === TokenName.TemplateRightBrace);
          next();
          state = tempalteStates.START;
        } else {
          if (matchPunctuator("`")) {
            end = token;
            next();
            break;
          } else if (token.type === TokenName.TemplateLeftBrace) {
            next();
            state = tempalteStates.SCRIPTING;
          } else if (token.type === TokenName.TemplateRaw) {
            ast.body.push({
              type: "template_raw",
              value: token.value,
              start: token.start,
              end: token.end,
            });
            next();
          } else {
            fatal();
          }
        }
      }

      ast.end = end.end;
      return ast;
    }
    return null;
  }

  function identifier() {
    if (token.type === TokenName.Identifier) {
      const cToken = token;
      next();
      return {
        type: "identifier",
        name: cToken.value,
        start: cToken.start,
        end: cToken.end,
      };
    }
    return null;
  }

  function primaryExpression() {
    return (
      variable() ||
      literal() ||
      numberLiteral() ||
      stringLiteral() ||
      template() ||
      arrayLiteral() ||
      objectLiteral() ||
      (() => {
        const ast = expressionList();

        if (ast && ast.body && ast.body.length === 1) {
          return ast.body[0];
        }

        return ast;
      })() ||
      rawScript()
    );
  }

  function literal() {
    if (
      token.type &&
      (token.type === TokenName.Literal ||
        token.type === TokenName.BooleanLiteral)
    ) {
      const value = token.value;
      const cToken = token;
      next();
      return {
        type: "literal",
        value: value,
        start: cToken.start,
        end: cToken.end,
      };
    }

    return null;
  }

  function functionCall() {
    if (token.type === TokenName.Identifier) {
      const id = token;
      next();
      if (matchPunctuator("(")) {
        const argList = expressionList();
        assert(argList);
        return {
          type: "func_call",
          identifier: id.value,
          args: argList.body,
          start: id.start,
          end: argList.end,
        };
      } else {
        back();
      }
    }
    return null;
  }

  function arrayLiteral() {
    if (matchPunctuator("[")) {
      const argList = expressionList("[", "]");
      assert(argList);
      return {
        type: "array",
        members: argList.body,
        start: argList.start,
        end: argList.end,
      };
    }
    return null;
  }

  function expressionList(startOP = "(", endOp = ")") {
    if (matchPunctuator(startOP)) {
      const start = token;
      let end;
      next();
      const args = [];
      let state = argListStates.START;

      while (true) {
        if (state === argListStates.COMMA || !matchPunctuator(endOp)) {
          const arg = assert(expression());
          args.push(arg);
          state = argListStates.START;

          if (matchPunctuator(",")) {
            next();
            state = argListStates.COMMA;
          }
        } else if (matchPunctuator(endOp)) {
          end = token;
          next();
          break;
        }
      }
      return {
        type: "expression-list",
        body: args,
        start: start.start,
        end: end.end,
      };
    }
    return null;
  }

  function argList(startOP = "(", endOp = ")") {
    let count = 0;
    let rollback = () => {
      while (count-- > 0) {
        back();
      }
      return null;
    };
    if (matchPunctuator(startOP)) {
      const start = token;
      let end = start;
      next();
      count++;
      const args = [];
      let state = argListStates.START;

      while (!matchPunctuator(endOp)) {
        if (state === argListStates.COMMA || state === argListStates.START) {
          const arg = variable(false);

          if (!arg) {
            return rollback();
          }

          count++;
          args.push(arg);
          state = argListStates.SET;
        } else if (state === argListStates.SET && matchPunctuator(",")) {
          next();
          count++;
          state = argListStates.COMMA;
        } else {
          return rollback();
        }
      }

      if (matchPunctuator(endOp)) {
        end = token;
        next();
        return {
          type: "arg-list",
          body: args,
          start: start.start,
          end: end.end,
        };
      } else {
        return rollback();
      }
    }
    return null;
  }

  function objectLiteral() {
    if (matchPunctuator("{")) {
      const start = token;
      let end = start;
      next();
      let ast = {
        type: "object",
        members: [],
        start: start.start,
        end: start.end,
      };
      let state = objectStates.START;
      let key, value;
      while (true) {
        if (state === objectStates.KEY) {
          assert(matchPunctuator(":"));
          next();
          state = objectStates.COLON;
        } else if (state === objectStates.COLON) {
          value = assert(expression());
          ast.members.push({
            key,
            value,
          });
          state = objectStates.VALUE;
        } else if (state === objectStates.VALUE) {
          if (matchPunctuator(",")) {
            next();
            state = objectStates.COMMA;
          } else if (matchPunctuator("}")) {
            end = token;
            next();
            break;
          } else {
            fatal();
          }
        } else {
          if (state != objectStates.COMMA && matchPunctuator("}")) {
            end = token;
            next();
            break;
          }

          key = assert(varibleKey(false, true));
          state = objectStates.KEY;
        }
      }

      ast.end = end.end;
      return ast;
    }
    return null;
  }

  function assignmentExpression() {
    return conditionalExpression();
  }

  function contents() {
    const node = {
      type: "document",
      body: [],
      start: token.start,
      end: token.end,
    };
    while (token.type !== TokenName.EOF) {
      const ast = raw() || rawScript() || oldVariable();

      if (!ast) {
        break;
      }
      node.body.push(ast);
    }
    if (node.body.length) {
      node.end = node.body[node.body.length - 1].end;
    }
    return node;
  }

  function raw() {
    if (token.type !== TokenName.RAW) {
      return null;
    }

    const cToken = token;
    next();
    return {
      type: "raw",
      value: cToken.value,
      start: cToken.start,
      end: cToken.end,
    };
  }

  function rawScript() {
    if (token.type !== TokenName.OpenScript) {
      return null;
    }

    const start = token;
    let end = start;
    next();
    const exp = assert(complexExpression());
    assert(token.type === TokenName.CloseScript);
    end = token;
    next();

    return {
      type: "script",
      body: exp,
      start: start.start,
      end: end.end,
    };
  }

  function variable(allowNameSpace = true) {
    if (token.type === TokenName.Identifier) {
      const cToken = token;
      next();

      if (
        allowNameSpace &&
        matchPunctuator(":") &&
        ~variableNamespaces.indexOf(cToken.value)
      ) {
        next();
        const body = assert(postfixExpression());
        return {
          type: "ns-variable",
          namespace: cToken.value,
          body,
          start: cToken.start,
          end: body.end,
        };
      }

      return {
        type: "variable",
        name: cToken.value,
        start: cToken.start,
        end: cToken.end,
      };
    } else if (matchPunctuator("&")) {
      const v = token;
      next();
      return {
        type: "variable",
        name: "&",
        start: v.start,
        end: v.end,
      };
    }
    return null;
  }

  function oldVariable() {
    if (token.type !== TokenName.Variable) {
      return null;
    }
    const prevToken = token;
    next();
    return {
      type: "script",
      body: prevToken.value.split(".").reduce((prev, key) => {
        return prev
          ? {
              type: "getter",
              host: prev,
              key,
              start: prevToken.start,
              end: prevToken.end,
            }
          : {
              type: "variable",
              name: key,
              start: prevToken.start,
              end: prevToken.end,
            };
      }, null),
      start: prevToken.start,
      end: prevToken.end,
    };
  }

  next();
  const ast = options.variableMode
    ? postfixExpression(variable)
    : options.evalMode
    ? expression()
    : contents();

  assert(token.type === TokenName.EOF);

  return ast;
}
