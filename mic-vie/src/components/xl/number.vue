<template>
  <div
    :class="{
      'mic-number': true,
      [`${classWrap}`]: true,
    }"
  >
    <a-input-number v-bind="attrs"></a-input-number>
    <div class="mic-number-label">{{ label }}</div>
  </div>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micNumber",
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
.mic-number {
  display: flex;
  flex-direction: column;
  :deep(.ant-input-number-affix-wrapper) {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  :deep(.ant-input-number-prefix) {
    order: 2;
    margin-right: 25px;
    color: #5c6366;
  }
  :deep(.ant-input-number-handler-wrap) {
    right: -37px;
    opacity: 1;
  }
  .mic-number-label {
    text-align: left;
    font-size: 12px;
    color: #5c6366;
    margin-top: 5px;
  }
}
</style>

<style lang="scss">
.mic-number {
  &.item-5 {
    width: 47%;
    .ant-input-number {
      width: 100% !important;
    }
  }
}
</style>
