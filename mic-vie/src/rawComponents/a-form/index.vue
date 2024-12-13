<template>
  <div class="a-form-class">
    <row></row>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import row from "./row.vue";
import { deepLCEle } from "../../utils/initRawComponent";

export default {
  components: {
    row,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector(".a-form-class"), () => {});
  },
};
</script>
