<template>
  <a-modal
    title="Vue二次编辑"
    v-model:open="dialogVisible"
    width="70%"
    :before-close="handleClose"
    :mask="true"
    :centered="true"
  >
    <codeEditor
      v-if="vueDialogVisible"
      :height="'65vh;'"
      :language="'html'"
      ref="codeEditor"
      :value="`${code}`"
    ></codeEditor>

    <template #footer>
      <div style="text-align: center; padding: 10px">
        <a-button type="primary" @click="compile">开始解析</a-button>
        <div style="color: #6c6c6c; font-size: 12px; margin-top: 5px">
          Tips: 解析成功后VCC将展示解析后的效果
        </div>
        <div v-if="error" style="color: red; font-size: 12px; margin-top: 5px">
          请检查语法错误：{{ error }}
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script>
import codeEditor from "../editor/index.vue";
import { html2Json } from "../../libs/bundle-html2json-esm";
import { ergodic, findAObject } from "../../utils/common";

export default {
  props: ["vueDialogVisible"],
  emits: ["codeParseSucess", "update:vueDialogVisible"],
  components: {
    codeEditor,
  },

  data() {
    return {
      error: "",
      code: "",
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async updateCode(code) {
      // 创建DOMParser实例
      const parser = new DOMParser();
      // 解析HTML字符串
      const doc = parser.parseFromString(code, "text/html");
      // 获取最外层的<template>标签
      const templateElement = doc.querySelector("template");
      // 提取并打印其内容
      const templateContent = templateElement.outerHTML;
      this.code = `${templateContent}`;
    },
    async compile() {
      try {
        const code = this.$refs.codeEditor.getEditorCode();
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
            this.$emit("codeParseSucess", template);
            this.handleClose();
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
    },
  },
  watch: {},
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
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

:v-deep(.el-dialog__body) {
  padding: 0 30px !important;
}
</style>
