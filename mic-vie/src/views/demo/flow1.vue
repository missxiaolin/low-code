<template>
  <div class="flow-container">
    <VueFlow :nodes="nodes" :edges="edges"> </VueFlow>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { VueFlow } from "@vue-flow/core";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

export default {
  components: {
    VueFlow,
  },
  setup(props) {
    const nodes = ref([
      {
        id: "1",
        position: { x: 50, y: 50 },
        data: { label: "Node 1" },
      },
      {
        id: "2",
        position: { x: 170, y: 150 },
        data: { label: "Node 2" },
      },
      {
        id: "3",
        position: { x: 50, y: 250 },
        data: { label: "Node 3" },
      },
    ]);

    const edges = ref([
      {
        id: "e1->2",
        source: "1",
        target: "2",
      },
      {
        id: "e1->3",
        source: "1",
        target: "3",
      },
      {
        id: "e2->3",
        source: "2",
        target: "3",
      },
    ]);

    return {
      nodes,
      edges,
    };
  },
};
</script>

<style lang="scss" scoped>
.flow-container {
  width: 100%;
  height: 100vh;
  position: relative;
  .btn {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
</style>
