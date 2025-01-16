<template>
  <div class="async-component-raw">
    <asyncC :asyncComponents="asyncComponents" />
  </div>
</template>
<script>
import { deepLCEle } from "../../utils/initRawComponent";
import asyncC from "./row.vue";

export default {
  props: ["asyncComponents"],
  components: {
    asyncC,
  },
  data() {
    return {};
  },

  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    let countComponentCount = 0;
    deepLCEle(document.querySelector(".async-component-raw"), () => {
      countComponentCount++;
    });
  },
  methods: {},
};
</script>
