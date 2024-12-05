<template>
  <div class="flow-container">
    <VueFlow :nodes="nodes" :edges="edges" default-marker-color="red">
      <template #node-start="props">
        <startNode v-bind="props"></startNode>
      </template>

      <template #node-end="props">
        <endNode v-bind="props"></endNode>
      </template>
      <!-- <Handle id="a" type="source" :position="Position.Right" /> -->
    </VueFlow>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { VueFlow, Handle, Position } from "@vue-flow/core";
import startNode from "../flow1/startNode.vue";
import endNode from "../flow1/endNode.vue";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

export default {
  components: {
    VueFlow,
    startNode,
    endNode,
  },
  setup(props) {
    const nodes = ref([
      {
        id: "1",
        type: "start",
        position: { x: 50, y: 50 },
        data: { label: "Node 1", ceshi: 1 },
      },
      {
        id: "2",
        type: "end",
        position: { x: 170, y: 150 },
        data: { label: "Node 2" },
      },
      //   {
      //     id: "3",
      //     position: { x: 50, y: 250 },
      //     data: { label: "Node 3" },
      //   },
    ]);

    const edges = ref([
      {
        id: "e1->2",
        type: "special",
        source: "1",
        target: "2",
      },
      //   {
      //     id: "e1->3",
      //     type: "special",
      //     source: "1",
      //     target: "3",
      //   },
      //   {
      //     id: "e2->3",
      //     type: "special",
      //     source: "2",
      //     target: "3",
      //   },
    ]);

    setTimeout(() => {
      nodes.value.push({
        id: "3",
        position: { x: 50, y: 250 },
        data: { label: "Node 3" },
      });
      edges.value.push({
        id: "e1->3",
        type: "special",
        source: "1",
        target: "3",
      });
    }, 3000);
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
