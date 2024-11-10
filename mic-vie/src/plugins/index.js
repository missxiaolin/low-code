import { loadElementPlus } from "./element-plus";
import { loadElementPlusIcon } from "./element-plus-icon";
import { loadAnt } from "./ant/index.js"
import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件

import "virtual:svg-icons-register";
export function loadPlugins(app) {
  loadElementPlus(app);
  loadElementPlusIcon(app);
  loadAnt(app)
  // 注册到全局
  app.component("svg-icon", SvgIcon);
}
