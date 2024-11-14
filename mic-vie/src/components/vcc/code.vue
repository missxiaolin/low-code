<template>
  <a-modal
    title="代码预览"
    v-model:open="dialogVisible"
    width="70%"
    top="10vh"
    :before-close="handleClose"
    :center="true"
  >
    <!-- 这里加v-if是因为CodeEditor内部不支持watch数据监测 -->
    <codeEditor
      v-if="codeDialogVisible"
      style="max-height: 55vh"
      ref="codeEditor"
      :initCode="outputCode"
      mode="text/html"
    ></codeEditor>
    <div style="color: #666; font-size: 12px; text-align: center; margin: 5px">
      使用代码前请确认相应的组件库已集成至项目
    </div>
    <div style="text-align: left">
      <a-row>
        <a-col :span="5">
          输出形式：
          <a-radio-group
            v-model:value="outputMode"
            style="display: flex; flex-direction: column"
          >
            <a-radio value="vue">Vue</a-radio>
            <a-radio value="vue3">Vue3 setup模式</a-radio>
          </a-radio-group>
        </a-col>
        <a-col :span="10" style="display: flex; flex-direction: column">
          代码获取方式：
          <div style="margin-top: 10px; display: flex; flex-direction: row">
            <a-tooltip placement="left">
              <template #title>
                <span>拷贝</span>
              </template>
              <div class="round-icon icon-js" alt="">
                <CopyOutlined @click="copyCheck" style="color: #fff" />
              </div>
            </a-tooltip>
            <a-tooltip placement="right">
              <template #title>
                <span>下载</span>
              </template>
              <div
                class="round-icon icon-js"
                alt=""
                @click="codeDialogVisible = true"
              >
                <VerticalAlignBottomOutlined
                  @click="download"
                  style="color: #fff"
                />
              </div>
            </a-tooltip>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import "./prism.css";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import copy from "copy-to-clipboard";
import { saveAs } from "file-saver";
import { toV3 } from "../../utils/toV3.js";

import codeEditor from "./codeEditor.vue";
import singleIndexOutput from "../../libs/singleIndexOutput.js";
import { createUniqueId } from "../../utils/common";

export default {
  props: ["rawCode", "codeDialogVisible"],
  components: {
    codeEditor,
  },

  data() {
    return {
      // 在此自动生成
      outputMode: "vue",
      loading: false,
      accessUrl: "",
      fileName: "",
      checkList: ["ele"],
      vueVersion: "3",
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
    release() {
      // this.loading = true;
      // axios
      //   .post("https://xxxx.com", {
      //     id: `index${this.fileName ? this.fileName : createUniqueId()}`,
      //     content: this.singleIndex,
      //   })
      //   .then((res) => {
      //     this.accessUrl = res.data.data;
      //     this.loading = false;
      //   })
      //   .catch((err) => {
      //     this.loading = false;
      //     this.$message.error("发布失败，可能服务暂时不可用.");
      //   });
    },
    handleClose() {
      this.$emit("update:codeDialogVisible", false);
    },
    copyCheck() {
      this.copy();
    },
    copy() {
      if (copy(this.outputCode)) {
        this.$message.success("代码已复制到剪贴板");
      } else {
        this.$message.error("代码复制有点问题?");
      }
    },
    download() {
      let blob = new Blob([this.outputCode], {
        type: "text/plain;charset=utf-8",
      });

      if (this.isVueMode) {
        saveAs(blob, "VueComponent.vue");
      } else {
        saveAs(blob, "vcc.html");
      }
    },
  },
  watch: {
    codeDialogVisible(newValue) {
      if (newValue) {
      } else {
      }
    },
  },
  computed: {
    isVueMode() {
      return this.outputMode === "vue";
    },
    outputCode() {
      if (this.outputMode == "vue3") {
        return this.v2ToV3;
      }
      return this.isVueMode ? this.prettyCode : this.singleIndex;
    },

    dialogVisible: {
      get() {
        return this.codeDialogVisible;
      },
      set() {
        this.$emit("update:codeDialogVisible", false);
      },
    },
    v2ToV3() {
      try {
        return prettier.format(toV3(this.rawCode), {
          parser: "html",
          plugins: [parserHtml],
          vueIndentScriptAndStyle: true,
        });
      } catch (error) {
        return this.rawCode;
      }
    },

    prettyCode() {
      try {
        return prettier.format(this.rawCode, {
          parser: "html",
          plugins: [parserHtml],
          vueIndentScriptAndStyle: true,
        });
      } catch (error) {
        return this.rawCode;
      }
    },

    singleIndex() {
      const htmlCode = singleIndexOutput(
        this.rawCode,
        this.checkList,
        this.vueVersion === "3"
      );
      try {
        return prettier.format(htmlCode, {
          parser: "html",
          plugins: [parserHtml],
          vueIndentScriptAndStyle: true,
        });
      } catch (error) {
        return htmlCode;
      }
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
