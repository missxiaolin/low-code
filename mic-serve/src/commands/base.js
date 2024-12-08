// https://developer.aliyun.com/mirror/npm/package/@adonisjs/ace

import { Command } from "@adonisjs/ace";
import _ from "lodash";
import moment from "moment";
import DATE_FORMAT from "../constants/date_format";
import Logger from "../library/logger";
import path from "path";
let projectBaseUri = path.resolve(__dirname, "../../"); // 项目所在文件夹
import shell from "shelljs";

class Base extends Command {
  static get signature() {
    return `
            Parse:Base
            
            {--onlyFlag:[必传]flag,只有true/false两个值} 
            {--logName=@value:[必传]日志文件名} 
            {--isTest?=@value:[可选]是否处于测试环境}
        `;
  }

  static get description() {
    return "基础配置, Base";
  }

  /**
   * 在最外层进行一次封装, 方便获得报错信息
   * @param args
   * @param options
   * @returns {Promise<void>}
   */
  async handle(args, options) {
    this.log("command start");
    await this.execute(args, options).catch((e) => {
      this.log("catch error");
      this.log(e.stack);
    });
    this.log("command finish");
  }

  async execute(args, options) {}

  /**
   * 简易logger
   * @returns  null
   */
  async log() {
    let message = "";
    for (let rawMessage of arguments) {
      if (_.isString(rawMessage) === false) {
        message = message + JSON.stringify(rawMessage);
      } else {
        message = message + rawMessage;
      }
    }
    let triggerAt = moment().format(DATE_FORMAT.DISPLAY_BY_MILLSECOND);
    console.log(`[${triggerAt}]-[${this.constructor.name}] ` + message);
    let logger = Logger.getLogger4Command(this.constructor.name);
    logger.info(message);
  }

  /**
   * 简易logger
   * @returns  null
   */
  async warn() {
    let message = "";
    for (let rawMessage of arguments) {
      if (_.isString(rawMessage) === false) {
        message = message + JSON.stringify(rawMessage);
      } else {
        message = message + rawMessage;
      }
    }
    let triggerAt = moment().format(DATE_FORMAT.DISPLAY_BY_MILLSECOND);
    console.warn(`[${triggerAt}]-[${this.constructor.name}] ` + message);
    let logger = Logger.getLogger4Command(this.constructor.name);
    logger.warn(message);
  }

  /**
   * 分发日志Parse命令
   * @param {*} commandName
   * @param {*} startTime
   * @param {*} endTime
   */
  async dispatchParseCommand(commandName, startTime, endTime) {
    if (startTime && endTime) {
      this.log(`${commandName}任务开始, 处理时间 => ${startTime}, ${endTime}`);
      this.execCommand(commandName, [startTime, endTime]);
    } else {
      this.execCommand(commandName);
    }
  }

  /**
   * 执行脚本
   * @param {*} commandName
   * @param {*} args
   */
  async execCommand(commandName, args = []) {
    let argvString = args
      .map((arg) => {
        return `'${arg}'`;
      })
      .join("   ");
    let command = `NODE_ENV=production node ${projectBaseUri}/dist/command.js ${commandName}  ${argvString}`;
    this.log(`待执行命令=> ${command}`);
    let commandStartAtFormated = moment().format(
      DATE_FORMAT.DISPLAY_BY_MILLSECOND
    );
    let commandStartAtms = moment().valueOf();
    shell.exec(
      command,
      {
        async: true,
        silent: true,
      },
      () => {
        let commandFinishAtFormated = moment().format(
          DATE_FORMAT.DISPLAY_BY_MILLSECOND
        );
        let commandFinishAtms = moment().valueOf();
        let during = (commandFinishAtms - commandStartAtms) / 1000;
        this.log(
          `${command}命令执行完毕, 共用时${during}秒, 开始执行时间=> ${commandStartAtFormated}, 执行完毕时间=> ${commandFinishAtFormated}`
        );
      }
    );
  }
}

export default Base;
