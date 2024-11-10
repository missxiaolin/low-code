import Antd from "ant-design-vue"
import 'ant-design-vue/dist/reset.css';

export function loadAnt(app) {
  /** Ant 组件完整引入 */
  app.use(Antd);
}
