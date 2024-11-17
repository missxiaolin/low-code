<template>
  <a-drawer
    v-model:open="open"
    :contentWrapperStyle="{ transform: 'translateX(0)' }"
    :mask="false"
    title="事件流配置"
    placement="right"
    @after-open-change="afterOpenChange"
    width="100%"
  >
    <div class="node-viewer">
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
