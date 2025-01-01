import Base from "../base";
import PageRoute from "../../model/page_route";
import ProjectModel from "../../model/project";
import path, { resolve } from "path";
import fs from "fs";
import { uploadToken, uploadFile } from "../../library/qiniu/index";

const { exec } = require("child_process");
const pageRouteModel = new PageRoute();
const projectModel = new ProjectModel();

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
    let projectDetail = await projectModel.getPageDetail({
      id: projectId,
    });
    // 创建打包json文件
    const rJsonName = resolve(__dirname, "../../../../mic-remote/r.json");
    if (!fs.existsSync(rJsonName)) {
      try {
        fs.writeFileSync(rJsonName, "");
        console.log("文件已创建");
      } catch (error) {
        console.error("创建文件时发生错误：", error);
      }
    }
    let r = fs.readFileSync(rJsonName, "utf8");
    r = r ? JSON.parse(r) : {};
    const targetDirectory = resolve(__dirname, "../../../../mic-remote");

    // 切换到目标文件夹
    process.chdir(targetDirectory);

    pages.forEach((item) => {
      let pageName = this.generateCamelCaseString(item.path);
      const filename = resolve(
        __dirname,
        `../../../../mic-remote/src/remote-components/${pageName}.vue`
      );
      const jsonName = resolve(
        __dirname,
        `../../../../mic-remote/src/remote-components/${pageName}.json`
      );
      const html = item.page_html.replace(
        `import events from "./events.json";`,
        `import events from "./${pageName}.json";`
      );
      fs.writeFileSync(filename, html); // 写入文件
      fs.writeFileSync(jsonName, item.eventNode); // 写入json文件
      r[item.path] = `./src/remote-components/${pageName}.vue`;
    });
    fs.writeFileSync(
      resolve(__dirname, `../../../../mic-remote/r.json`),
      `${JSON.stringify(r)}`
    );

    // 执行打包命令
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令失败: ${error.message}`);
        return;
      }
      // this.getBuildFiles(projectDetail.code);
      console.log(`执行命令成功，输出结果: ${stdout}`);
    });
  }

  getBuildFiles(code) {
    const path = "../../../../mic-remote/dist/assets/";
    let fileDirectory = resolve(__dirname, path);
    // 异步读取文件夹
    fs.readdir(fileDirectory, (err, files) => {
      files.forEach((file) => {
        // 拼接完整的文件路径
        const filePath = `${fileDirectory}/${file}`;
        const fileName = `lowcode/${code}/1.0.0/${file}`;
        uploadFile(filePath, fileName);
      });
    });
  }

  // 上传到七牛云
  uploadQiNiuFile(file, fileName) {}

  /**
   * 生成名称
   * @param {*} path
   * @returns
   */
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
