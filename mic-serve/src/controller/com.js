import Base from "./base";
import moment from "moment";
import ComponentModel from "../model/component";

const componentModel = new ComponentModel();

/**
 * 首页
 */
export default class Component extends Base {
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
      if (!data.version) {
        data.version = "";
      }
      result = await componentModel.save({
        ...data,
        create_time: startAt,
        update_time: startAt,
      });
    } else {
      let param = {
        ...data,
        update_time: startAt,
      };
      result = await componentModel.update(param, param.id);
    }
    return this.send(res, result);
  }

  /**
   * 获取项目列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async list(req, res) {
    let data = req.body || {},
      result = {};

    result.list = await componentModel.getPages(data);
    result.count = await componentModel.getPagesCount(data);
    return this.send(res, result);
  }

  /**
   * 获取详情详情
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async detail(req, res) {
    let data = req.body || {},
      result = {};
    result = await componentModel.getDetail(data);

    return this.send(res, result);
  }
}
