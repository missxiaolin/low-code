import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import router from "@/router";

let app = null;
function mount() {
  app = createApp(App);
  app.use(router);

  app.mount("#remote-app");
}

mount();
