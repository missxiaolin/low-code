import Antd from "ant-design-vue";
import * as AntdComponent from "ant-design-vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import * as AntIcon from "@ant-design/icons-vue";
import "ant-design-vue/dist/reset.css";

window.Antd = {};

export function loadAnt(app) {
  /** Ant 组件完整引入 */
  app.use(Antd);
  // 颜色组件
  app.use(Vue3ColorPicker);
  for (const [key, component] of Object.entries(AntIcon)) {
    app.component(key, component);
  }

  for (const [key, component] of Object.entries(AntdComponent)) {
    window.Antd[key] = component;
  }
}
