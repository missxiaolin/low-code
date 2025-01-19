<template>
  <div id="vcc-modal-wrapper">
    <a-modal
      v-bind="attrs"
      :getContainer="false"
      :maskClosable="false"
      :footer="false"
      @cancel="onCancel"
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

    const onCancel = (e) => {
      window.$mt = "";
    };

    return {
      attrs,
      onCancel,
    };
  },
};
</script>
