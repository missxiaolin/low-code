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
        <mic-number
          classWrap="item-5"
          v-model:value="config.global.rotationRange.min"
          label="最小值"
        ></mic-number>
        <mic-number
          classWrap="item-5"
          v-model:value="config.global.rotationRange.max"
          label="最大值"
        ></mic-number>
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
import { ref, onMounted } from "vue";
import { wordCloudConfig } from "../../../echarts/config";
import { fontFamilys, fontWeights } from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import { rowVueInfo } from "../../../../hooks/rawVueInfo";

export default {
  name: "attribute-input-collapse",
  setup(props) {
    const { config } = rowVueInfo(wordCloudConfig);

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
