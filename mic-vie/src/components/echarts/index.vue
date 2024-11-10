<template>
  <div>
    <div class="l-echarts-c" :id="uuid" @click="init">1</div>
  </div>
</template>

<script>
import { uuid } from "../../utils/utils";
import * as echarts from "echarts";

export default {
  data() {
    return {
      uuid: uuid(10),
      myChart: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setTimeout(() => {
        // console.log("this.uuid", this.uuid);
        // 基于准备好的dom，初始化echarts实例

        // console.log("执行了");
        let myChart = echarts.init(
          document.getElementById(`${this.uuid}`),
          "dark",
          {
            width: 600,
            height: 400,
          }
        );
        // console.log(myChart, myChart.getOption());
        // 绘制图表
        myChart.setOption(
          {
            title: {
              text: uuid(10),
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
          },
          true
        );
        this.myChart = myChart;
      }, 100);
    },
  },
};
</script>
