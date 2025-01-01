<template>
  <svg :class="svgClass" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
    },
    svgStyle: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });

    const svgClass = computed(() => {
      if (props.className) {
        return "svg-icon " + props.className;
      } else {
        return "svg-icon";
      }
    });

    return {
      iconName,
      svgClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
