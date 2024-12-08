import Base from "./base";
import moment from "moment";
import ProjectModel from "../model/project";
import dotenv from "dotenv";

const appConfig = dotenv.config().parsed;
const projectModel = new ProjectModel();

/**
 * 项目controller
 */
export default class Project extends Base {
  /**
   * 保存
   * @param {*} req
   * @param {*} res
   */
  async save(req, res) {
    let data = req.body || {},
      startAt = moment().format("YYYY-MM-DD HH:mm:ss"),
      result = {};

    if (appConfig.IS_CREATE_PROJECT_OPEN == 0) {
      return this.send(res, result, false, "暂时未开放创建项目");
    }

    if (data.id == 0 || !data.id) {
      result = await projectModel.save({
        ...data,
        create_time: startAt,
        update_time: startAt,
      });
    } else {
      let param = {
        ...data,
        update_time: startAt,
      };
      result = await projectModel.update(param, param.id);
    }
    return this.send(res, result);
  }

  /**
   * 获取项目列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async projectList(req, res) {
    let data = req.body || {},
      result = {};

    result.list = await projectModel.getPages(data);
    result.count = await projectModel.getPagesCount(data);
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
    result = await projectModel.getPageDetail(data);
    if (result.length == 0) {
      return this.send(res, result, false, "未找到该路由");
    }

    return this.send(res, result);
  }
}
