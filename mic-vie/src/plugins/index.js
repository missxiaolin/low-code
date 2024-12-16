import { loadAnt } from "./ant/index.js";
// import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件
import xlDatePicker from "../components/ant-desine/date-picker.vue";
import xlFlex from "../components/ant-desine/a-flex.vue";

import "virtual:svg-icons-register";
export function loadPlugins(app) {
  // loadElementPlus(app);
  // loadElementPlusIcon(app);
  loadAnt(app);
  // 注册到全局
  app.component("xlDatePicker", xlDatePicker);
  app.component("xlFlex", xlFlex);
  // app.component("svg-icon", SvgIcon);
}
