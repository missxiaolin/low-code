import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import router from "@/router";
import { loadPlugins } from "./plugins";

let app = null;
function mount() {
  app = createApp(App);
  app.use(router);

  /** 加载插件 */
  loadPlugins(app);
  app.mount("#remote-app");
}

mount();
