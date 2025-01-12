import { parse } from "acorn";
import MagicString from "magic-string";

export default function importToConst() {
  return {
    name: "import-to-const",
    async generateBundle(options, bundle) {
      const globalDep = options.globals || {};
      if (!Object.keys(globalDep).length) return;

      Object.values(bundle).forEach((data) => {
        const { code } = data;
        if (typeof code !== "string") return;
        const ast = parse(code, {
          ecmaVersion: "latest",
          sourceType: "module",
        });

        const magicString = new MagicString(code);

        // 遍历 AST，查找 ImportDeclaration 节点
        // @ts-ignore
        ast.body.forEach((node) => {
          if (node.type === "ImportDeclaration") {
            const { source, specifiers, start, end } = node;
            const { value } = source;
            let replaceValue = "";
            if (!globalDep[value]) return;
            // 找到需要外部化的依赖，将其替换为全局变量
            replaceValue = globalDep[value];
            // 将 import { computed } from 'vue'; 替换为 const { computed } = Vue;
            if (specifiers.length > 0) {
              let requireStatement = "";
              if (specifiers.length === 1 && !specifiers[0].imported) {
                // const o = Vue;
                requireStatement = `const ${specifiers[0].local.name} = ${replaceValue};`;
              } else {
                requireStatement = `const { ${specifiers
                  .map((specifier, local) => {
                    if (specifier.imported?.name === replaceValue) return "";

                    if (specifier.local?.name) {
                      // const { nextTick: o } = Vue
                      return (
                        specifier.imported?.name + ": " + specifier.local.name
                      );
                    }

                    return specifier.imported?.name;
                  })
                  .filter(Boolean)
                  .join(", ")} } = ${replaceValue};`;
              }

              magicString.overwrite(start, end, requireStatement);
            }
          }
        });

        data.code = magicString.toString();
      });
    },
  };
}
