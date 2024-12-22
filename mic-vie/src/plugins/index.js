import { loadAnt } from "./ant/index.js";
// import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件
import xlDatePicker from "../components/xl/ant-desine/date-picker.vue";
import xlFlex from "../components/xl/ant-desine/a-flex.vue";
import xlImage from "../components/xl/ant-desine/a-image.vue";
import xlTooltip from "../components/xl/ant-desine/a-tooltip.vue";
import xlPopconfirm from "../components/xl/ant-desine/a-popconfirm.vue";
import xlTimePicker from "../components/xl/ant-desine/a-time-picker.vue";
import searchLabel from "../components/xl/search-label/index.vue";
import xlPop from "../components/xl/pop/index.vue";
import xlSearchTable from "../components/xl/l-search-table/index.vue";

import "virtual:svg-icons-register";
export function loadPlugins(app) {
  // loadElementPlus(app);
  // loadElementPlusIcon(app);
  loadAnt(app);
  // 注册到全局
  app.component("xlDatePicker", xlDatePicker);
  app.component("xlFlex", xlFlex);
  app.component("xlImage", xlImage);
  app.component("xlTooltip", xlTooltip);
  app.component("xlPopconfirm", xlPopconfirm);
  app.component("xlTimePicker", xlTimePicker);
  app.component("searchLabel", searchLabel);
  app.component("xlPop", xlPop);
  app.component("xlSearchTable", xlSearchTable);
  // app.component("svg-icon", SvgIcon);
}
