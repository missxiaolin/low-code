<template>
  <div
    :class="{
      'mic-color': true,
      [`${classWrap}`]: true,
    }"
  >
    <vue3-color-picker
      v-bind="attrs"
      :pickerContainer="pickerContainer"
    ></vue3-color-picker>
    <div class="mic-color-label">{{ label }}</div>
  </div>
</template>

<script>
import { useAttrs } from "vue";
export default {
  name: "micColor",
  props: {
    classWrap: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    pickerContainer: {
      type: String,
      default: ".attribute-input-collapse",
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
.mic-color {
  display: flex;
  flex-direction: column;
  .mic-color-label {
    text-align: left;
    font-size: 12px;
    color: #5c6366;
    margin-top: 5px;
  }
}
</style>

<style lang="scss">
.mic-color {
  &.item-5 {
    width: 47%;
  }
}
</style>
