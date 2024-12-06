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

      <template #edge-custom="props">
        <div>props</div>
        <!-- <CustomEdge v-bind="props" /> -->
      </template>
      <template #connection-line="props">
        <div>props</div>
        <!-- <CustomEdge v-bind="props" /> -->
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
        id: "start",
        type: "start",
        position: { x: 50, y: 50 },
        data: { label: "start", ceshi: 1 },
      },
      {
        id: "1",
        type: "customize",
        position: { x: 100, y: 150 },
        data: { label: "Node 1" },
      },
      {
        id: "2",
        type: "customize",
        position: { x: 150, y: 250 },
        data: { label: "Node 2" },
      },
      {
        id: "end",
        type: "end",
        position: { x: 200, y: 350 },
        data: { label: "end" },
      },
    ]);

    const edges = ref([
      {
        id: "e1->2",
        type: "step",
        source: "start",
        target: "1",
        markerEnd: MarkerType.Arrow,
        style: { stroke: "#d9d9d9", strokeWidth: 1 },
        class: "normal-edge",
      },
      {
        id: "e1->3",
        type: "step",
        source: "start",
        target: "2",
        markerEnd: MarkerType.Arrow,
        style: { stroke: "#d9d9d9", strokeWidth: 1 },
        class: "normal-edge",
      },
      {
        id: "e1->4",
        type: "step",
        source: "start",
        target: "end",
        markerEnd: MarkerType.Arrow,
        style: { stroke: "#d9d9d9", strokeWidth: 1 },
        class: "normal-edge",
      },
      {
        id: "e2->3",
        type: "step",
        source: "1",
        target: "2",
        style: { stroke: "#d9d9d9", strokeWidth: 1 },
        markerEnd: MarkerType.Arrow,
        class: "normal-edge",
      },
      {
        id: "e2->4",
        type: "step",
        source: "2",
        target: "end",
        style: { stroke: "#d9d9d9", strokeWidth: 1 },
        markerEnd: MarkerType.Arrow,
        class: "normal-edge",
      },
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
</style>

<style></style>
