import Base from "./base";
import moment from "moment";
import PageRouteModel from "../model/page_route";
const { exec } = require("child_process");

const pageRouteModel = new PageRouteModel();

/**
 * 项目controller
 */
export default class Page extends Base {
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
      result = await pageRouteModel.save({
        ...data,
        create_time: startAt,
        update_time: startAt,
      });
    } else {
      const pageDetail = pageRouteModel.getPageDetail({
        projectId: data.project_id,
        id: data.id,
      })
      if (pageDetail.status == 2) {
        return this.send(res, result, false, '生成页面中不能编辑');
      }
      let param = {
        ...data,
        update_time: startAt,
      };
      delete param.project_id;
      delete param.path;
      param.status = 4;
      result = await pageRouteModel.update(param, param.id);
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
    result = await pageRouteModel.getPageDetail(data);
    if (result.length == 0) {
      return this.send(res, result, false, "未找到该路由");
    }

    return this.send(res, result);
  }

  /**
   * 获取项目列表
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async pageList(req, res) {
    let data = req.body || {},
      result = {};

    result.list = await pageRouteModel.getPages(data);
    result.count = await pageRouteModel.getPagesCount(data);
    return this.send(res, result);
  }

  /**
   * 生成页面
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async generatePage(req, res) {
    let data = req.body || {},
      result = {};
    let pageRes = await pageRouteModel.getPageDetail({
      projectId: data.projectId,
      status: 2
    })
    if (pageRes) {
      return this.send(res, result, false, "待上一个页面生成完成，才能继续生成！");
    }
    let param = {
      status: 2,
      project_id: data.projectId,
    }
    await pageRouteModel.update(param, data.id)
    
    exec(
      `npm run command Generate:Project ${data.projectId} ${data.id}`,
      async (error, stdout, stderr) => {
        console.log(stdout, stderr);
        param.status = 3
        await pageRouteModel.update(param, data.id)
      }
    );
    return this.send(res, result);
  }
}
