<template>
  <div class="chart-container">
    <e-charts ref="chart" theme="dark" :option="option" :autoresize="true" />
  </div>
</template>

<script>
import { computed, toRef, shallowRef, onMounted, watch, ref } from "vue";
import "echarts-wordcloud"; // 引入echarts-wordcloud
import { merge } from "lodash-es";
import { wordCloudConfig } from "./config";
import { echartsConfig } from "../_config/eIndex.js";

export default {
  name: "micWordCloud",
  props: {
    com: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit, expose }) {
    const chart = ref(null);
    const c = merge(wordCloudConfig, props.com.config || {});
    const config = toRef(c);

    const dv_data = computed(() => {
      return props.data && props.data.length > 0
        ? props.data
        : echartsConfig.micWordCloud.source;
    });

    const dv_field = computed(() => {
      return config.value.dvField;
    });

    const option = computed(() => {
      const { global, series, tooltip, animation } = config.value;

      return {
        tooltip: {
          show: tooltip.show,
          borderWidth: 0,
          padding: 10,
          textStyle: {
            ...tooltip.textStyle,
          },
          backgroundColor: tooltip.backgroundColor,
        },
        series: {
          type: "wordCloud",
          shape: global.shape,
          left: "left",
          top: "top",
          right: null,
          bottom: null,
          width: "100%",
          height: "100%",
          sizeRange: [global.min, global.max],
          rotationRange: [global.rotationRange.min, global.rotationRange.max],
          rotationStep: global.rotate,
          gridSize: 8,
          drawOutOfBound: false,
          layoutAnimation: animation.enabled,
          textStyle: {
            fontFamily: global.fontFamily,
            color: (w) => {
              const c = series.find((m) => m.name === w.data.s);
              return c ? c.color : "#fff";
            },
          },
          data: dv_data.value.map((m) => ({
            name: m[dv_field.value.name],
            value: m[dv_field.value.value],
            s: `${m[dv_field.value.type]}`,
          })),
        },
      };
    });

    return {
      chart,
      option,
    };
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
