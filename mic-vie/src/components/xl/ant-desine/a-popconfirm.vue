<template>
  <span class="xl-a-popconfirm">
    <a-popconfirm v-bind="attrs">
      <slot></slot>
    </a-popconfirm>
  </span>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micPopconfirm",
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.xl-a-popconfirm {
  width: auto;
  display: block;
}
</style>
