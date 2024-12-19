<template>
  <div :id="uuid" :style="style"></div>
  <!-- <div class="editor-container" :id="uuid" :style="style"></div> -->
</template>

<script>
import { loadScript } from "../../utils/loadScript";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { uuid } from "../../utils/utils";
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
      default: "javascript",
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
      this.$nextTick(() => {
        editor[this.uuid] = monaco.editor.create(
          document.getElementById(`${this.uuid}`),
          {
            ...this.options,
            value: this.text,
            language: this.language,
            formatOnType: true,
            formatOnPaste: true,
          }
        );
        // 监听值的变化
        editor[this.uuid].onDidChangeModelContent((val) => {
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
  },
};
</script>
