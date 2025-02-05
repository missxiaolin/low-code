<template>
  <div class="slider-box">
    <a-slider
      v-model:value="sliderValue"
      :max="1"
      :step="0.1"
      :min="0.1"
      :tip-formatter="formatter"
      @change="change"
    />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "editScale",
  props: {
    scale: {
      type: Number,
      default: 1,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const sliderValue = ref(props.scale);

    const formatter = (value) => {
      return `${value * 100}%`;
    };

    const change = (v) => {
      emit("change", v);
    };

    return {
      sliderValue,
      formatter,
      change,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider-box {
  z-index: 99;
  display: flex;
  width: 100%;
  height: 32px;
  background: #222528;
  box-shadow: 0 -1px #000;
  user-select: none;
  align-items: center;
  justify-content: flex-end;
  :deep(.ant-slider) {
    width: 200px;
    margin-right: 30px;
  }
}
</style>
