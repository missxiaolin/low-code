<template>
  <span class="xl-a-flex">
    <a-flex v-bind="attrs">
      <slot></slot>
    </a-flex>
  </span>
</template>

<script>
import { useAttrs } from "vue";
export default {
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.xl-a-flex {
  width: auto;
  display: block;
}
</style>
