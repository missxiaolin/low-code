<template>
  <div class="editor-box vcc-main">
    <nav class="base-component-container">
      <raw-components></raw-components>
    </nav>
    <div class="vcc-main-container">
      <tools-bar>
        <slot name="toole"></slot>
      </tools-bar>
      <div id="editor" class="editor" ref="editorRef">
        <!-- 网格线 -->
        <!-- <Grid /> -->
        <!-- 拖拽 -->
        <vueRuleTool
          :is-scale-revise="true"
          :parent="true"
          :width="'100%'"
          :height="'100%'"
          :isScaleRevise="true"
          ref="vueRuleToolRef"
        >
          <!-- 内容区域 -->
          <div class="preview-container">
            <div id="render-control-panel"></div>
          </div>
        </vueRuleTool>
      </div>
    </div>
    <attribute-input> </attribute-input>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, nextTick } from "vue";
import Grid from "./grid.vue";
import vueRuleTool from "../vue-ruler-tool/vue-ruler-tool.vue";
import { MainPanelProvider } from "../../libs/data-main-panel";
const getFakeData = () => {
  return {
    template: {
      lc_id: "root",
      __children: [
        {
          div: {
            class: "container",
            lc_id: "container",
            style: "min-height: 100%;",
          },
        },
      ],
    },
  };
};
export default {
  components: {
    Grid,
    vueRuleTool,
    rawComponents: defineAsyncComponent(() =>
      import("./rawComponents/index.vue")
    ),
    attributeInput: defineAsyncComponent(() =>
      import("./attributeInput/index.vue")
    ),
    toolsBar: defineAsyncComponent(() => import("./toolsBar/index.vue")),
  },
  props: {
    initCodeEntity: {
      type: Object,
      default: () => {
        return {};
      },
    },
    asyncComponents: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const mainPanelProvider = new MainPanelProvider();
    const customCss = ref("");
    const JSCode = ref("");
    const customData = ref([]);
    const eventNode = ref(null);

    const vueRuleToolRef = ref(null);
    const editorRef = ref(null);

    const currentPointer = (ele) => {
      console.log(ele);
    };

    const convertCssLogicCode = (code) => {
      customCss.value = code;
      return code;
    };

    const convertLogicCode = (JsCode) => {
      try {
        let JSCodeInfo = JsCode;
        // 保留JS代码
        JSCode.value = JsCode;

        return JSCodeInfo;
      } catch (e) {
        console.log(
          `外部逻辑代码解析出错，解析的逻辑代码为: ${JsCode}, Error: ${e}`
        );
      }
    };

    const convertDataLogic = (arr, isRenderCode = false) => {
      let obj = {};
      customData.value = arr || [];
      arr.forEach((item) => {
        if (["string", "array", "object"].includes(item.key)) {
          obj[item.key] = item.value;
        } else if (item.key === "string") {
          obj[item.key] = item.value;
        } else if (item.key === "number") {
          obj[item.key] = Number(item.value);
        } else if (item.key === "boolean") {
          obj[item.key] =
            item.value === "true" || item.value === true ? true : false;
        } else {
          obj[item.key] = item.value;
        }
      });
      if (isRenderCode) {
        mainPanelProvider.saveJsData(obj);
        this.renderCode();
      }

      return obj;
    };

    const init = () => {
      mainPanelProvider
        .onRootElementMounted((rootElement) => {})
        .onMerged(() => {
          currentPointer(null);
        })
        .onCodeCreated((code) => {
          // console.log(code);
          // this.code = code;
        })
        .onCodeStructureUpdated((codeRawVueInfo) => {
          // if (this.$refs.rawComponents) {
          //   this.$refs.rawComponents.updateCode(codeRawVueInfo);
          // }
          // if (this.$refs.vueRuleTool) {
          //   this.$refs.vueRuleTool.regenerateScale();
          // }
          // this.codeRawVueInfo = codeRawVueInfo;
          // this.notifyParent();
        })
        .onNodeDeleted(() => {
          // this.currentEditRawInfo = null;
        })
        .onSelectElement((rawInfo) => {
          // this.currentEditRawInfo = rawInfo;
        })
        .saveCssCodeOnly(
          convertCssLogicCode(
            props.initCodeEntity.css ? props.initCodeEntity.css : ""
          )
        )
        .saveJSCodeOnly(
          convertLogicCode(
            props.initCodeEntity.JSCode ? props.initCodeEntity.JSCode : ""
          )
        )
        .saveEventNode(props.initCodeEntity.eventNode)
        .saveJsData(convertDataLogic(props.initCodeEntity.customData || []))
        .render(
          props.initCodeEntity.codeStructure
            ? props.initCodeEntity.codeStructure
            : getFakeData()
        );
      window.vccMainPanelProvider = mainPanelProvider;
    };

    onMounted(() => {
      Promise.all([import("../../map/load")]).then((res) => {
        init();
        eventNode.value = props.initCodeEntity.eventNode;
        nextTick(() => {
          vueRuleToolRef.value.regenerateScale();
        });
      });
    });

    return {
      editorRef,
      vueRuleToolRef,
    };
  },
};
</script>

<style scoped lang="scss">
.editor-box {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
  :deep(.vue-ruler-wrapper) {
    overflow-x: auto;
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
  .editor {
    flex: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .base-component-container {
    border-radius: 0px;
    background-color: var(--search-bg-color);
  }
}
.vcc-main {
  padding: 10px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.editor .component {
  position: static !important;
}
.div {
  width: 100%;
  height: 100%;
  border: solid 1px #fff;
}
.preview-container {
  position: relative;
}
#render-control-panel {
  min-height: 100%;
  border-radius: 0px;
  box-sizing: border-box;

  transition: width 1s;
  > div {
    min-height: 100%;
  }
}
</style>
