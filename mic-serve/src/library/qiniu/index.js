// 七牛云配置文件
import dotenv from "dotenv";
import axios from "axios";
const appConfig = dotenv.config().parsed;
const qiniu = require("qiniu");
const formidable = require("formidable");
const fs = require("fs");

export const getUploadToken = () => {
  // 创建上传凭证（accessKey 和 secretKey在七牛云个人中心中有，blog 是七牛云创建的空间名称）
  const accessKey = appConfig.QINIU_ACCESS_KEY; // ak密钥
  const secretKey = appConfig.QINIU_SECRET_KEY; // sk密钥
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: appConfig.QINIU_BUCKET, // 存储空间的名字
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
};

/**
 * 上传文件
 * @param {*} localFile
 * @param {*} fileName
 */
export const uploadFile = (localFile, fileName) => {
  const uploadToken = getUploadToken();
  let config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z2;
  // 创建formUploader实例
  let formUploader = new qiniu.form_up.FormUploader(config);
  let putExtra = new qiniu.form_up.PutExtra();
  let key = fileName;

  // 上传文件
  formUploader.putFile(
    uploadToken,
    key,
    localFile,
    putExtra,
    function (respErr, respBody, respInfo) {
      //   console.log(respErr, respBody, respInfo);
      //   if (respErr) {
      //     res.end(
      //       JSON.stringify({ status: "-1", msg: "上传失败", error: respErr })
      //     );
      //   }
      //   if (respInfo.statusCode == 200) {
      //     var imageSrc = imageUrl + respBody.key;
      //     res.end(
      //       JSON.stringify({ status: "200", msg: "上传成功", imageUrl: imageSrc })
      //     );
      //   } else {
      //     res.end(
      //       JSON.stringify({
      //         status: "-1",
      //         msg: "上传失败",
      //         error: JSON.stringify(respBody),
      //       })
      //     );
      //   }
    }
  );
};
