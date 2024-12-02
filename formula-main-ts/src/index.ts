import {Evaluator, EvaluatorOptions} from './evalutor';
import {ASTNode, parse, ParserOptions} from './parser';
import {lexer} from './lexer';
import {registerFilter, filters, getFilters} from './filter';
export {parse, lexer, Evaluator, filters, getFilters, registerFilter};
export * from './util';

export function evaluate(
  astOrString: string | ASTNode,
  data: any,
  options?: ParserOptions & EvaluatorOptions
) {
  let ast: ASTNode = astOrString as ASTNode;
  if (typeof astOrString === 'string') {
    ast = parse(astOrString, options);
  }

  return new Evaluator(data, options).evalute(ast);
}

Evaluator.setDefaultFilters(getFilters());
