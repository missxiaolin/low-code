<template>
  <div class="config-manager-page">
    <div class="config-manager-head">页面设置</div>
    <div class="config-manager-body">
      <ul>
        <li>
          <div class="label">宽度：</div>
          <div class="content-item-content">
            <a-input
              v-model:value="styleObj.width"
              placeholder="请输入宽度"
              @blur="
                (e) => {
                  handleBlur(e, 'style');
                }
              "
            ></a-input>
          </div>
        </li>
        <li>
          <div class="label">高度：</div>
          <div class="content-item-content">
            <a-input
              v-model:value="styleObj.height"
              @blur="
                (e) => {
                  handleBlur(e, 'style');
                }
              "
              placeholder="请输入高度"
            ></a-input>
          </div>
        </li>
        <li>
          <div class="label">背景颜色：</div>
          <div class="content-item-content">
            <vue3-color-picker
              v-model:pureColor="styleObj['background-color']"
              @update:pureColor="(e) => handleBlur(e, 'style')"
            ></vue3-color-picker>
          </div>
        </li>
        <li>
          <div class="label">缩放方式：</div>
          <div class="content-item-content">
            <a-radio-group
              v-model:value="zoomMode"
              @change="(e) => handleBlur(e.target.value, 'zoomMode')"
            >
              <a-radio-button
                v-for="zm in zoomModeOptions"
                :key="zm.value"
                :value="zm.value"
              >
                <a-tooltip>
                  <template #title>{{ zm.label }}</template>
                  <IconFullscreen v-if="zm.value === 'auto'" />
                  <IconAdaptWidth v-else-if="zm.value === 'width'" />
                  <IconAdaptHeight v-else-if="zm.value === 'height'" />
                  <IconFullscreen v-else-if="zm.value === 'full'" />
                  <IconStop v-else />
                </a-tooltip>
              </a-radio-button>
            </a-radio-group>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { styleStringToObj, objectToArray } from "../utils/utils";
import {
  IconFullscreen,
  IconAdaptAuto,
  IconAdaptWidth,
  IconAdaptHeight,
  IconStop,
} from "../../icons/index";

export default {
  components: {
    IconFullscreen,
    IconAdaptAuto,
    IconAdaptWidth,
    IconAdaptHeight,
    IconStop,
  },
  setup() {
    const zoomMode = ref("default");
    const zoomModeOptions = ref([
      { value: "auto", label: "全屏铺满" },
      { value: "width", label: "等比缩放宽度铺满" },
      { value: "height", label: "等比缩放高度铺满" },
      { value: "full", label: "等比缩放高度铺满（可滚动）" },
      { value: "default", label: "不缩放" },
    ]);
    const styleObj = ref({
      "background-color": "",
      height: "",
      position: "",
      width: "",
    });
    const pageConfig = ref({});
    const mainPanelProvider = inject("mainPanelProvider");
    let pageInfo;

    const init = () => {
      const rawDataStructure = mainPanelProvider.getRawDataStructure();
      try {
        pageInfo = rawDataStructure.template.__children[0].div;
      } catch (error) {}
      if (!pageInfo) {
        return;
      }
      styleObj.value = styleStringToObj(pageInfo.style);
      zoomMode.value = pageInfo.zoomMode || "default";
    };

    const handleBlur = (e, key = "") => {
      if (key != "style") {
        pageInfo[key] = e;
        mainPanelProvider.saveAttribute(
          objectToArray(pageInfo),
          pageInfo.lc_id,
          false
        );
        return;
      }
      const style = styleObj.value;
      const cssString = Object.entries(style)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");

      pageInfo.style = cssString;
      mainPanelProvider.saveAttribute(
        objectToArray(pageInfo),
        pageInfo.lc_id,
        false
      );
    };

    onMounted(() => {
      setTimeout(() => {
        init();
      }, 20);
    });

    return {
      pageConfig,
      styleObj,
      handleBlur,
      zoomMode,
      zoomModeOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-item-content {
  flex: 1;
  :deep(svg) {
    fill: #a1aeb3;
    width: 16px;
    height: 16px;
    margin-top: 5px;
  }
}
</style>
