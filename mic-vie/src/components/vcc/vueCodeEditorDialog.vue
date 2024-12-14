<template>
  <a-modal
    title="Vue二次编辑"
    v-model:open="dialogVisible"
    width="70%"
    :before-close="handleClose"
    :mask="true"
    :centered="true"
    @ok="handleOk"
  >
    <a-tabs
      v-if="dialogVisible"
      v-model:activeKey="activeKey"
      :destroyInactiveTabPane="false"
    >
      <a-tab-pane key="html" tab="html">
        <codeEditor
          :height="'65vh;'"
          :language="'html'"
          ref="htmlCodeEditor"
          :value="`${htmlCode}`"
        ></codeEditor>
      </a-tab-pane>
      <a-tab-pane key="javascript" tab="javascript">
        <codeEditor
          :height="'65vh;'"
          ref="jsCodeEditor"
          :value="`${jsCode}`"
        ></codeEditor>
      </a-tab-pane>
      <a-tab-pane key="css" tab="css">Content of Tab Pane 1</a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import codeEditor from "../editor/index.vue";
import prettier from "prettier/standalone.js";
import htmlBabel from "prettier/parser-html";
import babel from "prettier/parser-babel";
import { html2Json } from "../../libs/bundle-html2json-esm";
import { ergodic, findAObject } from "../../utils/common";

export default {
  props: ["vueDialogVisible"],
  components: {
    codeEditor,
  },
  emits: ["codeParseSucess", "update:vueDialogVisible"],
  data() {
    return {
      activeKey: "html",
      error: "",
      htmlCode: "",
      jsCode: "",
      cssCode: "",
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.vueDialogVisible;
      },
      set() {
        this.$emit("update:vueDialogVisible", false);
      },
    },
  },
  methods: {
    async updateJsCode(code) {
      if (code) {
        this.jsCode = prettier.format(code, {
          plugins: [babel],
        });
      }
    },
    async updateCode(code) {
      // html code
      // 创建DOMParser实例
      const parser = new DOMParser();
      // 解析HTML字符串
      const doc = parser.parseFromString(code, "text/html");
      // 获取最外层的<template>标签
      const templateElement = doc.querySelector("template");
      // 提取并打印其内容
      const templateContent = templateElement.outerHTML;
      const beautiful = prettier.format(templateContent, {
        semi: false,
        parser: "html",
        plugins: [htmlBabel],
      });
      this.htmlCode = `${beautiful}`;
    },
    async handleOk() {
      let html = "",
        js = {
          JSCodeInfo: "",
          JSCode: "",
        },
        css = "";
      try {
        const code = this.$refs.htmlCodeEditor.getEditorCode();
        // 去掉注释，注释的替换逻辑并不健壮，用的是贪心方式
        // const temp = code.replace(/.+\*\/\s*/gs, "");
        const temp = code;

        if (temp) {
          // 解析Vue
          const obj = await html2Json(temp);
          // 取出template结构
          const template = findAObject(obj.root.__children, "template");

          if (template) {
            // 为每个节点增加lc_id
            ergodic(template);
            // 通知VCC渲染此结构
            html = template;
          } else {
            this.error = "Vue解析失败，请检查是不是完整的Vue结构";
          }
        } else {
          this.error = "请输入Vue代码";
        }
      } catch (error) {
        console.warn(error);
        this.error = error;
      }
      // 去掉注释
      try {
        const jsCode = this.$refs.jsCodeEditor.getEditorCode();
        // 转换为对象
        js.JSCodeInfo = jsCode;
        js.JSCode = jsCode.replace("export default ", "");
        this.error = "";
      } catch (error) {
        console.warn(error);
        this.error = error;
      }
      this.$emit("codeParseSucess", html, js);
      this.handleClose();
    },
    handleClose() {
      this.activeKey = "html";
      this.dialogVisible = false;
    },
  },
};
</script>
