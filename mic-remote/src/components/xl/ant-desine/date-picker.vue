<template>
  <span class="xl-data-picker-box">
    <a-date-picker v-bind="attrs"></a-date-picker>
  </span>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micDatePicker",
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.xl-data-picker-box {
  width: auto;
  display: block;
}
</style>
