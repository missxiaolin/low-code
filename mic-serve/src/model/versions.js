import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";
import moment from "moment/moment";
import DATE_FORMAT from "../constants/date_format";

const BASE_TABLE_NAME = "versions";
const TABLE_COLUMN = [];

const DISOLAYT_TABLE_COLUMN = [];
export const PROJECT_OPEN = 1;
export const PROJECT_CLOSE = 0;
export const PROJECT_RELEASE = 2;

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class VersionsModel {
  constructor() {
    this.tableColumnArr = [
      "project_id",
      "type",
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
        Logger.log(err.message, "VersionsModel    add   出错");
        return [];
      });
    let id = _.get(insertResult, [0], 0);

    return id > 0;
  }

  /**
   * 获取详情
   * @param {*} data
   * @returns
   */
  async getDetail(data) {
    let { projectId = 0, version, type } = data;
    let tableName = getTableName();
    let res = Knex.from(tableName);
    res = await res
      .where("project_id", projectId)
      .where("version", version)
      .andWhere("type", type);

    return res;
  }

  /**
   * 获取所有版本信息
   * @param {*} params
   * @returns
   */
  async getVersionsAll(params) {
    let { projectId = 0, type } = params;
    let tableName = getTableName();
    let res = Knex.from(tableName);
    res = await res.where("project_id", projectId).andWhere("type", type);

    return res;
  }
}
