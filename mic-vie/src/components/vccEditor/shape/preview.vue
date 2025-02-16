<template>
  <div
    class="shape"
    ref="shapeRef"
    :style="{
      top: `${defaultStyle.top}px`,
      left: `${defaultStyle.left}px`,
      width: `${defaultStyle.width}px`,
      height: `${defaultStyle.height}px`,
    }"
  >
    <component :is="vccComponentName" v-bind="attrs"></component>
  </div>
</template>

<script>
import { ref, toRefs, toRef, useAttrs, watch, onMounted, inject } from "vue";
export default {
  name: "micShape",
  props: {
    defaultStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    vccComponentName: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const attrs = useAttrs();
    const shapeRef = ref(null);
    onMounted(() => {});

    return {
      shapeRef,
      attrs,
    };
  },
};
</script>

<style scoped lang="scss">
.shape {
  position: absolute;
  left: 0;
  top: 0;
}

.mark-element {
  .shape-point {
    position: absolute;
    z-index: 10;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 9999px;
    border-width: 1px;
    border-style: solid;
    --tw-border-opacity: 1;
    border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
    margin-left: -4px;
    margin-top: -4px;
  }

  .shape-point.lt,
  .shape-point.t,
  .shape-point.rt,
  .shape-point.r,
  .shape-point.rb,
  .shape-point.b,
  .shape-point.lb,
  .shape-point.l {
    cursor: nwse-resize;
  }

  .shape-point.t,
  .shape-point.b {
    cursor: ns-resize;
  }

  .shape-point.l,
  .shape-point.r {
    cursor: ew-resize;
  }

  .shape-point.lb,
  .shape-point.rt {
    cursor: nesw-resize;
  }
}
</style>

<style>
.mark-element {
  outline: 1px solid #70c0ff !important;
}
</style>
