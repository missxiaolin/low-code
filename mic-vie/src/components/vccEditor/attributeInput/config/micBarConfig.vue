<template>
  <a-collapse :bordered="false" ghost class="attribute-input-collapse">
  </a-collapse>
</template>

<script>
import { ref, onMounted } from "vue";
import { barConfig } from "../../../echarts/config";
import {
  fontFamilys,
  fontWeights,
  axisTypes,
  selectSuggests,
  titleLocations,
  lineStyles,
  valueFormats,
  timeFormats,
  hAligns,
  legendLocations,
  orients,
  echartIcons,
  animationEasings,
} from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import { rowVueInfo } from "../../../../hooks/rawVueInfo";

export default {
  name: "mic-bar-config",
  setup(props) {
    const { config } = rowVueInfo(barConfig);

    const handleAddItem = () => {};

    const handleDelItem = () => {
      if (config.value.series.length === 1) {
        return;
      }
      config.value.series.splice(config.value.series.splice.length, 1);
    };

    return {
      config,
      handleAddItem,
      handleDelItem,
      fontWeights,
      axisTypes,
      selectSuggests,
      titleLocations,
      lineStyles,
      valueFormats,
      timeFormats,
      hAligns,
      legendLocations,
      orients,
      echartIcons,
      animationEasings,
    };
  },
};
</script>
