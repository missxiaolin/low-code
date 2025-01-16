import Base from "../base";
import ComponentModel from "../../model/component";
import path, { resolve } from "path";
import fs from "fs";
import { uploadToken, uploadFile } from "../../library/qiniu/index";
import dotenv from "dotenv";

const { exec } = require("child_process");
const appConfig = dotenv.config().parsed;
const componentModel = new ComponentModel();

class GenerateComponent extends Base {
  static get signature() {
    return `
                Generate:Component 
                {projectId:[必传]项目ID}
                {componentId:[必传]组件ID}
             `;
    // return `

    //     {id:[必传]页面id}
    //  `
  }

  static get description() {
    return "项目页面生成";
  }

  async execute(args, options) {
    const { projectId, componentId } = args;

    let detailList = await componentModel.getDetail({
      projectId,
      id: componentId,
    });
    if (detailList.length === 0) {
      return;
    }
    const detail = detailList[0];
    const rJsonName = resolve(__dirname, "../../../../mic-component/r.json");
    if (!fs.existsSync(rJsonName)) {
      try {
        fs.writeFileSync(rJsonName, "");
        console.log("文件已创建");
      } catch (error) {
        console.error("创建文件时发生错误：", error);
        return;
      }
    }
    const rObj = {
      entry: `src/components/${detail.componentName}.vue`,
      name: detail.componentName,
      fileName: detail.componentName,
      formats: ["es"],
    };
    fs.writeFileSync(rJsonName, JSON.stringify(rObj)); // 写入json文件
    const vueFile = resolve(
      __dirname,
      `../../../../mic-component/src/components/${detail.componentName}.vue`
    );
    fs.writeFileSync(vueFile, detail.component);
    // 切换到目标文件夹
    const targetDirectory = resolve(__dirname, "../../../../mic-component");
    process.chdir(targetDirectory);
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`打包错误: ${error.message}`);
        return;
      }
      // 打包成功后复制文件
      const srcFilePath = resolve(
        targetDirectory,
        "dist",
        `${detail.componentName}.es.js`
      );
      const destFilePath = resolve(
        targetDirectory,
        "lib",
        `${detail.componentName}.es.js`
      );
      // 确保 lib 目录存在
      const libDirectory = resolve(targetDirectory, "lib");
      if (!fs.existsSync(libDirectory)) {
        fs.mkdirSync(libDirectory, { recursive: true });
      }
      // 复制文件
      fs.copyFile(srcFilePath, destFilePath, (err) => {
        if (err) {
          console.error(`复制文件时发生错误: ${err.message}`);
          return;
        }
        console.log(`文件已成功复制到 ${destFilePath}`);
      });
    });
  }
}

export default GenerateComponent;
