import Base from "./base";
import moment from "moment";
import DpPageRoute from "../model/dp_page_route";
const { exec } = require("child_process");

const dpPageRouteModel = new DpPageRoute();

/**
 * 项目controller
 */
export default class DpPage extends Base {
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
      result = await dpPageRouteModel.save({
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
      result = await dpPageRouteModel.update(param, param.id);
    }
    return this.send(res, result);
  }

  /**
   * 获取详情
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async detail(req, res) {
    let data = req.body || {},
      result = {};
    result = await dpPageRouteModel.getPageDetail(data);
    if (result.length == 0) {
      return this.send(res, result, false, "未找到该大屏配置");
    }

    return this.send(res, result);
  }

  /**
   * 获取路由列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async pageList(req, res) {
    let data = req.body || {},
      result = {};

    result.list = await dpPageRouteModel.getPages(data);
    result.count = await dpPageRouteModel.getPagesCount(data);
    return this.send(res, result);
  }

  /**
   * 获取所有页面
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async pageAll(req, res) {
    let data = req.body || {},
      result = [];
    result = await dpPageRouteModel.getAll(data);
    return this.send(res, result);
  }
}
