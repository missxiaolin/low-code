<template>
  <span id="vcc-drawer-wrapper">
    <a-drawer :getContainer="getContainer" v-bind="attrs">
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

    const getContainer = () => {
      return document.getElementById("vcc-drawer-wrapper");
      // return document.body();
    };
    return {
      getContainer,
      attrs,
    };
  },
};
</script>
