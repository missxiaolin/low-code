<template>
  <div id="vcc-drawer-wrapper">
    <a-drawer v-bind="attrs" :getContainer="getContainer" :maskClosable="false">
      <slot></slot>
    </a-drawer>
  </div>
</template>

<script>
import { useAttrs } from "vue";

export default {
  name: "micDrawer",
  setup(props) {
    const attrs = useAttrs();

    const getContainer = () => {
      return document.getElementById("vcc-drawer-wrapper");
    };
    return {
      getContainer,
      attrs,
    };
  },
};
</script>
