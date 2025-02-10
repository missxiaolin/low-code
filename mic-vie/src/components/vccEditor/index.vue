<template>
  <div class="editor-box vcc-main">
    <tools-bar
      class="vcc-tools-bar"
      @showCodeDialogVisible="showCodeDialogVisible"
    >
      <slot name="toole"></slot>
    </tools-bar>
    <div class="vcc-main-content">
      <nav class="base-component-container">
        <raw-components></raw-components>
      </nav>
      <div class="vcc-main-container">
        <div id="editor" class="editor" ref="editorRef">
          <ruler ref="ruleRef" />

          <div class="preview-container">
            <div id="render-control-panel">
              <div
                :class="comJson.class"
                :id="comJson.id"
                :lc_id="comJson.lc_id"
                :style="comJson.style"
              >
                <template
                  v-if="comJson.__children && comJson.__children.length > 0"
                  v-for="item in comJson.__children"
                >
                  <mic-shape v-bind="getAttr(item)" :scale="scale"></mic-shape>
                </template>
              </div>
            </div>
          </div>
        </div>
        <edit-scale :scale="scale" @change="handleScaleChange" />
      </div>
      <attribute-input> </attribute-input>
    </div>
    <lcCode
      v-model:codeDialogVisible="codeDialogVisible"
      :rawCode="dCode"
    ></lcCode>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, computed, provide } from "vue";
import Grid from "./grid.vue";
import vueRuleTool from "../vue-ruler-tool/vue-ruler-tool.vue";
import ruler from "./rule/index.vue";
import editScale from "./components/editScale.vue";
import { MainPanelProvider } from "../../libs/data-main-panel";
import micShape from "./shape/index.vue";
import lcCode from "./components/code.vue";
import { attrStringToObj, attrObjToString, objectToArray } from "./utils/utils";
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
    ruler,
    editScale,
    rawComponents: defineAsyncComponent(() =>
      import("./rawComponents/index.vue")
    ),
    attributeInput: defineAsyncComponent(() =>
      import("./attributeInput/index.vue")
    ),
    toolsBar: defineAsyncComponent(() => import("./toolsBar/index.vue")),
    micShape,
    lcCode,
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
    let codeDialogVisible = ref(false);
    const showCodeDialogVisible = () => {
      codeDialogVisible.value = true;
    };
    let codeRawVueInfo = ref({});
    let comJson = ref({});
    const dCode = ref("");
    // selectInfo
    const currentEditRawInfo = ref(null);
    const ruleRef = ref(null);
    const scale = ref(0.5);
    window.vccScale = scale.value;
    const canvas = ref({
      width: 0,
      height: 0,
      hWidth: 0,
    });

    const mainPanelProvider = new MainPanelProvider();

    const customCss = ref("");
    const JSCode = ref("");
    const customData = ref([]);
    const eventNode = ref(null);

    const editorRef = ref(null);

    const currentPointer = (ele) => {
      // console.log(ele);
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

    const setRule = () => {};

    const init = () => {
      mainPanelProvider
        .onRootElementMounted((rootElement) => {
          document
            .getElementsByTagName("body")[0]
            .addEventListener("click", (e) => {
              mainPanelProvider.clearElementSelect();
            });

          // 渲染完成拿到高度宽度
          const cw = document.documentElement.clientWidth; // 屏幕宽度
          const hWidth = Math.max(rootElement.offsetWidth, cw);
          if (ruleRef.value) {
            canvas.value.scale = scale.value;
            canvas.hWidth = hWidth;
            canvas.value.height = rootElement.offsetHeight + 150;
            canvas.value.width = hWidth;
            ruleRef.value.setHRule(hWidth + 250, canvas.value);
            ruleRef.value.setVRule(canvas.value);
          }
        })
        .onMerged(() => {
          currentPointer(null);
        })
        .onCodeCreated((code) => {
          dCode.value = code;
        })
        .onCodeStructureUpdated((codeRawVueInfo) => {
          comJson.value = codeRawVueInfo.template.__children[0].div;
          codeRawVueInfo.value = codeRawVueInfo;
        })
        .onNodeDeleted(() => {
          currentEditRawInfo.value = null;
        })
        .onSelectElement((rawInfo) => {
          currentEditRawInfo.value = rawInfo;
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
      });
    });

    const handleScaleChange = (v) => {
      window.vccScale = v;
      canvas.value.scale = v;
      scale.value = v;
      ruleRef.value.setHRule(canvas.hWidth, canvas.value);
      ruleRef.value.setVRule(canvas.value);
      const rawInfo = currentEditRawInfo.value;
      mainPanelProvider.asyncReRender();
      if (rawInfo && Object.keys(rawInfo).length > 0) {
        setTimeout(() => {
          mainPanelProvider.selectElement(
            rawInfo[Object.keys(rawInfo)[0]].lc_id
          );
        }, 10);
      }
    };

    provide("mainPanelProvider", mainPanelProvider);

    const getAttr = (item) => {
      const share = item["mic-shape"];
      share["defaultStyle"] = attrStringToObj(share[":defaultStyle"]);

      return share;
    };

    return {
      showCodeDialogVisible,
      codeDialogVisible,
      editorRef,
      ruleRef,
      canvas,
      scale,
      handleScaleChange,
      dCode,
      comJson,
      getAttr,
    };
  },
};
</script>

<style scoped lang="scss">
.editor-box {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .vcc-main-content {
    display: flex;
    flex: 1;
    flex-direction: row;
    overflow: hidden;
  }
  .vcc-tools-bar {
    height: auto;
    width: 100%;
    overflow: hidden;
  }
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
  }
  .editor {
    flex: 1;
    height: 100%;
    position: relative;
    overflow: auto;
    padding-bottom: 100px;
    padding-right: 200px;
    background-image: url("/static/images/bg-canvas.png");
    &::-webkit-scrollbar-track {
      background: transparent !important;
    }
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #434b55;
    }

    &::-webkit-scrollbar-corner {
      display: none;
    }
    &::-webkit-scrollbar-corner {
      display: none; /* 隐藏滚动条角落 */
    }
  }

  .base-component-container {
    border-radius: 0px;
    background-color: var(--search-bg-color);
    position: relative;
    z-index: 99;
  }
}
.vcc-main {
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
  width: fit-content;
  height: fit-content;
  padding: 60px 0 0 60px;
  position: relative;
}
#render-control-panel {
  width: auto;
  height: auto;
  border-radius: 0px;
  box-sizing: border-box;
}
</style>

<style lang="scss">
#render-control-panel {
  & > div {
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 30px 0;
  }
  #vcc-container {
    transform: scale(v-bind(scale)) translate(0px, 0px);
    transform-origin: 0 0;
  }
}
</style>
