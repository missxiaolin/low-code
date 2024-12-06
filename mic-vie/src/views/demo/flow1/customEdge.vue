<template>
  <g>
    <!-- path -->
    <path :d="path" fill="none" stroke="#d9d9d9" stroke-width="1" />
    <!-- 箭头markEnd -->
    <path
      :transform="transform"
      :d="`M ${targetX} ${targetY + 1} L ${targetX - 5} ${targetY - 6} L ${
        targetX + 5
      } ${targetY - 6} Z`"
      fill="#d9d9d9"
      stroke="none"
    />
  </g>
</template>

<script>
import { getSmoothStepPath } from "@vue-flow/core";
import { computed } from "vue";
export default {
  props: [
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition",
    "borderRadius",
    "centerX",
    "centerY",
    "offset",
  ],
  setup(props) {
    const path = computed(() => {
      return getSmoothStepPath(props)[0];
    });

    const transform = computed(() => {
      return getArrowTransform(props);
    });

    function getArrowTransform(attrs) {
      const { targetPosition } = attrs;
      if (targetPosition === "top") {
        return `rotate(0 ${attrs.targetX} ${attrs.targetY})`;
      }
      if (targetPosition === "bottom") {
        return `rotate(180 ${attrs.targetX} ${attrs.targetY})`;
      }
      if (targetPosition === "left") {
        return `rotate(-90 ${attrs.targetX} ${attrs.targetY})`;
      }
      if (targetPosition === "right") {
        return `rotate(90 ${attrs.targetX} ${attrs.targetY})`;
      }
    }
    return {
      transform,
      path,
    };
  },
};
</script>
