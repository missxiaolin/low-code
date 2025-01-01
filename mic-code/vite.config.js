import { defineConfig } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { VITE_PORT } from "./conifg/constant";
import federation from "@originjs/vite-plugin-federation"; // 微前端
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const isBuild = command === "build";
  return {
    server: {
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
    cacheDir: "node_modules/.cacheDir",
    plugins: [
      vue(),
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: (i) => `__tla_${i}`,
      }),
      federation({
        name: "layout",
        filename: "remoteEntry.js",
        remotes: {
          lowcode:
            'fetch("http://127.0.0.1:9002/adm/project/remote/entry?id=1").then((response) => response.json()).then((data) => {Promise.resolve(data.model.url)});',
        },
        shared: ["vue"],
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
