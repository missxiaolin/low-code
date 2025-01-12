import _ from "lodash";
import Index from "../../../controller/index";
import RouterConfigBuilder from "../../../library/utils/router_config_builder";

const indexController = new Index();

// 组件列表
const getComList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/get/colum",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return indexController.getColum(req, res);
  },
  true
);

export default {
  ...getComList,
};
