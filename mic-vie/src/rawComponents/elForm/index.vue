<template>
  <div class="element-form-class">
    <eForm></eForm>
  </div>
</template>
<script>
import eForm from "./eForm.vue";
import { deepLCEle } from "../../utils/initRawComponent";

export default {
  components: {
    eForm,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit("mounted");
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector(".element-form-class"), () => {});
  },
};
</script>
