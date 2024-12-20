require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/",
  },
});
window.MonacoEnvironment = {
  getWorkerUrl: function (workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/'
        };
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/base/worker/workerMain.js');`)}`;
  },
};
require(["vs/editor/editor.main"], function () {});
