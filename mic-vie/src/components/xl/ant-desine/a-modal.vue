<template>
  <div id="vcc-modal-wrapper">
    <a-modal
      v-bind="attrs"
      :getContainer="false"
      :maskClosable="false"
      :footer="false"
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
