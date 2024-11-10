<template>
  <div class="l-custom">
    <lRow></lRow>
  </div>
</template>

<script>
import lRow from "./row.vue";
import { deepLCEle } from "../../utils/initRawComponent";
export default {
  components: {
    lRow,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector(".l-custom"), () => {});
  },
};
</script>
