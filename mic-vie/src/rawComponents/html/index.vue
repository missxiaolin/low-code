<template>
  <div class="demonstration-raw">
    <rowHtml />
  </div>
</template>
<script>
import { deepLCEle } from "../../utils/initRawComponent";
import rowHtml from "./row.vue";

export default {
  components: {
    rowHtml,
  },
  data() {
    return {};
  },

  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    let countComponentCount = 0;
    deepLCEle(document.querySelector(".demonstration-raw"), () => {
      countComponentCount++;
    });
  },
  methods: {},
};
</script>

