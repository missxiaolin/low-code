<template>
  <div class="attribute-input-collapse"></div>
</template>

<script>
import { barConfig } from "../../../echarts/config";
import {
  fontFamilys,
  selectSuggests,
  echartsLablePositions,
  fontWeights,
  axisTypes,
  titleLocations,
  lineStyles,
  valueFormats,
  timeFormats,
  hAligns,
  legendLocations,
  orients,
  echartIcons,
  fillTypes,
  animationEasings,
} from "../../../../config/select-options";
import { uuid } from "../../utils/utils";
import { rowVueInfo } from "../../../../hooks/rawVueInfo";

export default {
  name: "mic-bar-config",
  setup(props) {
    const { config } = rowVueInfo(barConfig);

    const handleAddItem = () => {
      config.value.series.push({
        type: "bar",
        id: `系列${config.value.series.length}_${uuid(7)}`,
        name: `系列${config.value.series.length}`,
        color: {
          type: "solid",
          value: "#00baff",
          from: "#fff",
          to: "#000",
        },
      });
    };

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
      fontFamilys,
      selectSuggests,
      echartsLablePositions,
      fontWeights,
      axisTypes,
      titleLocations,
      lineStyles,
      valueFormats,
      timeFormats,
      hAligns,
      legendLocations,
      orients,
      echartIcons,
      fillTypes,
      animationEasings,
    };
  },
};
</script>
