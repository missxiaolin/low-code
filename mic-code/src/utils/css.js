import postcss from "postcss";

function mergeSameClassStyles() {
  return {
    postcssPlugin: "merge-same-class-styles",
    Once: function (root) {
      const mergedRules = {};

      root.walkRules((rule) => {
        const selector = rule.selector;
        const declarations = rule.nodes;

        if (mergedRules[selector]) {
          declarations.forEach((declaration) => {
            const property = declaration.prop;
            const value = declaration.value;
            const important = declaration.important;

            if (mergedRules[selector][property]) {
              // Check if the property value is important and update accordingly
              if (important || !mergedRules[selector][property].important) {
                mergedRules[selector][property] = {
                  value: value,
                  important: important,
                };
              } else {
                const existingValue = mergedRules[selector][property].value;
                const newValue = value;

                if (existingValue !== newValue) {
                  // Compare and update if new value is greater
                  if (parseInt(newValue, 10) > parseInt(existingValue, 10)) {
                    mergedRules[selector][property] = {
                      value: value,
                      important: important,
                    };
                  }
                }
              }
            } else {
              mergedRules[selector][property] = {
                value: value,
                important: important,
              };
            }
          });
        } else {
          mergedRules[selector] = {};
          declarations.forEach((declaration) => {
            const property = declaration.prop;
            const value = declaration.value;
            const important = declaration.important;
            mergedRules[selector][property] = {
              value: value,
              important: important,
            };
          });
        }
      });

      root.removeAll();

      Object.keys(mergedRules).forEach((selector) => {
        const rule = postcss.rule({ selector: selector });

        Object.keys(mergedRules[selector]).forEach((property) => {
          const { value, important } = mergedRules[selector][property];
          const declaration = postcss.decl({ prop: property, value: value });

          if (important) {
            declaration.important = true;
          }

          rule.append(declaration);
        });

        root.append(rule);
      });
    },
  };
}

export function mCss(cssStr1, cssStr2) {
  return new Promise((resolve, reject) => {
    // 合并两个CSS字符串
    const combinedCss = cssStr1 + cssStr2;

    // 将合并后的CSS字符串转换为PostCSS Root对象
    const root = postcss.parse(combinedCss);

    // 使用自定义插件和autoprefixer处理CSS
    postcss([
      mergeSameClassStyles(),
    ])
      .process(root, { from: undefined }) // `from`设置为undefined避免PostCSS在输出中添加source map注释
      .then((result) => {
        // 输出或使用处理后的CSS
        const finalCss = result.css;
        resolve(finalCss)
        // 或者写入文件等其他操作
      })
      .catch((error) => {
        console.error("Error processing CSS:", error);
      });
  });
}
