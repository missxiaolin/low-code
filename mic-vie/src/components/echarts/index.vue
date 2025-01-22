<template>
  <e-charts class="chart" :option="option" />
</template>

<script>
import { nextTick, onMounted, ref, watch } from "vue";
import { uuid } from "../../utils/utils";
import * as echarts from "echarts";
export default {
  setup(props) {
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
      nextTick(() => {
        // init();
      });
    });

    return {
      option,
    };
  },
};
</script>

<style lang="scss" scoped>
.mic-echarts-c {
  width: 100%;
  height: 100%;
}
</style>
