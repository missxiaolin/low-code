import Base from "../base";
import PageRoute from "../../model/page_route";
import path, { resolve } from "path";
import fs from "fs";

const { exec } = require("child_process");
const pageRouteModel = new PageRoute();

class GenerateProject extends Base {
  static get signature() {
    return `
            Generate:Project 
            {projectId:[必传]项目ID}
         `;
    // return `

    //     {id:[必传]页面id}
    //  `
  }

  static get description() {
    return "项目页面生成";
  }

  async execute(args, options) {
    const { projectId } = args;

    let pages = await pageRouteModel.getAll({
      projectId: projectId,
      status: [2],
    });
    const targetDirectory = resolve(__dirname, "../../../../mic-remote");

    // 切换到目标文件夹
    process.chdir(targetDirectory);
    pages.forEach((item) => {
      let pageName = this.generateCamelCaseString(item.path);
      console.log(pageName);
    });
  }

  generateCamelCaseString(path) {
    const segments = path.split("/");
    let camelCaseStr = "";

    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      let firstChar = "";
      if (i != 1) {
        firstChar = segment.charAt(0).toUpperCase();
      } else {
        firstChar = segment.charAt(0).toLowerCase();
      }

      const restOfString = segment.slice(1).toLowerCase();
      camelCaseStr += firstChar + restOfString;
    }

    return camelCaseStr;
  }
}

export default GenerateProject;
