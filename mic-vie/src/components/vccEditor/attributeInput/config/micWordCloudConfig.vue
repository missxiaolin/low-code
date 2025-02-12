<template>
  <a-collapse :bordered="false" ghost class="attribute-input-collapse">
    <a-collapse-panel key="style" header="样式">
      <micField label="字体：">
        <a-select
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          v-model:value="config.global.fontFamily"
          :options="fontFamilys"
        ></a-select>
      </micField>
      <micField label="最大字号：">
        <a-input-number v-model:value="config.global.max"></a-input-number>
      </micField>
      <micField label="最小字号：">
        <a-input-number v-model:value="config.global.min"></a-input-number>
      </micField>
      <micField label="旋转范围：" :span="2">
        <a-input-number
          v-model:value="config.global.rotationRange.min"
        ></a-input-number>
        <a-input-number
          v-model:value="config.global.rotationRange.max"
        ></a-input-number>
      </micField>
      <micField label="旋转步长：">
        <a-input-number v-model:value="config.global.rotate"></a-input-number>
      </micField>
    </a-collapse-panel>
    <mic-collapse-panel
      title="系列"
      v-model:value="config.series"
      @addItem="handleAddItem"
      @delItem="handleDelItem"
    >
      <template #default="slotProps">
        <micField label="系列名称：">
          <a-input v-model:value="slotProps.item.name"></a-input>
        </micField>
        <micField label="颜色：">
          <vue3-color-picker
            v-model:pureColor="slotProps.item.color"
            pickerContainer=".attribute-input-collapse"
          ></vue3-color-picker>
        </micField>
      </template>
    </mic-collapse-panel>
    <a-collapse-panel key="tooltip" header="提示框">
      <micField label="是否显示：">
        <a-radio-group v-model:value="config.tooltip.show">
          <a-radio-button :value="true">打开</a-radio-button>
          <a-radio-button :value="false">关闭</a-radio-button>
        </a-radio-group>
      </micField>
      <micField label="字号：">
        <a-input-number
          v-model:value="config.tooltip.textStyle.fontSize"
        ></a-input-number>
      </micField>
      <micField label="字体颜色：">
        <vue3-color-picker
          v-model:pureColor="config.tooltip.textStyle.color"
          pickerContainer=".attribute-input-collapse"
        ></vue3-color-picker>
      </micField>
      <micField label="字体粗细：">
        <a-select
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          v-model:value="config.tooltip.textStyle.fontWeight"
          :options="fontWeights"
        ></a-select>
      </micField>
      <micField label="背景颜色：">
        <vue3-color-picker
          v-model:pureColor="config.tooltip.backgroundColor"
          pickerContainer=".attribute-input-collapse"
        ></vue3-color-picker>
      </micField>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { toRef, inject, watch, ref, watchEffect, onMounted } from "vue";
import { merge } from "lodash-es";
import { wordCloudConfig } from "../../../echarts/config";
import { fontFamilys, fontWeights } from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import {
  styleStringToObj,
  objectToArray,
  attrObjToString,
} from "../../utils/utils";

export default {
  name: "attribute-input-collapse",
  setup(props) {
    const activeKey = ref(["style", "tooltip"]);
    const mainPanelProvider = inject("mainPanelProvider");
    const rawVueInfo = mainPanelProvider.getRawVueInfo();
    let pageInfo = {};
    try {
      pageInfo = rawVueInfo[Object.keys(rawVueInfo)];
    } catch (error) {}
    if (!pageInfo) {
      return;
    }
    let com = merge(
      JSON.parse(JSON.stringify(wordCloudConfig)),
      pageInfo.com || {}
    );

    const config = ref(com);

    watch(config.value, (newVal) => {
      pageInfo[":com"] = attrObjToString(JSON.parse(JSON.stringify(newVal)));
      mainPanelProvider.saveAttribute(
        objectToArray(pageInfo),
        pageInfo.lc_id,
        false
      );
    });

    onMounted(() => {
      //
    });

    const handleAddItem = () => {
      config.value.series.push({
        type: "wordCloud",
        id: `${config.value.series.length}_${uuid(11)}`,
        name: `${config.value.series.length}`,
        color: "#ffffff",
      });
    };

    const handleDelItem = () => {
      if (config.value.series.length === 1) {
        return;
      }
      config.value.series.splice(config.value.series.splice.length, 1);
    };

    return {
      handleAddItem,
      handleDelItem,
      activeKey,
      fontFamilys,
      fontWeights,
      config,
    };
  },
};
</script>

<style scoped lang="scss">
.attribute-input-collapse {
  :deep(.ant-collapse-content-box) {
    padding: 15px 15px 0 15px;
  }
}
</style>

<style lang="scss">
.attribute-input-collapse {
  .ant-collapse-item-active {
    .panel-header-box-right {
      display: block;
    }
  }
}
</style>
