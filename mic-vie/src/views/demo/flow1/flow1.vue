<template>
  <div class="flow-container">
    <VueFlow :nodes="nodes" :edges="edges">
      <template #node-start="props">
        <startNode v-bind="props"></startNode>
      </template>
      <template #node-customize="props">
        <customizeNode v-bind="props"></customizeNode>
      </template>
      <template #node-end="props">
        <endNode v-bind="props"></endNode>
      </template>
    </VueFlow>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { VueFlow, Handle, Position, MarkerType } from "@vue-flow/core";
import startNode from "../flow1/startNode.vue";
import endNode from "../flow1/endNode.vue";
import customizeNode from "./customizeNode.vue";
import customFlowLine from "./customFlowLine.vue";
import customFlowEdge from "./customFlowEdge.vue";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
// https://juejin.cn/post/7399678078357602319?searchId=20241205152138073B8BE74E8D091A8D87

export default {
  components: {
    VueFlow,
    startNode,
    customizeNode,
    endNode,
    customFlowLine,
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
        type: "customize",
        position: { x: 100, y: 150 },
        data: { label: "Node 2" },
      },
      {
        id: "3",
        type: "end",
        position: { x: 150, y: 250 },
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
        type: "step",
        source: "1",
        target: "2",
        markerEnd: MarkerType.Arrow,
        class: "normal-edge",
      },
      {
        id: "e1->3",
        type: "step",
        source: "1",
        target: "3",
        markerEnd: MarkerType.Arrow,
        class: "normal-edge",
      },
      {
        id: "e2->3",
        type: "step",
        source: "2",
        target: "3",
        markerEnd: MarkerType.Arrow,
        class: "normal-edge",
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

    // setTimeout(() => {
    //   nodes.value.push({
    //     id: "3",
    //     position: { x: 50, y: 250 },
    //     data: { label: "Node 3" },
    //   });
    //   edges.value.push({
    //     id: "e1->3",
    //     type: "special",
    //     source: "1",
    //     target: "3",
    //   });
    // }, 3000);
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
  background: rgba(245, 245, 248, 1);
  .btn {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}
.normal-edge {
  path {
    stroke: #d9d9d9;
    stroke-width: 1px;
  }
}
.vue-flow__arrowhead polyline {
  stroke: #d9d9d9 !important;
  stroke-width: 2px !important;
}
</style>
