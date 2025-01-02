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

// 修改版本
const updateVersion = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/version/update",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.updateVersion(req, res);
  }
);

// 项目生成地址
const getRemoteEntry = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/remote/entry",
  RouterConfigBuilder.METHOD_TYPE_GET,
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
    return menuController.menuList(req, res);
  },
  false
);

// 菜单保存
const menuSave = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/menu/save",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return menuController.save(req, res);
  },
  false
);

// 项目菜单获取
const getProjectMenuAll = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/menu/all",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return menuController.menuAll(req, res);
  },
  false
);

// 项目菜单获取
const getProjectMenuRouteAll = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/menu/route/all",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return menuController.menuRouteAll(req, res);
  },
  false
);

const getAllVersions = RouterConfigBuilder.routerConfigBuilder(
  "/adm/project/version/all",
  RouterConfigBuilder.METHOD_TYPE_POST,
  (req, res) => {
    return projectController.getAllVersions(req, res);
  }
);

export default {
  ...projectSave,
  ...projectList,
  ...projectDetail,
  ...updateVersion,
  ...generatePage,
  ...getRemoteEntry,
  ...projectAll,
  ...menuList,
  ...menuSave,
  ...getProjectMenuAll,
  ...getProjectMenuRouteAll,
  ...getAllVersions,
};
