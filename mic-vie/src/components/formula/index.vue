<template>
  <div :id="uuid" :style="style"></div>
</template>

<script>
import { loadScript } from "../../utils/loadScript";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { uuid } from "../../utils/utils";
import { customLanguageM, suggestionsFun } from "./config";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main.js";
let editor = {};

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100vh",
    },
    language: {
      type: String,
      default: "formulaLang",
    },
    options: {
      type: Object,
      default: () => {
        return {
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        };
      },
    },
  },
  data() {
    return {
      style: "",
      uuid: uuid(10),
      text: "",
    };
  },
  mounted() {
    this.style = `width: ${this.width};height: ${this.height};`;
    this.text = this.value;
    this.editorInit();
  },
  methods: {
    editorInit() {
      const languageId = this.language;
      this.$nextTick(() => {
        editor[this.uuid] = monaco.editor.create(
          document.getElementById(`${this.uuid}`),
          {
            value: this.text,
            theme: "vs-dark",
            automaticLayout: true, //是否开启自动布局
            language: this.language,
            formatOnType: true,
            formatOnPaste: true,
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
        monaco.languages.setMonarchTokensProvider(languageId, customLanguageM);
        // 注册自动补全
        monaco.languages.registerCompletionItemProvider(
          languageId,
          customCompletionProvider
        );
        // 监听值的变化
        editor[this.uuid].onDidChangeModelContent((e) => {
          this.text = editor[this.uuid].getValue();
          this.$emit("change", editor[this.uuid].getValue());
          this.$emit("update:value", editor[this.uuid].getValue());
        });
        setTimeout(() => {
          editor[this.uuid].getAction("editor.action.formatDocument").run();
        }, 200);
      });
    },
    getEditorCode() {
      let code = editor[this.uuid].getValue();
      return code;
    },
    getEditor() {
      return editor[this.uuid];
    },
    setEditorCode(code) {
      const editorV = editor[this.uuid];
      const position = editorV.getPosition();
      const edit = {
        range: new monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        ),
        options: { isUndoable: true },
        text: code,
      };
      editorV.executeEdits(this.uuid, [edit]);
    },
  },
};
</script>
