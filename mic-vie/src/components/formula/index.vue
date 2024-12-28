<template>
  <div id="v-formula-monaco-editor" :style="style"></div>
</template>

<script>
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
import { nextTick, onMounted } from "vue";
import { customLanguageM, suggestionsFun } from "./config";

let editor;
const languageId = "formulaLang";
const customLanguage = customLanguageM;

export default {
  props: {
    style: {
      type: String,
      default: "",
    },
  },
  components: {},
  setup(props) {
    const editorInit = () => {
      editor = monaco.editor.create(
        document.getElementById("v-formula-monaco-editor"),
        {
          value: ``,
          language: languageId,
          theme: "vs-dark",
          automaticLayout: true, //是否开启自动布局
          // minimap: {
          //   enabled: false,
          // },
        }
      );

      const customCompletionProvider = {
        // 提供自动补全项
        provideCompletionItems: (model, position) => {
          const suggestions = suggestionsFun(monaco);

          return { suggestions: suggestions };
        },
      };
      // 注册语言配置
      monaco.languages.register({ id: languageId });
      // 定义自定义的语法高亮规则
      monaco.languages.setMonarchTokensProvider(languageId, customLanguage);
      // 注册自动补全
      monaco.languages.registerCompletionItemProvider(
        languageId,
        customCompletionProvider
      );

      //监听变化
      editor.onDidChangeModelContent((e) => {
        // console.log(e);
        // this.caretOffset = e.changes[0].rangeOffset; //获取光标位置
        // this.value = this.monacoEditor.getValue(); //使value和其值保持一致
      });
    };
    onMounted(() => {
      nextTick(() => {
        editorInit();
      });
    });
  },
};
</script>

<style scoped>
#v-formula-monaco-editor {
  width: 100%;
  height: auto;
  text-align: left;
}
</style>
