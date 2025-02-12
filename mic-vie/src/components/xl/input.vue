<template>
  <div
    :class="{
      'mic-input': true,
      [`${classWrap}`]: true,
    }"
  >
    <a-input v-bind="attrs"></a-input>
    <div class="mic-input-label">{{ label }}</div>
  </div>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micInput",
  props: {
    classWrap: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup() {
    const attrs = useAttrs();

    return {
      attrs,
    };
  },
};
</script>

<style lang="scss" scoped>
.mic-input {
  display: flex;
  flex-direction: column;
  .mic-input-label {
    text-align: left;
    font-size: 12px;
    color: #5c6366;
    margin-top: 5px;
  }
}
</style>

<style lang="scss">
.mic-input {
  &.item-5 {
    width: 47%;
    .ant-input {
      width: 100% !important;
    }
  }
}
</style>
