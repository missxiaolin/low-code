import Knex from "../library/mysql";
import _ from "lodash";
import Logger from "../library/logger";

const BASE_TABLE_NAME = "adm_user";
const TABLE_COLUMN = [];

const DISOLAYT_TABLE_COLUMN = [];

function getTableName() {
  return BASE_TABLE_NAME;
}

export default class AdmUser {
  constructor() {}

  /**
   * 获取adm用户
   * @param {*} startTime
   * @param {*} endTime
   * @param {*} app
   */
  async getUser(data) {
    let tableName = getTableName();
    let res = await Knex.select("id", "username", "password")
      .from(tableName)
      .where("username", "=", data.username)
      .andWhere("password", "=", data.password)
      .first()
      .catch((e) => {
        Logger.warn("查询失败, 错误原因 =>", e);
        return [];
      });

    return res;
  }
}
