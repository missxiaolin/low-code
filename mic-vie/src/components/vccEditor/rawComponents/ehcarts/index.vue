<template>
  <div class="echarts-raw">
    <rowEchart />
  </div>
</template>
<script>
import { onMounted } from "vue";
import { deepLCEle } from "../../utils/initRawComponent";
import rowEchart from "./row.vue";

export default {
  components: {
    rowEchart,
  },
  emits: ["mounted"],
  setup(props, { emit }) {
    onMounted(() => {
      emit("mounted");
      // 对所有拥有lc-mark的元素进行初始化
      let countComponentCount = 0;
      deepLCEle(document.querySelector(".echarts-raw"), () => {
        countComponentCount++;
      });
    });
  },
};
</script>
