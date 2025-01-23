<template>
  <div ref="chartContainer" class="chart-container">
    <e-charts ref="chart" theme="dark" :option="option" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
]);

export default {
  name: "micBar",
  setup() {
    const chartContainer = ref(null);
    const chart = ref(null);

    const option = {
      title: {
        text: "柱状图",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    const resizeObserver = new ResizeObserver(() => {
      if (chart.value) {
        chart.value.resize();
      }
    });

    onMounted(() => {
      if (chartContainer.value) {
        resizeObserver.observe(chartContainer.value);
      }
    });

    onUnmounted(() => {
      if (chartContainer.value) {
        resizeObserver.unobserve(chartContainer.value);
      }
    });

    return {
      chartContainer,
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
