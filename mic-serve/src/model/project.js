import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";
import moment from "moment/moment";
import DATE_FORMAT from "../constants/date_format";

const BASE_TABLE_NAME = "project";
const TABLE_COLUMN = [];

const DISOLAYT_TABLE_COLUMN = [];
export const PROJECT_OPEN = 1;
export const PROJECT_CLOSE = 0;
export const PROJECT_RELEASE = 2;

export const typeEnum = {
  1: "pc",
  2: "mobile",
};

export const statusEnum = {
  1: "禁用",
  2: "启用",
  3: "项目页面生成中",
};

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class ProjectModel {
  constructor() {
    this.tableColumnArr = [
      "type",
      "code",
      "name",
      "desc",
      "status",
      "create_time",
      "update_time",
    ];
  }

  /**
   * 保存
   * @param {*} data
   * @returns
   */
  async save(data) {
    let tableName = getTableName();
    let insertData = {};
    for (let column of this.tableColumnArr) {
      insertData[column] = data[column];
    }
    let insertResult = await Knex.returning("id")
      .insert(insertData)
      .into(tableName)
      .catch((err) => {
        console.log(err);
        Logger.log(err.message, "ProjectModel    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 修改
   * @param {*} data
   * @param {*} id
   * @returns
   */
  async update(data, id) {
    let tableName = getTableName();
    let updateResult = await Knex.from(tableName).update(data).where("id", id);
    return updateResult;
  }

  /**
   * 分页
   * @param {*} params
   * @returns
   */
  async getPages(params) {
    let { pageSize = 10, page = 1, name = '', type =  "", status = "", } = params;
    let tableName = getTableName();

    let res = Knex.select("*")
      .from(tableName)
      .where('create_time', '>', '2023-05-02 21:19:50');

    if (name) {
      res = res.andWhere("name", "like", `%${name}%`);
    }
    if (type) {
      res = res.andWhere("type", type)
    }
    if (status) {
      res = res.andWhere("status", status)
    }
    res = await res
      .orderBy("update_time", "desc")
      .limit(pageSize)
      .offset(page * pageSize - pageSize)
      .catch((err) => {
        console.log(err);
        return [];
      });

    res.forEach((item) => {
      item.type_desc = typeEnum[item.type];
      item.status_desc = statusEnum[item.status];
      item.create_time = moment(item.create_time).format(
        DATE_FORMAT.DISPLAY_BY_SECOND
      );
      item.update_time = moment(item.update_time).format(
        DATE_FORMAT.DISPLAY_BY_SECOND
      );
    });

    return res;
  }

  /**
   * 总数
   * @param {*} params
   * @returns
   */
  async getPagesCount(params) {
    let { name = '', type =  "", status = "", } = params;
    let tableName = getTableName();
    let res = Knex.from(tableName);

    res = res.where('create_time', '>', '2023-05-02 21:19:50');

    if (name) {
      res = res.andWhere("name", "like", `%${name}%`);
    }
    if (type) {
      res = res.andWhere("type", type)
    }
    if (status) {
      res = res.andWhere("status", status)
    }
    
    
    res = await res.count("* as projectCount").catch((err) => {
      console.log(err);
      return 0;
    });

    return res[0].projectCount;
  }

  async getTypeAll(data) {
    let tableName = getTableName();
    let res = await Knex.select("*")
      .where('type', data.type)
      .from(tableName)

    return res
  }

  /**
   * 获取所有项目
   * @returns 
   */
  async getAll() {
    let tableName = getTableName();
    let res = await Knex.select("*")
      .from(tableName)

    return res
  }

  /**
   * 获取详情
   * @param {*} params 
   * @returns 
   */
  async getPageDetail(params) {
    console.log(params)
    let tableName = getTableName();
    let res = Knex.select("*")
      .from(tableName)
      .where("id", params.id);

    res = await res.first().catch((e) => {
      Logger.warn("查询失败, 错误原因 =>", e);
      return [];
    });

    return res;
  }
}
