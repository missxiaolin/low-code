// 生成一个方法
function generateFunction(functionName) {
  return `${functionName}: function(){}`;
}

// 生成一个class
function generateClass(className) {
  return `.${className}{}`;
}

// 生成一个键值对
function generateData(dataName) {
  return `${dataName}:''`;
}

// 合成方法集
function convertMethods(set, options) {
  let methodsStr = [...set].map(generateFunction);
  // 回调外部，使外部作用最后结果
  if (options.convertMethodResult) {
    methodsStr = options.convertMethodResult(methodsStr);
  }
  return methodsStr.join(",\n");
}

// 合成style集
function convertStyles(set, options) {
  let result = "";
  // 因为set的结果不好解析，所以优先由业务处解析，再交给默认处理方式。不过业务处需要将已处理的值从set中删除，否则会有两条样式
  if (options.preConvertStyleResult) {
    result = options.preConvertStyleResult(set);
  }

  const classStr = [...set].map(generateClass);
  return classStr.join("\n") + "\n" + result;
}

// 合成data集
function convertDatas(set, options) {
  let dataStr = [...set].map(generateData);
  // 回调外部，使外部作用最后结果
  if (options.convertDataResult) {
    dataStr = options.convertDataResult(dataStr);
  }
  return dataStr.join(",\n");
}

// 从模板中替换方法
export function replaceMethods(template, set, options) {
  return template.replace("// $eventMethods", convertMethods(set, options));
}

// 从模板中替换样式
export function replaceStyles(template, set, options) {
  return template.replace(
    "/** $stylesTemplate */",
    convertStyles(set, options)
  );
}

// 从模板中替换样式
export function replaceDatas(template, set, options) {
  const defaultCode = convertDatas(set, options);
  return template.replace("// $datas", defaultCode);
}
