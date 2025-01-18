<template>
  <span id="vcc-drawer-wrapper">
    <a-drawer v-bind="attrs">
      <slot></slot>
    </a-drawer>
  </span>
</template>

<script>
import { useAttrs } from "vue";

export default {
  name: "micDrawer",
  setup(props) {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>
