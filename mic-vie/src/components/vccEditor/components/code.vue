<template>
  <a-modal
    title="代码预览"
    v-model:open="dialogVisible"
    width="70%"
    top="10vh"
    :before-close="handleClose"
    :center="true"
    @ok="handleClose"
  >
    <!-- 这里加v-if是因为CodeEditor内部不支持watch数据监测 -->
    <codeEditor
      v-if="dialogVisible"
      style="max-height: 55vh"
      ref="codeEditor"
      :initCode="outputCode()"
      mode="text/html"
    ></codeEditor>
  </a-modal>
</template>

<script>
import { computed } from "vue";
import codeEditor from "./codeEditor.vue";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

export default {
  components: {
    codeEditor,
  },
  props: ["rawCode", "codeDialogVisible"],
  emits: ["update:codeDialogVisible"],

  setup(props, { emit }) {
    const dialogVisible = computed({
      get() {
        return props.codeDialogVisible;
      },
      set() {
        emit("update:codeDialogVisible", false);
      },
    });

    const handleClose = () => {
      emit("update:codeDialogVisible", false);
    };

    const prettyCode = () => {
      try {
        return prettier.format(props.rawCode, {
          parser: "html",
          plugins: [parserHtml],
          vueIndentScriptAndStyle: true,
        });
      } catch (error) {
        return props.rawCode;
      }
    };

    const outputCode = () => {
      console.log(props.rawCode);
      return prettyCode();
    };

    return {
      dialogVisible,
      handleClose,
      outputCode,
    };
  },
};
</script>

<style scoped>
/*  在此自动生成 */

:v-deep(.el-dialog__body) {
  padding: 0 30px !important;
}

.round-icon {
  background: #4dba87;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 10px 0;
  margin-left: 10px;
  border: 0px;
  box-sizing: border-box;
  cursor: pointer;
  padding-left: 12px;
}
</style>
