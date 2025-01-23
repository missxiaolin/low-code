<template>
  <div ref="chartContainer" class="chart-container">
    <e-charts ref="chart" theme="dark" :option="option" :autoresize="true" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

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

    onMounted(() => {
      if (chartContainer.value) {
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
