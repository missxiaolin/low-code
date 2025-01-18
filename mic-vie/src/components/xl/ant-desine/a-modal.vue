<template>
  <div id="vcc-modal-wrapper">
    <a-modal
      :getContainer="false"
      :maskClosable="false"
      :footer="false"
      v-bind="attrs"
    >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
import { useAttrs } from "vue";

export default {
  name: "micModal",
  setup(props) {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>
