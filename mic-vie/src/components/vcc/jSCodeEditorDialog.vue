<template>
  <el-dialog
    title="JS逻辑编辑"
    v-model="dialogVisible"
    width="70%"
    top="10vh"
    :before-close="handleClose"
    :center="true"
  >
    <codeEditor
      :height="'65vh;'"
      ref="codeEditor"
      :value="`export default ${code}`"
    ></codeEditor>

    <div class="js-bottom">
      <div>
        <el-button type="primary" @click="onSave">确认修改</el-button>
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

const example = dedent`{
        data() {
          return {
  
          };
        },
        watch: {
  
        },
  
        computed: {
  
        },
  
        methods: {
          
        },
};
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
        const pre = "const a = ";
        this.code = prettier
          .format(pre + newCode, {
            plugins: [babel],
          })
          .replace(pre, "");
      }
    },
    handleClose() {
      this.$emit("update:codeDialogVisible", false);
    },
    onSave() {
      const code = this.$refs.codeEditor.getEditorCode();
      // 去掉注释
      const temp = code.replace(/.+\*\/\s*/gs, "").replace(/\s+/g, "");
      try {
        // 转换为对象
        const JSCodeInfo = eval(`(function(){return ${temp}})()`);
        this.$emit("saveJSCode", {
          JSCodeInfo,
          JSCode: temp,
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
