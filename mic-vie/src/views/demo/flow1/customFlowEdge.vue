<template>
  <div>
    <path
      :id="id"
      :style="style"
      class="vue-flow__edge-path"
      :d="path[0]"
      :marker-end="markerEnd"
    />

    <EdgeLabelRenderer>
      <div
        :style="{
          pointerEvents: 'all',
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }"
        class="nodrag nopan"
      >
        <button class="edgebutton" @click="removeEdges(id)">×</button>
      </div>
    </EdgeLabelRenderer>
  </div>
</template>

<script>
import { EdgeLabelRenderer, getBezierPath, useVueFlow } from "@vue-flow/core";
import { computed } from "vue";
export default {
  props: [
    "id",
    "sourceX",
    "sourceY",
    "targetX",
    "targetY",
    "sourcePosition",
    "targetPosition",
    "data",
    "markerEnd",
    "style",
  ],
  components: {
    EdgeLabelRenderer,
  },
  setup(props) {
    const { removeEdges } = useVueFlow();

    const path = computed(() => getBezierPath(props));

    return {
      removeEdges,
      path,
    };
  },
};
</script>
