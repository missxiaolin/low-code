import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";


export function loadElementPlus(app) {
  /** Element Plus 组件完整引入 */
  app.use(ElementPlus, {
    locale: zhCn,
  });
}
