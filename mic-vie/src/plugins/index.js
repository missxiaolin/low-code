import { loadAnt } from "./ant/index.js";
// import SvgIcon from "@/components/svgIcon/index.vue"; // svg组件
import micDatePicker from "../components/xl/ant-desine/date-picker.vue";
import micFlex from "../components/xl/ant-desine/a-flex.vue";
import micImage from "../components/xl/ant-desine/a-image.vue";
import micTooltip from "../components/xl/ant-desine/a-tooltip.vue";
import micPopconfirm from "../components/xl/ant-desine/a-popconfirm.vue";
import micTimePicker from "../components/xl/ant-desine/a-time-picker.vue";
import micSearchLabel from "../components/xl/search-label/index.vue";
import micPop from "../components/xl/pop/index.vue";
import micSearchTable from "../components/xl/l-search-table/index.vue";
import micDrawer from "../components/xl/ant-desine/a-drawer.vue";
import micModal from "../components/xl/ant-desine/a-modal.vue";
import flowNode from "../components/flow-node/flowNode.vue";
import micAsyncComponent from "../components/xl/asyncComponent/index.vue";
import micBar from "../components/echarts/bar.vue";
import micWordCloud from "../components/echarts/wordCloud.vue";
import micLine from "../components/echarts/line.vue";
import micShape from "../components/vccEditor/shape/index.vue";
import micField from "../components/xl/field.vue";
import micCollapsePanel from "../components/xl/collapse.vue";
import micNumber from "../components/xl/number.vue";
import micSelect from "../components/xl/select.vue";
import micColor from "../components/xl/color.vue";
import micPanel from "../components/xl/panel.vue";
import micInput from "../components/xl/input.vue";

// 引入echarts
import Echarts from "vue-echarts";
import * as echarts from "echarts";

const components = [
  micDatePicker,
  micFlex,
  micImage,
  micTooltip,
  micPopconfirm,
  micTimePicker,
  micSearchLabel,
  micPop,
  micSearchTable,
  micDrawer,
  micModal,
  micAsyncComponent,
  micBar,
  micWordCloud,
  micLine,
  micShape,
  micField,
  micCollapsePanel,
  micNumber,
  micSelect,
  micColor,
  micPanel,
  micInput,
];

import "virtual:svg-icons-register";
export function loadPlugins(app) {
  loadAnt(app);
  // 注册到全局
  components.forEach((component) => {
    app.component(component.name, component);
  });
  app.component("e-charts", Echarts);

  app.config.globalProperties.$echarts = echarts; // 全局挂载echarts
}
