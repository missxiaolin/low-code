<template>
  <div class="a-base-class">
    <aBase></aBase>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import aBase from "./a-base.vue";
import { deepLCEle } from "../../utils/initRawComponent";

export default {
  components: {
    aBase,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector(".a-base-class"), () => {});
  },
};
</script>
