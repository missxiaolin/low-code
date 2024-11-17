<template>
  <div style="flow-node-box">
    <div id="mount-node" ref="nodeRef"></div>
  </div>
</template>

<script lang="ts" setup>
import G6 from "@antv/g6";
import { ref } from "vue";
import { registerNodes } from "./nodes";
import { registerLines } from "./lines/index";
import { defaultLayout } from "./nodes/default-layout";
import { nextTick, onMounted } from "vue";
import { data } from "./flowNodeData/index";
import { cloneDeep } from "lodash-es";
import { getTreeDepth } from "../utils/utils";

const nodeRef = ref(null);
const graphRef = ref(null);
const curModel = ref(null);
registerNodes();
registerLines();

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      const { width } = nodeRef?.value?.getBoundingClientRect() || {};
      const depth = getTreeDepth(data);

      // 创建 G6 图实例
      const graph = new G6.TreeGraph({
        container: nodeRef.value, // 指定图画布的容器 id
        width,
        height: depth * 40 + 56 * (depth - 1) + 200,
        layout: defaultLayout,
        linkCenter: true,
        defaultNode: {
          type: "start",
        },
        animateCfg: {
          duration: 150,
        },
      });

      graph.on("afteradditem", () => {
        const newData = graph.save();
        const depth = getTreeDepth(newData);
        graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200);
      });

      graph.on("afterremoveitem", () => {
        const newData = graph.save();
        const depth = getTreeDepth(newData);
        graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200);
      });

      graph.edge((config) => {
        // 获取线的源节点和目标节点
        const sourceNode = graph.findById(config.source);
        const targetNode = graph.findById(config.target);

        // 获取源节点和目标节点的配置
        const sourceModel = sourceNode?.getModel();
        const targetModel = targetNode?.getModel();

        let label = "";

        // 如果是条件节点，则取条件名称
        if (sourceModel?.type === "condition") {
          const { name } =
            sourceModel?.config?.find(
              (o: any) => o.id === targetModel?.conditionId
            ) || {};
          label = name;
        }
        return {
          type: "flow-line",
          label,
          style: {
            stroke: "#91d5ff",
          },
        };
      });
      // 读取数据
      graph.data(cloneDeep(data));
      // 渲染图
      graph.render();
      graph.fitCenter();

      // 获取开始节点的位置
      const rootNodeBBox = graph.findById("root").getBBox();
      // 获取开始节点在画布上的位置
      const newBox = graph.getCanvasByPoint(rootNodeBBox.x, rootNodeBBox.y);
      // 移动画布到上边距为40的位置
      graph.translate(0, -newBox.y + 40);

      graphRef.value = graph;

      graph.on("node:click", (evt) => {
        const { item, target } = evt;
        const targetType = target.get("type");
        const name = target.get("name");
        const model = item.getModel();
        // 点击加号
        if (targetType === "marker" && name === "add-item") {
          // 获取当前节点的位置
          const itemBox = item.getBBox();
          // 获取当前节点的子节点位置
          const bbox = target.getBBox();
          // 获取当前节点在画布上的位置
          const newBox = graph.getCanvasByPoint(
            bbox.x + itemBox.x + itemBox.width / 2 + 20,
            bbox.y + itemBox.y + itemBox.height / 2 + 6
          );

          curModel.value = item.getModel();

          const { left, top } = nodeRef?.value?.getBoundingClientRect() || {};
          console.log({
            top: newBox.y + top,
            left: newBox.x + left,
          });
        }
      });
      graph.on("canvas:click", () => {});
    });
  });
});
</script>

<style lang="scss" scoped>
.flow-node-box {
  width: 100%;
  height: 100%;
  #mount-node {
    width: 100%;
    height: 100%;
  }
}
</style>
