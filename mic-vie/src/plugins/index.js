import { loadElementPlus } from "./element-plus";
import { loadElementPlusIcon } from "./element-plus-icon";
import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件
import SearchLabel from "@/components/searchLabel/index.vue";
import LTable from "@/components/lTable/index.vue";
import Pop from "@/components/pop/index.vue";
import LForm from '@/components/lForm/index.vue';
import SForm from '@/components/lForm/sForm.vue';
import LEcharts from '@/components/echarts/index.vue';
import LDatePicker from '../components/datePicker/index.vue';

import "virtual:svg-icons-register";
export function loadPlugins(app) {
  loadElementPlus(app);
  loadElementPlusIcon(app);
  // 注册到全局
  app.component("svg-icon", SvgIcon);
  app.component("search-label", SearchLabel);
  app.component("l-table", LTable);
  app.component("l-pop", Pop);
  app.component("l-form", LForm);
  app.component("l-s-form", SForm);
  app.component("l-echarts", LEcharts);
  app.component('l-date-picker', LDatePicker);
}
