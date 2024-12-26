<template>
  <span class="xl-a-image">
    <a-image v-bind="attrs">
      <slot></slot>
    </a-image>
  </span>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micImage",
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.xl-a-image {
  width: auto;
  display: block;
}
</style>
