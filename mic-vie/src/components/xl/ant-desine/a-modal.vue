<template>
  <a-modal :getContainer="getContainer" v-bind="attrs">
    <slot></slot>
  </a-modal>
</template>

<script>
import { useAttrs } from "vue";

export default {
  name: "micModal",
  setup(props) {
    const attrs = useAttrs();

    const getContainer = () => {
      if (document.getElementById("mountedEle")) {
        return document.getElementById("mountedEle");
      }
      if (document.getElementById("render-control-panel")) {
        return document.getElementById("render-control-panel");
      }

      return document.body();
    };

    return {
      getContainer,
      attrs,
    };
  },
};
</script>
