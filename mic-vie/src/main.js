import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import router from "@/router";
import "@/utils/permission";
import "@/assets/css/index.scss";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { isSubMicro, handleMicroData } from "@/utils/subMicro";
import { loadPlugins } from "@/plugins";

/**
 * 创建实例基础方法
 * @param {*} renderComponent
 * @param {*} loadFinished
 * @returns
 */
function loadTemplate(renderComponent, loadFinished) {
  const app = createApp(renderComponent);
  /** 加载插件 */
  loadPlugins(app);
  loadFinished(app);
  return app;
}

/**
 * 异步创建实例
 * @param {*} renderComponent
 * @returns
 */
function createBaseAppAsync(renderComponent = {}) {
  return new Promise((resolve, reject) => {
    loadTemplate(renderComponent, (app) => {
      resolve(app);
    });
  });
}

let app = null;
function mount() {
  app = createApp(App);
  app.use(router);
  
  /** 加载插件 */
  loadPlugins(app);
  window.createBaseAppAsync = createBaseAppAsync;
  if (isSubMicro) {
    // 微前端环境下， 处理路由下发跳转
    handleMicroData(router, app);
  }
  app.mount("#vie-app");
}

mount();
