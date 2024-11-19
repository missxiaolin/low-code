<template>
  <div style="flow-node-box">
    <flowDropDown
      v-if="isShowDropDown"
      :curModel="curModel"
      :menuPosition="menuPosition"
      @onSelect="onSelect"
    />
    <a-drawer
      v-model:open="open"
      title="设置"
      width="30%"
      :key="2"
      placement="right"
      :push="true"
    >
      <settingPanel
        v-if="open"
        :graphRef="graphRef"
        :curModel="curModel"
        :popConfig="curModel"
        @clock="
          open = false;
          curModel = null;
          isShowDropDown = false;
        "
      />
    </a-drawer>
    <div id="mount-node" ref="nodeRef"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import settingPanel from "./setting-panel/index.vue";
import flowDropDown from "./flow-drop-down/index.vue";
import { ref } from "vue";
import { registerNodes } from "./nodes";
import { registerLines } from "./lines/index";
import { defaultLayout } from "./nodes/default-layout";
import { nextTick, onMounted } from "vue";
import { data } from "./flow-node-data/index";
import { cloneDeep } from "lodash-es";
import { getTreeDepth } from "../../utils/utils";
registerNodes();
registerLines();
export default {
  props: {
    pagePata: {
      type: Object,
      default: () => ({}),
    },
    nodeData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    flowDropDown,
    settingPanel,
  },
  setup(props, { emit, expose }) {
    const nodeRef = ref(null);
    const graphRef = ref(null);
    // 菜单
    const curModel = ref(null);
    const menuPosition = ref({});
    const open = ref(false);
    const isShowDropDown = ref(false);

    // 添加新节点
    const onSelect = (key) => {
      const menu = curModel.value.menus?.find((o) => o.key === key);
      const type = menu.nodeType;
      const name = menu.nodeName;
      if (!curModel.value) return;
      const id = `n-${Math.random()}`; // 生成唯一id
      if (!curModel.value.children) {
        curModel.value.children = [];
      }
      let menus = [];
      if (["condition", "action"].includes(type)) {
        menus = [];
      } else if (type === "event") {
        menus = [
          {
            key: "action",
            label: "动作",
            nodeType: "action",
            nodeName: "动作",
            eventKey: menu.eventKey,
          },
          {
            key: "condition",
            label: "条件",
            nodeType: "condition",
            nodeName: "条件",
            eventKey: menu.eventKey,
          },
        ];
      }
      curModel.value.children.push({
        type,
        id,
        label: name,
        key,
        menus,
        conditionId: menu.conditionId,
        eventKey: menu.eventKey,
      });
      graphRef.value.updateChild(curModel.value, curModel.value.id);
      curModel.value = null;
    };

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
                  (o) => o.id === targetModel?.conditionId
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
          const initData =
            Object.keys(props.nodeData).length > 0 ? props.nodeData : data;
          graph.data(cloneDeep(initData));
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

            if (
              ["action", "condition"].includes(model.type) &&
              targetType !== "marker"
            ) {
              curModel.value = item.getModel();
              open.value = true;
              return;
            }
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
              isShowDropDown.value = true;

              const { left, top } =
                nodeRef?.value?.getBoundingClientRect() || {};
              menuPosition.value = {
                top: `${newBox.y + top - 80}px`,
                left: `${newBox.x + left - 30}px`,
              };
            } else if (name === "remove-item") {
              graph.removeChild(model.id);
            }
          });
          graph.on("canvas:click", () => {
            isShowDropDown.value = false;
            curModel.value = null;
          });
        });
      });
    });

    const flowSave = () => {
      return graphRef.value?.save();
    };

    expose({
      flowSave,
    });

    return {
      nodeRef,
      graphRef,
      curModel,
      menuPosition,
      open,
      isShowDropDown,
      onSelect,
    };
  },
};
</script>

<style lang="scss" scoped>
.flow-node-box {
  width: 100%;
  height: 100%;
  position: relative;
  #mount-node {
    width: 100%;
    height: 100%;
  }
}
</style>
