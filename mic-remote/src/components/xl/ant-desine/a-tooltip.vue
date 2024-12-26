<template>
  <span class="xl-a-tooltip">
    <a-tooltip v-bind="attrs">
      <slot></slot>
    </a-tooltip>
  </span>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micTooltip",
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.xl-a-tooltip {
  width: auto;
  display: block;
}
</style>
