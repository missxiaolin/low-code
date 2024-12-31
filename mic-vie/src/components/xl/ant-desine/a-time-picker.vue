<template>
  <span class="xl-a-time-picker">
    <a-time-picker v-bind="attrs">
      <slot></slot>
    </a-time-picker>
  </span>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micTimePicker",
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.xl-a-time-picker {
  width: auto;
  display: inline-block;
}
</style>
