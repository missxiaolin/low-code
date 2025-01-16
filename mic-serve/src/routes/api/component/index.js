import _ from "lodash";
import Component from "../../../controller/com";
import RouterConfigBuilder from "../../../library/utils/router_config_builder";

const componentController = new Component();

// 组件列表
const getComList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/component/list",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return componentController.list(req, res);
  },
  true
);

// 保存
const comSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/component/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return componentController.save(req, res);
  },
  true
);

// 详情
const comDetail = RouterConfigBuilder.routerConfigBuilder(
  "/adm/component/detail",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return componentController.detail(req, res);
  },
  true
);

// 发布
const comGenerate = RouterConfigBuilder.routerConfigBuilder(
  "/adm/component/generate",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return componentController.generate(req, res);
  },
  true
);

const comAll = RouterConfigBuilder.routerConfigBuilder(
  "/adm/component/all",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return componentController.comAll(req, res);
  },
  true
);

export default {
  ...getComList,
  ...comSave,
  ...comDetail,
  ...comGenerate,
  ...comAll,
};
