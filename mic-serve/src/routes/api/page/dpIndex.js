import _ from "lodash";
import DpPage from "../../../controller/dp_page";
import RouterConfigBuilder from "../../../library/utils/router_config_builder";

const pageController = new DpPage();

// 路由保存
const dpPageSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/dp/page/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.save(req, res);
  },
  true
);

// 路由详情
const dpPageDetail = RouterConfigBuilder.routerConfigBuilder(
  "/adm/dp/page/detail",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.detail(req, res);
  },
  true
);

// 路由列表
const dpPageList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/dp/page/list",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.pageList(req, res);
  },
  true
);

// 获取所有页面
const dpPageAll = RouterConfigBuilder.routerConfigBuilder(
  "/adm/dp/page/all",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return pageController.pageAll(req, res);
  },
  true
);

// 页面生成
// const generatePage = RouterConfigBuilder.routerConfigBuilder(
//   "/adm/page/generate",
//   RouterConfigBuilder.METHOD_TYPE_POST,
//   (req, res) => {
//     return pageController.generatePage(req, res);
//   },
//   true
// );

export default {
  ...dpPageSave,
  ...dpPageList,
  ...dpPageDetail,
  ...dpPageAll,
  // ...generatePage
};
