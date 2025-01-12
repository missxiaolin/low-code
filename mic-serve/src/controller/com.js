import Base from "./base";
import md5 from "md5";
import AdmUser from "../model/adm_user";
import Token from "../library/utils/token";
import colums from "../config/colum";
import ProjectModel from "../model/project";
import PageRoute from "../model/page_route";
import microList from "../config/micro";

const admUser = new AdmUser();
const projectModel = new ProjectModel();
const pageModel = new PageRoute();

/**
 * 首页
 */
export default class Component extends Base {}
