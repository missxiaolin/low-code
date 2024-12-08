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
            {id:[必传]路由ID}
         `;
    // return `

    //     {id:[必传]页面id}
    //  `
  }

  static get description() {
    return "项目页面生成";
  }

  async execute(args, options) {
    const { projectId, id } = args;

    // 获取路由配置
    const route = await pageRouteModel.getPageDetail({
      projectId,
      id,
    });

    if (!route || route.length == 0) {
      this.log("页面不存在");
      return;
    }

    // 生成页面
    const pageName = this.generateCamelCaseString(route.path);

    const targetDirectory = resolve(__dirname, "../../../../mic-vue");

    // 切换到目标文件夹
    process.chdir(targetDirectory);

    const rJsonName = resolve(__dirname, "../../../../mic-vue/src/router/r.json")
    if (!fs.existsSync(rJsonName)) {
      try {
        fs.writeFileSync(rJsonName, '');
        console.log('文件已创建');
      } catch (error) {
        console.error('创建文件时发生错误：', error);
      }
    }

    let r = fs.readFileSync(
      rJsonName,
      "utf8"
    );
    r = JSON.parse(r || '[]');
    let x = false;
    r.forEach((item) => {
      if (item.path === route.path) {
        x = true;
      }
    });
    if (!x) {
      r.push({
        path: route.path,
        pageName
      });
    }

    fs.writeFileSync(
      resolve(__dirname, `../../../../mic-vue/src/router/r.json`),
      `${JSON.stringify(r)}`
    );

    const filename = resolve(__dirname, `../../../../mic-vue/src/views/${pageName}.vue`)
    const folderName = resolve(__dirname, `../../../../mic-vue/src/views`)
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }

    fs.writeFileSync(
      filename,
      route.page_html
    );

    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令失败: ${error.message}`);
        return;
      }

      console.log(`执行命令成功，输出结果: ${stdout}`);
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
