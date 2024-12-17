<template>
  <div class="vcc-box">
    <div class="main-main">
      <nav class="base-component-container">
        <raw-components
          ref="rawComponents"
          @reRender="render"
          @setCurrentEditRawInfo="setCurrentEditRawInfo"
          :initStructure="codeRawVueInfo"
        ></raw-components>
      </nav>
      <div class="vcc-main-container">
        <!--顶部工具栏-->
        <tools-bar
          @onPreviewModeChange="onPreviewModeChange"
          @onEditModeChange="onEditModeChange"
          @redo="redo"
          @undo="undo"
          @clear="clear"
          @showVueDialogVisible="showVueDialogVisible"
          @showCodeDialogVisible="showCodeDialogVisible"
          @save="save"
        ></tools-bar>
        <vueRuleTool
          :is-scale-revise="true"
          :parent="true"
          :width="'100%'"
          :height="'100%'"
          :isScaleRevise="true"
          ref="vueRuleTool"
        >
          <!-- 内容区域 -->
          <div class="preview-container">
            <div id="render-control-panel">
              <!--这里不能放任何东西，执行时会被清空-->
            </div>
          </div>
        </vueRuleTool>
      </div>
      <!-- 属性设置 -->
      <attribute-input
        :isShowAttribute="isShowAttribute"
        :eventNode="eventNode"
        :enableRemoveButton="true"
        class="attribute"
        @save="onSaveAttr"
        @remove="onRemove"
        @saveEventLogicCode="saveEventLogicCode"
        ref="attributeInput"
        shortcutInitMode="hand"
        :__rawVueInfo__="currentEditRawInfo"
      >
      </attribute-input>
    </div>

    <div>
      <lc-code :rawCode="code" v-model:codeDialogVisible="codeDialogVisible">
      </lc-code>
      <vueCodeEditor
        ref="vueEditor"
        @codeParseSucess="codeParseSucess"
        v-model:vueDialogVisible="vueDialogVisible"
      >
      </vueCodeEditor>
    </div>
    <!-- 辅助定位线 -->
    <div class="cross-flag">
      <div class="x"></div>
    </div>
    <!-- 视图 -->
    <div id="fullScreen" v-if="!editMode">
      <div style="margin: 20px; font-weight: bold">按下ESC退出预览模式</div>
      <div id="mountedEle"></div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
// // 这个文件不可以进行懒加载，它会导致运行时不可点击的行为，具体原因未知
import { MainPanelProvider } from "../libs/main-panel";
import { initContainerForLine } from "@/utils/lineHelper";
import vueRuleTool from "../components/vue-ruler-tool/vue-ruler-tool.vue";
import vueCodeEditor from "../components/vcc/vueCodeEditorDialog.vue";
import keymaster from "keymaster";

export default {
  name: "vcc",
  props: {
    initCodeEntity: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["updateCodeEntity", "onLoadFinish"],
  components: {
    rawComponents: defineAsyncComponent(() =>
      import("../components/vcc/rawComponents.vue")
    ),
    toolsBar: defineAsyncComponent(() => import("./toolsBar")),
    attributeInput: defineAsyncComponent(() =>
      import("../components/vcc/attributeInput")
    ),
    "lc-code": defineAsyncComponent(() => import("../components/vcc/code")),
    vueRuleTool,
    vueCodeEditor,
  },
  data() {
    return {
      eventNode: {},
      currentEditRawInfo: null,
      code: "",
      codeDialogVisible: false,
      jsDialogVisible: false,
      vueDialogVisible: false,

      editMode: true,

      codeRawVueInfo: null,
      JSCode: "",
      customCss: "",

      isShowAttribute: false,
    };
  },
  watch: {
    currentEditRawInfo(newValue) {
      // const attributeContainter = document.querySelector(".attribute");
      if (newValue) {
        this.isShowAttribute = true;
        // this.$refs["attributeInput"].onShow();
      } else {
        this.isShowAttribute = false;
        // this.$refs["attributeInput"].onHide();
      }
    },
    initCodeEntity(newVal) {
      // js
      if (newVal.JSCode) {
        this.mainPanelProvider.saveJSCodeOnly(
          this.convertLogicCode(newVal.JSCode)
        );
      }

      // html
      if (newVal.codeStructure) {
        this.mainPanelProvider.render(newVal.codeStructure);
      }

      // css
      if (newVal.css) {
        this.mainPanelProvider.saveCssCodeOnly(
          this.convertCssLogicCode(newVal.css)
        );
      }
    },
  },
  computed: {},
  beforeCreate() {},
  provide() {
    return {
      vccApp: this,
    };
  },
  created() {
    this.mainPanelProvider = new MainPanelProvider();
  },
  beforeMount() {},
  mounted() {
    this.onPreviewModeChange(this.initCodeEntity.mode == 1 ? false : true);
    Promise.all([import("../map/load")]).then((res) => {
      this.$emit("onLoadFinish");
      this.eventNode = this.initCodeEntity.eventNode;
      this.init();
    });
    // splitInit();
    this.initShortcut();
  },
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  methods: {
    convertLogicCode(JSCode) {
      try {
        let JSCodeInfo = JSCode;
        // 保留JS代码
        this.JSCode = JSCode;
        const fn = () => {
          if (!this.$refs.vueEditor) {
            setTimeout(() => {
              fn();
            }, 20);
            return;
          }
          this.$refs.vueEditor.updateJsCode(JSCode);
        };

        fn();

        return JSCodeInfo;
      } catch (e) {
        console.log(
          `外部逻辑代码解析出错，解析的逻辑代码为: ${JSCode}, Error: ${e}`
        );
      }
    },

    setCurrentEditRawInfo(rawInfo) {
      this.currentEditRawInfo = rawInfo;
      this.isShowAttribute = true;
    },

    // 保存css
    convertCssLogicCode(code) {
      this.$refs.vueEditor.updateCssCode(code);
      this.customCss = code;
      return code;
    },

    initShortcut() {
      keymaster("⌘+z, ctrl+z", () => {
        this.undo();
        return false;
      });

      keymaster("esc", () => {
        this.editMode = true;
        this.mainPanelProvider.setEditMode(true);
        return false;
      });
    },

    init() {
      // 先订阅事件再渲染
      this.mainPanelProvider
        .onRootElementMounted((rootElement) => {
          document
            .getElementsByTagName("body")[0]
            .addEventListener("click", (e) => {
              // this.mainPanelProvider.clearElementSelect();
            });

          // 只针对根div做事件监听
          initContainerForLine(rootElement.firstChild, this.currentPointer);

          document.querySelector(".x").style = "display:none;";
        })
        .onMerged(() => {
          this.currentPointer(null);
        })
        .onCodeCreated((code) => {
          this.code = code;
        })
        .onCodeStructureUpdated((codeRawVueInfo) => {
          if (this.$refs.rawComponents) {
            this.$refs.rawComponents.updateCode(codeRawVueInfo);
          }
          if (this.$refs.vueRuleTool) {
            this.$refs.vueRuleTool.regenerateScale();
          }
          this.codeRawVueInfo = codeRawVueInfo;

          this.notifyParent();
        })
        .onNodeDeleted(() => {
          this.currentEditRawInfo = null;
        })
        .onSelectElement((rawInfo) => {
          this.currentEditRawInfo = rawInfo;
        })
        .saveCssCodeOnly(
          this.convertCssLogicCode(
            this.initCodeEntity.css ? this.initCodeEntity.css : ""
          )
        )
        .saveJSCodeOnly(
          this.convertLogicCode(
            this.initCodeEntity.JSCode ? this.initCodeEntity.JSCode : ""
          )
        )
        .saveEventNode(this.initCodeEntity.eventNode)
        .saveJsData(this.initCodeEntity.customData)
        .render(
          this.initCodeEntity.codeStructure
            ? this.initCodeEntity.codeStructure
            : this.getFakeData()
        );
    },

    // 通知父组件
    notifyParent() {
      this.$emit("updateCodeEntity", {
        codeRawVueInfo: this.codeRawVueInfo,
        JSCode: this.JSCode,
        css: this.customCss,
        eventNode: this.eventNode,
      });
    },

    // 指向将要插入哪个元素之前
    currentPointer(ele, index) {
      this.mainPanelProvider.setDropInfo({
        target: ele,
        index,
      });
    },

    /**获取一个模拟的实体对象 */
    getFakeData() {
      return {
        template: {
          lc_id: "root",
          lc_uuid: "root",
          __children: [
            {
              div: {
                class: "container",
                lc_id: "container",
                lc_uuid: "container",
                style: "min-height: 100%;",
              },
            },
          ],
        },
      };
    },

    onPreviewModeChange(newValue) {
      const previewElem = document.querySelector("#render-control-panel");
      if (newValue) {
        previewElem.style = "width:375px;";
      } else {
        previewElem.style = "width:100%;";
      }
    },

    onEditModeChange(newValue) {
      this.editMode = newValue;

      this.$nextTick(() => {
        this.mainPanelProvider.setEditMode(
          newValue,
          document.querySelector("#mountedEle")
        );
      });
    },

    renderCode() {
      this.mainPanelProvider.reRender();
    },

    clear() {
      this.mainPanelProvider.render(this.getFakeData());
    },

    onSaveAttr({ resultList, lc_id }) {
      this.mainPanelProvider.saveAttribute(resultList, lc_id);
    },

    onRemove({ lc_id }) {
      this.mainPanelProvider.remove(lc_id);
    },

    redo() {
      this.mainPanelProvider.redo();
    },
    undo() {
      this.mainPanelProvider.undo();
    },

    saveJSCode({ JSCodeInfo: code, JSCode }) {
      this.mainPanelProvider.saveJSCode(code);
      // 保留JS代码
      this.JSCode = JSCode;
      this.notifyParent();
    },

    saveCssCode(code) {
      this.mainPanelProvider.saveCssCode(code);
      this.customCss = code;
      this.notifyParent();
    },

    saveEventLogicCode(obj) {
      if (!obj) return;
      this.eventNode = obj;
      this.mainPanelProvider.saveEventNode(obj);
      this.mainPanelProvider.reRender();
      this.notifyParent();
    },

    /**
     * 二级编辑解析
     */
    codeParseSucess(vueCodeEntity, JSCodeInfo, cssCode) {
      if (JSCodeInfo) {
        this.mainPanelProvider.saveJSCode(JSCodeInfo, false);
        // 保留JS代码
        this.JSCode = JSCodeInfo;
      }
      if (cssCode) {
        this.mainPanelProvider.saveCssCode(cssCode, false);
        this.customCss = cssCode;
      }

      if (vueCodeEntity) {
        this.mainPanelProvider.render(vueCodeEntity);
      }

      this.notifyParent();
    },

    /**
     * 渲染指定结构
     */
    render(codeEntity) {
      this.mainPanelProvider.render(codeEntity);
    },

    // vue 二次编辑
    showVueDialogVisible() {
      this.$refs.vueEditor.updateCode(this.code);
      this.vueDialogVisible = true;
    },

    // 显示实时代码
    showCodeDialogVisible() {
      this.codeDialogVisible = true;
    },

    save() {
      this.$emit("save", this.code);
    },
  },
  fillter: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vcc-box {
  width: 100%;
  display: flex;
  max-height: 100vh;
  height: auto;
  overflow: hidden;
}

.main-main {
  width: 100%;
  min-height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: start;
  background-color: var(--search-bg-color);
  overflow: hidden;
}

.base-component-container {
  border-radius: 0px;
  background-color: var(--search-bg-color);
}

.vcc-main-container {
  flex: 1;
  margin: 0px 0px 0 0;
  display: flex;
  max-height: 100vh;
  flex-direction: column;
  overflow: hidden;
  margin: 0 10px 0 10px;
}

.attribute {
  width: 300px;
  z-index: 2;
  box-sizing: border-box;
}

#render-control-panel {
  min-height: 100%;
  width: 100%;
  border-radius: 0px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--search-bg-color);

  transition: width 1s;
  padding: 20px;
  > div {
    min-height: 100%;
  }
}

.preview-container {
  width: 100%;
  min-height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: var(--search-bg-color);
  background-image: radial-gradient(rgba(9, 89, 194, 0.3) 6%, transparent 0),
    radial-gradient(#faf9f8 6%, transparent 0);
  background-size: 10px 10px;
  border: 1px solid var(--el-border-color-light);
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
}

.icon-js {
  line-height: 20px;
  color: white;
  text-align: center;
}

.icon-vue {
  line-height: 20px;
  color: white;
  text-align: center;
}

.cross-flag {
  position: fixed;
  right: 0;
  top: 0;
  .x {
    width: 20px;
    height: 2px;
    position: fixed;
    background-color: #4dba87;
    border-radius: 1px;
    top: 0;
    display: none;
    right: 0;
    pointer-events: none;
  }
  .y {
    width: 2px;
    height: 20px;
    position: fixed;
    background-color: #4dba87;
    top: 0;
    border-radius: 1px;
    display: none;
    right: 0;
    pointer-events: none;
  }
}

#fullScreen {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  background-color: var(--search-bg-color);
  border: 1px solid var(--el-border-color-light);
  overflow: auto;
  z-index: 444;
}

#mountedEle {
  width: 94%;
  border: 1px dashed rgb(126, 126, 128);
  border-radius: 10px;
  margin: 20px;
}
</style>

<!-- 以下的样式作用于渲染容器中-->
<style lang="scss">
#render-control-panel {
  position: relative;

  [div-lc-mark] {
    max-width: 100%;
    border: 1px grey dashed;
    min-height: 1rem;
    border-radius: 5px;
    display: block;
  }

  [lc_id] {
  }

  &::after {
    content: "编辑区域";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 20px;
    color: #d6d6d6;
    pointer-events: none;
  }
}

.mark-element-unit {
  opacity: 0.5;
  outline: red 2px solid;
}
</style>

<style lang="scss">
.icon-s {
  font-size: 14px;
  color: #000;
  margin: 0 2px;
}

:root {
  --animate-duration: 1.5s;
}

.in-element {
  outline: 2px solid #4dba87 !important;
  position: relative;
}

.mark-element {
  outline: 2px solid #4dba87 !important;
  position: relative;
}

.mark-element::before {
  content: attr(lc-component-name) !important;
  background: #4dba87;
  color: white;
  left: 0 !important;
  top: 0 !important;
  transform: translateY(-100%);
  position: absolute;
  font-size: 12px;
  line-height: 12px;
  padding: 1px 2px;
  border-radius: 2px;
}

.light-mark {
  outline: 2px solid #4dba87;
  position: relative;
}

.light-mark::before {
  content: attr(lc-component-name) !important;
  background: #4dba87;
  color: white;
  left: 0 !important;
  top: 0 !important;
  position: absolute;
  font-size: 12px;
  line-height: 12px;
  padding: 1px 2px;
  border-radius: 2px;
}
</style>
