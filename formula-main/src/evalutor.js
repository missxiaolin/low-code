export class Evaluator {
  constructor(
    context,
    options = {
      defaultFilter: "html",
    }
  ) {
    this.contextStack = [];
    this.defaultFilters = {};
    this.filters = {};
    this.functions = {};
    this.context = context;
    this.contextStack.push((varname) =>
      varname === "&" ? context : context[varname]
    );

    this.filters = Object.assign(
      {},
      Evaluator.defaultFilters,
      this.filters,
      options.filters ? options.filters : {}
    );

    this.functions = Object.assign(
      {},
      this.functions,
      options.functions ? options.functions : {}
    );
  }

  /**
   * 执行
   * @param {*} ast
   * @returns
   */
  evalute(ast) {
    if (ast && ast.type) {
      const name = ast.type.replace(/(?:_|\-)(\w)/g, (_, l) => l.toUpperCase());
      const fn = this.functions[name] || this[name];
      if (!fn) {
        throw new Error(`${ast.type} unkown.`);
      }
      return fn.call(this, ast);
    } else {
      return ast;
    }
  }

  funcCall(ast) {
    const fnName = `fn${ast.identifier}`;
    const fn =
      this.functions[fnName] || this[fnName] || this.filters[ast.identifier];
    if (!fn) {
      throw new Error(`${ast.identifier}函数没有定义`);
    }
    let args = ast.args;
    // 逻辑函数特殊处理，因为有时候有些运算是可以跳过的。
    if (~["IF", "AND", "OR", "XOR", "IFS"].indexOf(ast.identifier)) {
      args = args.map((a) => () => this.evalute(a));
    } else {
      args = args.map((a) => this.evalute(a));
    }

    return fn.apply(this, args);
  }

  /**
   * 示例：IF(A, B, C)
   *
   * 如果满足条件A，则返回B，否则返回C，支持多层嵌套IF函数。
   *
   * 也可以用表达式如：A ? B : C
   *
   * @example IF(condition, consequent, alternate)
   * @param {expression} condition - 条件表达式.
   * @param {any} consequent 条件判断通过的返回结果
   * @param {any} alternate 条件判断不通过的返回结果
   * @namespace 逻辑函数
   *
   * @returns {any} 根据条件返回不同的结果
   */
  fnIF(condition, trueValue, falseValue) {
    return condition() ? trueValue() : falseValue();
  }

  /**
   * 返回值
   * @param {*} ast
   * @returns
   */
  literal(ast) {
    return ast.value;
  }
}
