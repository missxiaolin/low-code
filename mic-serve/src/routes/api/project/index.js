import _ from "lodash";
import Project from "../../../controller/project";
import Menu from "../../../controller/menu";
import RouterConfigBuilder from "../../../library/utils/router_config_builder";

const projectController = new Project();
const menuController = new Menu();

// 项目保存/修改
const projectSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.save(req, res);
  },
  true
);

// 项目列表
const projectList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/list",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.projectList(req, res);
  },
  true
);

// 项目详情
const projectDetail = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/detail",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.detail(req, res);
  },
  true
);

// 所有项目
const projectAll = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/all",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.getAll(req, res);
  },
  true
);

// 项目生成
const generatePage = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/generate",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.generate(req, res);
  },
  true
);

// 项目生成地址
const getRemoteEntry = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/remote/entry",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.getRemoteEntry(req, res);
  },
  false
);

// 菜单list
const menuList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/menu/list",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return menuController.getRemoteEntry(req, res);
  },
  false
);

// 菜单保存
const menuSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/menu/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return menuController.getRemoteEntry(req, res);
  },
  false
);

// 项目菜单获取
const getProjectMenuList = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/menu/all",
  RouterConfigBuilder.METHOD_TYPE_GET,
  (req, res) => {
    return projectController.getRemoteEntry(req, res);
  },
  false
);

export default {
  ...projectSave,
  ...projectList,
  ...projectDetail,
  ...generatePage,
  ...getRemoteEntry,
  ...projectAll,
  ...menuList,
  ...menuSave,
  ...getProjectMenuList,
};
