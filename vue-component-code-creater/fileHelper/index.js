import fileSystem from "fs";

export default {
  write: function (content, callback) {
    const fileName = `./dist/template${new Date().getTime()}.vue`;
    fileSystem.writeFile(
      fileName,
      content,
      function (error) {
        callback(error, fileName)
      }
    );
  },
  read: function (path) {
    return fileSystem.readFileSync(path);
  }
};
