<template>
  <a-modal
    title="JS逻辑编辑"
    v-model:open="dialogVisible"
    width="70%"
    top="10vh"
    :before-close="handleClose"
    :center="true"
  >
    <codeEditor
      :height="'65vh;'"
      ref="codeEditor"
      :value="`${code}`"
    ></codeEditor>

    <template #footer>
      <div class="js-bottom">
        <div>
          <a-button type="primary" @click="onSave">确认修改</a-button>
          <div v-if="error" class="error">请检查语法错误：{{ error }}</div>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script>
import dedent from "dedent";
import codeEditor from "../editor/index.vue";

import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

const example = dedent`export default {
  setup() {
    const data = toRefs({
      
    })

    return {
      data
    }
  }
}
        `;

export default {
  props: ["codeDialogVisible"],
  emits: ["saveJSCode", "update:codeDialogVisible"],
  components: {
    codeEditor,
  },

  data() {
    return {
      error: "",
      code: example,
      example: `${example}`,
    };
  },
  methods: {
    updateLogicCode(newCode) {
      if (newCode) {
        this.code = prettier.format(newCode, {
          plugins: [babel],
        });
      }
    },
    handleClose() {
      this.$emit("update:codeDialogVisible", false);
    },
    onSave() {
      const code = this.$refs.codeEditor.getEditorCode();
      console.log("code", code);
      // 去掉注释
      // const temp = code.replace(/.+\*\/\s*/gs, "").replace(/\s+/g, "");
      try {
        // 转换为对象
        const JSCodeInfo = `export default ${code}`;
        this.$emit("saveJSCode", {
          JSCodeInfo,
          JSCode: code,
        });
        this.handleClose();
        this.error = "";
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
        return this.codeDialogVisible;
      },
      set() {
        this.$emit("update:codeDialogVisible", false);
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
