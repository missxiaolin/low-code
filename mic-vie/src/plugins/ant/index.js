import Antd from "ant-design-vue";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ApartmentOutlined,
  DeleteOutlined,
  FormOutlined,
  SaveOutlined,
  VerticalAlignBottomOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
import "ant-design-vue/dist/reset.css";

export function loadAnt(app) {
  /** Ant 组件完整引入 */
  app.use(Antd);
  app.component("EyeOutlined", EyeOutlined);
  app.component("EyeInvisibleOutlined", EyeInvisibleOutlined);
  app.component("ApartmentOutlined", ApartmentOutlined);
  app.component("DeleteOutlined", DeleteOutlined);
  app.component("FormOutlined", FormOutlined);
  app.component("SaveOutlined", SaveOutlined);
  app.component("VerticalAlignBottomOutlined", VerticalAlignBottomOutlined);
  app.component("CopyOutlined", CopyOutlined);
}
