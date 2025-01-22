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
            <div id="render-control-panel">
              <!--这里不能放任何东西，执行时会被清空-->
              <div style="width: 100%; height: 100%">
                <shape
                  :defaultStyle="defaultStyle"
                  @change="change"
                  v-if="isShow"
                >
                  <template v-slot:default="slotProps">
                    <component
                      :is="echarts"
                      v-bind="slotProps.value"
                    ></component>
                  </template>
                </shape>
              </div>
            </div>
          </div>
        </vueRuleTool>
      </div>
    </div>
    <attribute-input> </attribute-input>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, nextTick } from "vue";
import shape from "./shape/index.vue";
import Grid from "./grid.vue";
import vueRuleTool from "../vue-ruler-tool/vue-ruler-tool.vue";
import echarts from "../echarts/index.vue";
export default {
  components: {
    shape,
    Grid,
    echarts,
    vueRuleTool,
    rawComponents: defineAsyncComponent(() =>
      import("./rawComponents/index.vue")
    ),
    attributeInput: defineAsyncComponent(() =>
      import("./attributeInput/index.vue")
    ),
    toolsBar: defineAsyncComponent(() => import("./toolsBar/index.vue")),
  },
  setup(props) {
    let isShow = ref(true);
    const vueRuleToolRef = ref(null);
    let defaultStyle = ref({
      top: 20,
      left: 20,
      height: 400,
      width: 600,
    });
    const editorRef = ref(null);

    const change = (data) => {
      if (!data) return;
      isShow.value = false;
      console.log(data);
      defaultStyle.value = data;
      nextTick(() => {
        isShow.value = true;
      });
    };

    onMounted(() => {
      nextTick(() => {
        vueRuleToolRef.value.regenerateScale();
      });
    });

    return {
      editorRef,
      defaultStyle,
      change,
      vueRuleToolRef,
      echarts,
      isShow,
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
  width: 100%;
  min-height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-size: 10px 10px;
  border: 1px solid var(--el-border-color-light);
  position: relative;
  z-index: 99;
}
#render-control-panel {
  min-height: 100%;
  width: 100%;
  border-radius: 0px;
  overflow: hidden;
  box-sizing: border-box;

  transition: width 1s;
  > div {
    min-height: 100%;
  }
}
</style>
