import { defineConfig } from "vite";
import r from "./r.json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import vue from "@vitejs/plugin-vue";
import importToConst from "./vite/importToConst";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

let libJson = r;
libJson.fileName = (format) => `${r.name}.${format}.js`;

const banner = `/*!
* xiaolin ${new Date()}
* (c) 2021 @Energy Monster All Right Reserved..
*/`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), importToConst(), cssInjectedByJsPlugin()],
  build: {
    outDir: "./dist",
    minify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["vue", "vue-router", "ant-design-vue"],
      output: {
        banner,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "ant-design-vue": "Antd",
        },
      },
    },
    lib: r,
    // {
    //   entry: "src/components/micButton.vue",
    //   name: "micButton",
    //   fileName: (format) => `micButton.${format}.js`,
    //   formats: ["es"],
    // },
    // {
    //   entry: "src/components/button.vue",
    //   name: "button",
    //   fileName: "button",
    //   formats: ["es"],
    // },
  },
});
