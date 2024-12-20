import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import router from "@/router";
import "@/assets/css/index.scss";
import "normalize.css";
import { loadPlugins } from "@/plugins";

/**
 * 画布使用
 * @param {*} app
 */
function loadApp(app) {
  /** 加载插件 */
  loadPlugins(app);
}

let app = null;
function mount() {
  app = createApp(App);
  app.use(router);

  /** 加载插件 */
  loadPlugins(app);
  window.loadApp = loadApp;
  app.mount("#remote-app");
}

mount();
