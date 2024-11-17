<template>
  <a-drawer
    v-model:open="open"
    title="事件流配置"
    placement="right"
    @after-open-change="afterOpenChange"
    width="100%"
  >
    <div class="node-viewer">
      <!-- <div class="flow-desc">
        <p>1. 事件流从左到右按顺序执行。</p>
        <p>
          2.
          参数会在事件流中流转，比如点击表格的编辑按钮，事件流默认可以取到表格对应的行数据对象，传递到下一个节点。
        </p>
        <p>3. 可以通过脚本运行来干预数据输出和下一个节点的流转。</p>
        <p>
          4.
          获取表单数据时，可以直接点开行为配置，点击获取表单值，选择对应表单即可。
        </p>
      </div> -->
      <flowNode></flowNode>
    </div>
  </a-drawer>
</template>

<script>
import flowNode from "../../components/flow-node/flowNode.vue";
export default {
  components: {
    flowNode,
  },
  data() {
    return {
      open: true,
    };
  },
  methods: {
    afterOpenChange() {
      //   console.log("afterOpenChange");
    },
  },
};
</script>

<style lang="scss" scoped>
.node-viewer {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      circle,
      rgba(185, 185, 185, 0.5) 1px,
      transparent 1px
    ),
    radial-gradient(circle, rgba(0, 0, 0, 0.5) 1px, transparent 1px);
  background-size: 20px 20px;
  background-repeat: repeat;
  position: relative;
  .flow-desc {
    position: absolute;
    top: 50px;
    left: 30px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 12px;
    background: #f8f0ff;
    border: solid 2px #d3adff;
    padding: 20px 24px;
    border-radius: 10px;
  }
}
</style>
