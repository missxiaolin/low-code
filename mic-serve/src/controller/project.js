import Base from "./base";
import moment from "moment";
import ProjectModel from "../model/project";
import PageRouteModel from "../model/page_route";
import VersionsModel from "../model/versions";
const { exec } = require("child_process");
import dotenv from "dotenv";
import Logger from "../library/logger";
import path, { resolve } from "path";

const appConfig = dotenv.config().parsed;
const projectModel = new ProjectModel();
const pageRouteModel = new PageRouteModel();
const versionsModel = new VersionsModel();

const logger = Logger.getLogger4Command("project");

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
    const targetDirectory = resolve(__dirname, "../../../mic-serve");

    const versionDetail = await versionsModel.getDetail({
      projectId: data.id,
      version: data.version,
    });
    if (versionDetail.length > 0) {
      return this.send(res, result, false, "该版本已存在");
    }
    await projectModel.update(
      {
        status: 3,
      },
      data.id
    );
    const dataTime = moment().format("YYYY-MM-DD HH:mm:ss");
    await versionsModel.save({
      project_id: data.id,
      version: data.version,
      create_time: dataTime,
      update_time: dataTime,
    });

    // 切换到目标文件夹
    process.chdir(targetDirectory);
    exec(
      `npm run command Generate:Project ${result.id} ${data.version}`,
      async (error, stdout, stderr) => {
        if (error) {
          logger.error(error);
        }
        await projectModel.update(
          {
            status: 2,
          },
          data.id
        );
      }
    );

    return this.send(res, result);
  }

  /**
   * 修改版本
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async updateVersion(req, res) {
    let data = req.body || {},
      result = {};
    if (!data.version) {
      return this.send(res, result, false, "版本号不能为空");
    }
    await projectModel.update(
      {
        version: data.version,
      },
      data.id
    );

    return this.send(res, result);
  }

  async getAllVersions(req, res) {
    let data = req.body || {},
      result = {};
    result = await versionsModel.getVersionsAll(data);

    return this.send(res, result);
  }

  /**
   * 获取模块联邦详情
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async getRemoteEntry(req, res) {
    let data = req.query || {},
      result = {};

    if (!data.id) {
      return this.send(res, [], "id不能为空");
    }
    result = await projectModel.getPageDetail(data);

    result.url = `http://www.missxiaolin.com/lowcode/${result.code}/${result.version}/assets/remoteEntry.js`;

    return this.send(res, result);
  }
}
