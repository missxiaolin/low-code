<template>
  <div id="vcc-drawer-wrapper">
    <a-drawer
      v-bind="attrs"
      :getContainer="getContainer"
      :maskClosable="false"
      @cancel="onCancel"
    >
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
    const onCancel = (e) => {
      window.$mt = "";
    };

    return {
      getContainer,
      onCancel,
      attrs,
    };
  },
};
</script>
