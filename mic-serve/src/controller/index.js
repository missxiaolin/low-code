import Base from "./base";
import md5 from "md5";
import AdmUser from "../model/adm_user";
import Token from "../library/utils/token";
import colums from '../config/colum'
import ProjectModel from '../model/project'
import PageRoute from '../model/page_route'
import microList from '../config/micro'

const admUser = new AdmUser();
const projectModel = new ProjectModel();
const pageModel = new PageRoute();

/**
 * 首页
 */
export default class Index extends Base {

  /**
   * adm 登录
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    let data = req.body || {};
    if (!data.username || !data.password) {
      return this.send(res, {}, false, "账号密码错误");
    }
    data.password = md5(data.password);
    let user = await admUser.getUser(data);
    if (user && user.id) {
      return this.send(res, {
        userId: user.id,
        token: Token.encrypt({ id: user.id }),
      });
    } else {
      return this.send(res, {}, false, "账号密码错误");
    }
  }

  /**
   * 菜单栏
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async getColum(req, res) {
    let data = req.body || {},
      result = colums;
    let arr = [];
    let projectList = await projectModel.getTypeAll(data)
    projectList.forEach(item => {
      let obj = {
        path: item.id,
        meta: {
          title: item.name,
          elIcon: "Operation",
        },
      }
      arr.push(obj)
    })
    for(let i = 0; i < arr.length; i++) {
      let pageList = await pageModel.getAll({
        projectId: arr[i].path,
        status: [2, 3, 4]
      })
      let pageArr = []
      pageList.forEach(item => {
        let obj = {
          path: item.path,
          meta: {
            title: item.route_name,
          },
        }
        pageArr.push(obj)
      })
      arr[i].children = pageArr
    }
    result = [...result, ...arr]
    return this.send(res, result);
  }

  /**
   * 微前端配置
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async getMicro(req, res) {
    let data = req.body || {},
      result = microList;

    let projectList = await projectModel.getAll()
    for (let i = 0; i < projectList.length; i++) {
      if (result[`micro-${projectList[i].code}`].name) {
        let pageList = await pageModel.getAll({
          projectId: projectList[i].id,
          status: [2, 3, 4]
        })
        let arr = []
        pageList.forEach(item => {
          const segments = item.path.split("/");
          arr.push(segments[1])
        })
        result[`micro-${projectList[i].code}`].systemCodes = arr
      }
      
    }

    return this.send(res, result);
  }
}
