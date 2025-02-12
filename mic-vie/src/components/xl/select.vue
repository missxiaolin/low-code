<template>
  <div
    :class="{
      'mic-select': true,
      [`${classWrap}`]: true,
    }"
  >
    <a-select v-bind="attrs"></a-select>
    <div class="mic-select-label">{{ label }}</div>
  </div>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micSelect",
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
.mic-select {
  display: flex;
  flex-direction: column;
  .mic-select-label {
    text-align: left;
    font-size: 12px;
    color: #5c6366;
    margin-top: 5px;
  }
}
</style>

<style lang="scss">
.mic-select {
  &.item-5 {
    width: 47%;
    .ant-select {
      width: 100% !important;
    }
  }
}
</style>
