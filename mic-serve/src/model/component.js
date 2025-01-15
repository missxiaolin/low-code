import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";
import moment from "moment/moment";
import DATE_FORMAT from "../constants/date_format";

const BASE_TABLE_NAME = "component";
const TABLE_COLUMN = [];

const DISOLAYT_TABLE_COLUMN = [];
export const PROJECT_OPEN = 1;
export const PROJECT_CLOSE = 0;
export const PROJECT_RELEASE = 2;

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class ComponentModel {
  constructor() {
    this.tableColumnArr = [
      "project_id",
      "name",
      "componentName",
      "component",
      "attribute",
      "version",
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
        Logger.log(err.message, "ComponentModel    add   出错");
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
   * 获取详情
   * @param {*} data
   * @returns
   */
  async getDetail(data) {
    let { projectId = 0, version, type, id } = data;
    let tableName = getTableName();
    let res = Knex.from(tableName);
    res = res.where("project_id", projectId);

    if (id) {
      res = res.andWhere("id", id);
    }

    if (version) {
      res = res.andWhere("version", version);
    }

    if (type) {
      res = res.andWhere("type", type);
    }

    return await res;
  }

  /**
   * 分页
   * @param {*} params
   * @returns
   */
  async getPages(params) {
    let { pageSize = 10, page = 1, name = "", projectId } = params;
    let tableName = getTableName();

    let res = Knex.select("*").from(tableName).where("project_id", projectId);

    if (name) {
      res = res.andWhere("name", "like", `%${name}%`);
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
    let { name = "", projectId } = params;
    let tableName = getTableName();
    let res = Knex.from(tableName);

    res = res.where("project_id", projectId);

    if (name) {
      res = res.andWhere("name", "like", `%${name}%`);
    }

    res = await res.count("* as componentCount").catch((err) => {
      console.log(err);
      return 0;
    });

    return res[0].componentCount;
  }
}
