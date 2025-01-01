import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "./store";
import "./assets/css/index.scss";
import "normalize.css";
import { execEventFlow } from "./utils/action";
import { loadPlugins } from "./plugins";

let app = null;

app = createApp(App);
app.use(router);
setupStore(app);

/** 加载插件 */
loadPlugins(app);
app.config.globalProperties.$execEventFlow = execEventFlow;

app.mount("#vie-app");
