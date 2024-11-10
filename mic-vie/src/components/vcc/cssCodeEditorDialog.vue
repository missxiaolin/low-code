<template>
  <el-dialog
    title="CSS编写"
    v-model="dialogVisible"
    width="70%"
    top="10vh"
    :before-close="handleClose"
    :center="true"
  >
    <codeEditor
      :height="'65vh;'"
      :language="'scss'"
      ref="codeEditor"
      :value="`${code}`"
    ></codeEditor>

    <div class="js-bottom">
      <div>
        <el-button type="primary" @click="onSave">保存</el-button>
        <div v-if="error" class="error">请检查语法错误：{{ error }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import dedent from "dedent";
import codeEditor from "../editor/index.vue";

import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

export default {
  props: ["cssCodeDialogVisible"],
  emits: ["saveCssCode", "update:cssCodeDialogVisible"],
  components: {
    codeEditor,
  },

  data() {
    return {
      error: "",
      code: '',
      example: '',
    };
  },
  methods: {
    updateLogicCode(newCode) {
      this.code = newCode || ""
    },
    handleClose() {
      this.$emit("update:cssCodeDialogVisible", false);
    },
    onSave() {
      const code = this.$refs.codeEditor.getEditorCode();
      this.$emit('saveCssCode', code);
      this.$emit("update:cssCodeDialogVisible", false);
    },
  },
  watch: {},
  computed: {
    dialogVisible: {
      get() {
        return this.cssCodeDialogVisible;
      },
      set() {
        this.$emit("update:cssCodeDialogVisible", false);
      },
    },
  },
  fillter: {},
};
</script>

<style scoped lang="scss">
/*  在此自动生成 */

:v-deep(.el-dialog__body) {
  padding: 0 30px !important;
}
.js-bottom {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
