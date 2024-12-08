import _ from "lodash";
import Page from "../../../controller/page";
import RouterConfigBuilder from "../../../library/utils/router_config_builder";

const pageController = new Page();

// 路由保存
const pageSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/page/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.save(req, res);
  },
  true
);

// 路由详情
const pageDetail = RouterConfigBuilder.routerConfigBuilder(
  "/adm/page/detail",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.detail(req, res);
  },
  true
);

// 路由列表
const pageList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/page/list",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.pageList(req, res);
  },
  true
);

// 页面生成
const generatePage = RouterConfigBuilder.routerConfigBuilder(
  "/adm/page/generate",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.generatePage(req, res);
  },
  true
);

export default {
  ...pageSave,
  ...pageList,
  ...pageDetail,
  ...generatePage
};
