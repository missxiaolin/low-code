import Antd from "ant-design-vue";
import * as AntdComponent from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
window.Antd = {};
export function loadAnt(app) {
  /** Ant 组件完整引入 */
  app.use(Antd);
  for (const [key, component] of Object.entries(AntdComponent)) {
    window.Antd[key] = component;
  }
}
