<template>
  <div id="my-component"></div>
</template>

<script>
import { nextTick, onMounted, ref, getCurrentInstance } from "vue";
import * as Vue from "vue";
import { loadPlugins } from "../../plugins/index";
// 假设有一个 Vue 文件的内容
const config = {
  files: {
    "/index.js": `
      export default {
        a: 1
      }
    `,
    "/main.vue": `
        <template>
            <div class="content">
                <a-button type="primary">Primary Button</a-button>
                <EyeOutlined />
                {{ message }}
            </div>
        </template>

        <script>
            import { ref, getCurrentInstance, watch } from "vue";
            import eventNode from "./index.js";

            export default {
                setup() {
                    const message = ref("Hello, Vue 3!");
                    window.babelTransform(eventNode).then((res) => {
                        console.log("res", res);
                    })

                    return {
                        message,
                    }
                },
            };
        <\/script>

        <style>
            .content {
                color: red;
            }
        </style>

        `,
  },
};

import * as Babel from "@babel/standalone";
export default {
  setup() {
    window.babelTransform = async (str) => {
      let module = {};
      const blob = new Blob([str], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      try {
        module = await import(url);
        console.log(module.default);
      } catch (error) {}

      return module.default;
    };
    const init = async () => {
      // console.log(Babel);
      let input = 'export default { name: "my-component" }';
      // let output = Babel.transform(input, { presets: ["env"] }).code;
      // console.log(output);
      const blob = new Blob([input], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      try {
        const module = await import(url);
        console.log("模块：", module.default);
      } catch (error) {
        console.error("模块加载失败:", error);
      }
      // URL.revokeObjectURL(url);
      //       const compileCode = `
      //       import * as Babel from "@babel/standalone";
      //       export default { name: "my-component", a: 1 };
      // `;
      //       let output = Babel.transform(compileCode, { presets: ["env"] }).code;
      //       const compileCode = `
      //       export default { name: "my-component", a: 1 };
      // `;
      //       const blob = new Blob([compileCode], { type: "application/javascript" });
      //       const url = URL.createObjectURL(blob);
      //       try {
      //         const module = await import(url);
      //         console.log("模块：", module.default);
      //       } catch (error) {
      //         console.error("模块加载失败:", error);
      //       }
      //       URL.revokeObjectURL(url);
    };
    // init();
    onMounted(() => {
      nextTick(() => {
        const options = {
          moduleCache: {
            vue: Vue,
          },
          getFile: (url) => {
            return config.files[url];
          },
          addStyle(textContent) {
            const style = Object.assign(document.createElement("style"), {
              textContent,
            });
            const ref = document.head.getElementsByTagName("style")[0] || null;
            document.head.insertBefore(style, ref);
          },
          handleModule: async function (type, getContentData, path, options) {
            switch (type) {
              case ".json":
                return getContentData(false);
              case ".js":
                return getContentData(false);
            }
          },
          log(type, ...args) {
            console[type](...args);
          },
        };
        const app = Vue.createApp(
          Vue.defineAsyncComponent(() =>
            window["vue3-sfc-loader"].loadModule("/main.vue", options)
          )
        );
        loadPlugins(app);
        app.mount(document.getElementById("my-component"));
      });
    });
  },
};
</script>
