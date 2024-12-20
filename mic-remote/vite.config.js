import { defineConfig } from "vite";
import path, { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { VITE_PORT } from "./conifg/constant";
import { configManualChunk } from "./conifg/vite/optimizer";
import commonjs from "rollup-plugin-commonjs";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import svgLoader from "vite-svg-loader";
import externalGlobals from "rollup-plugin-external-globals";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";
import { viteMockServe } from "vite-plugin-mock";

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
    // 生产环境需要在域名基础上加上vie
    base: "/",
    server: {
      fs: {
        // 可以为项目根目录的上一级提供服务
        allow: [".."],
      },
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
        {
          find: "vue",
          replacement: "vue/dist/vue.esm-bundler.js",
        },
      ],
      extensions: [".vue", ".js"],
    },
    plugins: [
      vue(),
      monacoEditorPlugin.default({
        languageWorkers: [
          "editorWorkerService",
          "typescript",
          "json",
          "html",
          "css",
        ],
      }),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[name]",
      }),
      viteMockServe({
        mockPath: "mock", // mock文件夹路径
        enable: true, // 只有开发环境才开启mock
        // mockPath?: string; // mock文件夹路径
        // ignore?: RegExp | ((fileName: string) => boolean); // 自动读取模拟.ts 文件时，请忽略指定格式的文件
        // watchFiles?: boolean; // 设置是否监视mockPath对应的文件夹内文件中的更改
        // enable?: boolean; // 是否启用 mock 功能
        // ignoreFiles?: string[];
        // configPath?: string; // 设置模拟读取的数据条目
        // logger?:boolean; // 是否在控制台显示请求日志
      }),
      federation({
        name: "lowCode",
        filename: "remoteEntry.js",
        exposes: {
          "./remoteButton": "./src/remote-components/button.vue",
        },
        shared: {
          vue: {
            generate: false,
          },
        },
      }),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
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
    // build: {
    //   target: "es2015",
    //   rollupOptions: {
    //     plugins: [commonjs(), externalGlobals({})],
    //     output: {
    //       chunkFileNames: "static/js/[name]-[hash].js",
    //       entryFileNames: "static/js/[name]-[hash].js",
    //       assetFileNames: "static/[ext]/[name]-[hash].[ext]",
    //       manualChunks: configManualChunk,
    //     },
    //   },
    //   // Turning off brotliSize display can slightly reduce packaging time
    //   // brotliSize: false,
    //   chunkSizeWarningLimit: 2000,
    //   minify: "terser",
    //   terserOptions: {
    //     compress: {
    //       //生产环境时移除console
    //       drop_console: true,
    //       drop_debugger: true,
    //     },
    //   },
    // },
  };
  // if (command === 'serve') {
  //   return {
  //     // dev specific config
  //   }
  // } else {
  //   // command === 'build'
  //   return {
  //     // build specific config
  //   }
  // }
});
