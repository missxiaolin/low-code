<template>
  <div class="chart-container">
    <e-charts ref="chart" :theme="theme" :option="option" :autoresize="true" />
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
    theme: {
      type: String,
      default: "light", // dark
    },
    com: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit, expose }) {
    const chart = ref(null);
    const c = merge(wordCloudConfig, props.com || {});

    const config = ref(c);

    const dv_data = computed(() => {
      return props.data && Object.keys(props.data).length > 0
        ? props.data.source
        : echartsConfig.micWordCloud.source;
    });

    const dv_field = computed(() => {
      return config.value.dvField;
    });

    const option = ref({});

    const init = () => {
      const { global, series, tooltip, animation } = config.value;

      option.value = {
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
    };

    onMounted(() => {
      init();
    });

    watch(
      () => props.com,
      (newVal) => {
        if (!newVal) return;
        config.value = merge(wordCloudConfig, newVal || {});
        init();
      },
      {
        immediate: true,
        deep: true,
      }
    );

    watch(
      () => props.data,
      (newVal) => {
        if (!newVal) return;
        init();
      },
      {
        immediate: true,
        deep: true,
      }
    );

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
