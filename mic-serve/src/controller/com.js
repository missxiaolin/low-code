import Base from "./base";
import moment from "moment";
import ComponentModel from "../model/component";
import path, { resolve } from "path";
const { exec } = require("child_process");
import Logger from "../library/logger";

const componentModel = new ComponentModel();
const logger = Logger.getLogger4Command("component");

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

  /**
   * 发布
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async generate(req, res) {
    let data = req.body || {},
      result = {};

    if (!data.projectId) {
      return this.send(res, result, false, "项目ID不能为空");
    }
    if (!data.id) {
      return this.send(res, result, false, "组件ID不能为空");
    }
    result = await componentModel.getDetail(data);
    if (result.length == 0) {
      return this.send(res, result, false, "未找到该项目");
    }
    const targetDirectory = resolve(__dirname, "../../../mic-serve");

    process.chdir(targetDirectory); // 切换到目标目录
    const detail = result[0];
    exec(
      `npm run command Generate:Component ${data.projectId} ${data.id}`,
      async (error, stdout, stderr) => {
        if (error) {
          logger.error(error);
        }
        console.log(stdout);
      }
    );
    return this.send(res, result);
  }
}
