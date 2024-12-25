import Base from "./base";
import moment from "moment";
import MenuModel from "../model/menu";

const menuModel = new MenuModel();

/**
 * 项目controller
 */
export default class Menu extends Base {
  /**
   * 保存
   * @param {*} req
   * @param {*} res
   */
  async save(req, res) {
    let data = req.body || {},
      startAt = moment().format("YYYY-MM-DD HH:mm:ss"),
      result = {};

    if (data.id == 0 || !data.id) {
      result = await menuModel.save({
        ...data,
        create_time: startAt,
        update_time: startAt,
      });
    } else {
      let param = {
        ...data,
        update_time: startAt,
      };
      delete param.project_id;
      result = await menuModel.update(param, param.id);
    }
    return this.send(res, result);
  }

  /**
   * 获取项目列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async menuList(req, res) {
    let data = req.body || {},
      result = {};
    result.list = await menuModel.getPages(data);
    result.count = await menuModel.getPagesCount(data);
    return this.send(res, result);
  }

  /**
   * 获取所有
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async menuAll(req, res) {
    let data = req.body || {},
      result = {};

    result = await menuModel.getMenuAll(data);
    return this.send(res, result);
  }

  /**
   * 路由 list
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async menuRouteAll(req, res) {
    let data = req.body || {},
      result = {};

    result = await menuModel.getMenuRouteAll(data);
    for (let i = 0; i < result.length; i++) {
      if (result[i].type == 1) {
        result[i].children = await menuModel.getMenuRouteAll({
          projectId: data.projectId,
          menuId: result[i].id,
        });
      }
    }
    return this.send(res, result);
  }
}
