<template>
  <el-dialog
    title="代码预览"
    v-model="dialogVisible"
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
      <el-row>
        <el-col :span="5">
          输出形式：
          <el-radio-group
            v-model="outputMode"
            style="display: flex; flex-direction: column"
          >
            <el-radio label="vue">Vue</el-radio>
            <el-radio label="vue3">Vue3 setup模式</el-radio>
            <!-- <el-radio label="html">单页Html</el-radio> -->
          </el-radio-group>
        </el-col>

        <el-col :span="5" v-if="outputMode === 'html'">
          选择所使用的组件库：
          <el-checkbox-group
            v-model="checkList"
            style="display: flex; flex-direction: column"
          >
            <el-checkbox label="ele">Element UI</el-checkbox>
            <!-- <el-checkbox label="antd">Ant Design</el-checkbox> -->
            <!-- <el-checkbox label="vant">Vant</el-checkbox> -->
          </el-checkbox-group>
        </el-col>
        <el-col :span="4" v-if="outputMode === 'html'">
          选择Vue版本：
          <el-radio-group
            v-model="vueVersion"
            style="display: flex; flex-direction: column"
          >
            <el-radio label="2">Vue 2</el-radio>
            <el-radio label="3">Vue 3</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="10" style="display: flex; flex-direction: column;">
          代码获取方式：
          <div style="margin-top: 10px;display: flex; flex-direction: row;">
            <el-tooltip effect="dark" content="拷贝" placement="left">
              <div
                class="round-icon icon-js"
                alt=""
              >
                <el-icon size="15" @click="copyCheck">
                  <CopyDocument />
                </el-icon>
              </div>
            </el-tooltip>
            <el-tooltip effect="dark" content="下载" placement="right">
              <div
                class="round-icon icon-js"
                alt=""
                @click="codeDialogVisible = true"
              >
                <el-icon size="15" @click="download">
                  <Download />
                </el-icon>
              </div>
            </el-tooltip>
          </div>
          <!-- <div style="margin-top: 10px" v-if="outputMode === 'html'">
            <el-input
              v-model="fileName"
              placeholder="部署文件名"
              style="width: 150px; margin-right: 10px"
              size="small"
            >
            </el-input>
            <el-button
              size="small"
              type="danger"
              :loading="loading"
              @click="release"
            >
              一键部署至VCC静态页面托管服务</el-button
            >
            <div v-if="accessUrl">
              部署成功：<a :href="accessUrl" target="_blank">{{ accessUrl }}</a>
            </div>
          </div> -->
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import "./prism.css";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import copy from "copy-to-clipboard";
import { saveAs } from "file-saver";
import { toV3 } from '../../utils/toV3.js'

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
      if (this.outputMode == 'vue3') {
        return this.v2ToV3
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
