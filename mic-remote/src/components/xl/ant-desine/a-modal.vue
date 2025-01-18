<template>
  <span id="vcc-modal-wrapper">
    <a-modal v-bind="attrs" :footer="false">
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

    return {
      getContainer,
      attrs,
    };
  },
};
</script>
