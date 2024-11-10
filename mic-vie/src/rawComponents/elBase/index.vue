<template>
  <div class="element-base-class">
    <eBase></eBase>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import eBase from "./elBase.vue";
import { deepLCEle } from "../../utils/initRawComponent";

export default {
  components: {
    eBase,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector(".element-base-class"), () => {});
  },
};
</script>
