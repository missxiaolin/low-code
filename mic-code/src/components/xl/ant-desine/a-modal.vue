<template>
  <span id="vcc-modal-wrapper">
    <a-modal :getContainer="getContainer" v-bind="attrs">
      <slot></slot>
    </a-modal>
  </span>
</template>

<script>
import { useAttrs } from "vue";

export default {
  name: "micModal",
  setup(props) {
    const attrs = useAttrs();

    const getContainer = () => {
      return document.getElementById("vcc-modal-wrapper");
      // return document.body();
    };

    return {
      getContainer,
      attrs,
    };
  },
};
</script>
