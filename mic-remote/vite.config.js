import { defineConfig } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { VITE_PORT } from "./conifg/constant";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";
import rJson from "./r.json";

// 强制预构建插件包
//  optimizeDeps: {
//   include: [
//     `monaco-editor/esm/vs/language/json/json.worker`,
//     `monaco-editor/esm/vs/language/css/css.worker`,
//     `monaco-editor/esm/vs/language/html/html.worker`,
//     `monaco-editor/esm/vs/language/typescript/ts.worker`,
//     `monaco-editor/esm/vs/editor/editor.worker`
//   ],
// },

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const isBuild = command === "build";
  return {
    server: {
      // hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: {
        origin: "*",
        "Access-Control-Allow-Origin": "*",
      }, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: "0.0.0.0", // IP配置，支持从IP启动
      // https: true,
      // proxy,
    },
    resolve: {
      // 设置别名
      alias: [
        { find: "~", replacement: resolve(__dirname, "./") },
        { find: "@", replacement: resolve(__dirname, "./src") },
      ],
      extensions: [".vue", ".js"],
    },
    plugins: [
      vue(),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
      federation({
        name: "lowCode",
        filename: "remoteEntry.js",
        exposes: rJson,
        shared: {
          vue: {
            generate: false,
          },
        },
      }),
    ],
    build: {
      target: "esnext",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          format: "es",
          minifyInternalExports: false,
        },
      },
    },
  };
});
