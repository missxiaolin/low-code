import Base from "./base";
import moment from "moment";
import ProjectModel from "../model/project";
import PageRouteModel from "../model/page_route";
const { exec } = require("child_process");
import dotenv from "dotenv";

const appConfig = dotenv.config().parsed;
const projectModel = new ProjectModel();
const pageRouteModel = new PageRouteModel();

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
      if (!data.version) {
        data.version = "";
      }
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
    // if (result.length == 0) {
    //   return this.send(res, result, false, "未找到该项目");
    // }

    return this.send(res, result);
  }

  /**
   * 获取详情详情
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getAll(req, res) {
    let data = req.body || {},
      result = {};
    result = await projectModel.getAll(data);

    return this.send(res, result);
  }

  /**
   * 生成项目
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async generate(req, res) {
    let data = req.body || {},
      result = {};
    result = await projectModel.getPageDetail(data);
    if (result.length == 0) {
      return this.send(res, result, false, "未找到该项目");
    }
    if (result.status == 1) {
      return this.send(res, result, false, "该项目已禁用，无法发布");
    }
    if (result.status == 3) {
      return this.send(res, result, false, "该项目正在发布");
    }
    await projectModel.update(
      {
        status: 3,
      },
      data.id
    );
    exec(
      `npm run command Generate:Project ${result.id}`,
      async (error, stdout, stderr) => {
        console.log(stdout, stderr);
        await projectModel.update(
          {
            status: 2,
          },
          data.id
        );
      }
    );
    // let pages = await pageRouteModel.getAll({
    //   projectId: data.id,
    //   status: [2],
    // });

    // console.log(pages);

    return this.send(res, result);
  }

  /**
   * 获取详情详情
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getRemoteEntry(req, res) {
    let data = req.body || {},
      result = {};
    result = await projectModel.getPageDetail(data);
    // if (result.length == 0) {
    //   return this.send(res, result, false, "未找到该项目");
    // }

    result.url = `http://www.missxiaolin.com/lowcode/${result.code}/1.0.0/remoteEntry.js`;

    return this.send(res, result);
  }
}
