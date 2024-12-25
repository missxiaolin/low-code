import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";
import moment from "moment/moment";
import DATE_FORMAT from "../constants/date_format";

const BASE_TABLE_NAME = "menu";
const TABLE_COLUMN = [];

const DISOLAYT_TABLE_COLUMN = [];

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class MenuModel {
  constructor() {
    this.tableColumnArr = [
      "project_id",
      "menu_id",
      "path",
      "name",
      "type",
      "status",
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
        Logger.log(err.message, "MenuModel    add   出错");
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
    let { projectId = 0, pageSize = 10, page = 1, name = "" } = params;
    let tableName = getTableName();

    let res = Knex.select("*").from(tableName).where("project_id", projectId);

    if (name) {
      res = res.andWhere("name", "like", `%${name}%`);
    }
    if (path) {
      res = res.andWhere("path", path);
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
      item.status_desc = STATUS_ENUM[item.status];
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
    let { projectId = 0, name = "", path = "" } = params;
    let tableName = getTableName();
    let res = Knex.from(tableName);

    res = res.where("project_id", projectId);

    if (name) {
      res = res.andWhere("name", "like", `%${name}%`);
    }
    if (path) {
      res = res.andWhere("path", path);
    }

    res = await res.count("* as menuCount").catch((err) => {
      console.log(err);
      return 0;
    });

    return res[0].menuCount;
  }
}
