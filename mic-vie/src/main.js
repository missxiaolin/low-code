import { createApp } from "vue";
import * as Vue from "vue";
window.Vue = Vue;

import "./style.css";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "./store";
import "@/utils/permission";
import "@/assets/css/index.scss";
import "normalize.css";
import { execEventFlow } from "@/utils/action";
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

/**
 * 画布使用
 * @param {*} app
 */
function loadApp(app) {
  /** 加载插件 */
  loadPlugins(app);
  app.config.globalProperties.$execEventFlow = execEventFlow;
}

let app = null;
function mount() {
  app = createApp(App);
  app.use(router);
  setupStore(app);

  /** 加载插件 */
  loadPlugins(app);
  window.createBaseAppAsync = createBaseAppAsync;
  window.loadApp = loadApp;
  app.config.globalProperties.$execEventFlow = execEventFlow;

  if (isSubMicro) {
    // 微前端环境下， 处理路由下发跳转
    handleMicroData(router, app);
  }
  app.mount("#vie-app");
}

mount();
