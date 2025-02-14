<template>
  <div class="attribute-input-collapse">
    <template v-if="type == 'component'">
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
            <mic-color v-model:pureColor="slotProps.item.color"></mic-color>
          </micField>
        </template>
      </mic-collapse-panel>
      <mic-panel title="样式">
        <micField label="字体：">
          <mic-select
            v-model:value="config.global.fontFamily"
            :options="fontFamilys"
          ></mic-select>
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
            prefix="度"
          ></mic-number>
          <mic-number
            classWrap="item-5"
            v-model:value="config.global.rotationRange.max"
            prefix="度"
            label="最大值"
          ></mic-number>
        </micField>
        <micField label="旋转步长：">
          <a-input-number v-model:value="config.global.rotate"></a-input-number>
        </micField>
      </mic-panel>
      <mic-panel title="提示框" v-model:checked="config.tooltip.show">
        <micField label="字号：">
          <a-input-number
            v-model:value="config.tooltip.textStyle.fontSize"
          ></a-input-number>
        </micField>
        <micField label="字体颜色：">
          <mic-color
            v-model:pureColor="config.tooltip.textStyle.color"
          ></mic-color>
        </micField>
        <micField label="字体粗细：">
          <mic-select
            v-model:value="config.tooltip.textStyle.fontWeight"
            :options="fontWeights"
          ></mic-select>
        </micField>
        <micField label="背景颜色：">
          <mic-color
            v-model:pureColor="config.tooltip.backgroundColor"
          ></mic-color>
        </micField>
      </mic-panel>
    </template>
    <template v-if="type == 'data'">
      <mic-panel title="字段映射：" :isExpand="true">
        <micField label="name：">
          <a-input v-model:value="config.dvField.name"></a-input>
        </micField>
        <micField label="type：">
          <a-input v-model:value="config.dvField.type"></a-input>
        </micField>
        <micField label="value：">
          <a-input v-model:value="config.dvField.value"></a-input>
        </micField>
      </mic-panel>
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { wordCloudConfig } from "../../../echarts/config";
import { fontFamilys, fontWeights } from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import { rowVueInfo } from "../../../../hooks/rawVueInfo";

export default {
  name: "mic-word-config",
  props: {
    type: {
      type: String,
      default: "component",
    },
  },
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
  :deep(.ant-switch) {
    margin-left: 10px;
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
