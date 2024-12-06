<template>
  <div class="custom-node" @click="add">
    <div>自定义内容</div>
    <Handle
      id="source-a"
      type="target"
      :position="Position.Left"
      style="opacity: 0"
    />
    <Handle
      id="source-a"
      type="source"
      :position="Position.Left"
      style="top: 40px; left: 30px; opacity: 0"
    />
  </div>
</template>

<script>
import { Handle, Position } from "@vue-flow/core";

export default {
  components: { Handle },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // console.log(props);
    const add = () => {
      console.log("add");
    };

    return {
      Position,
      add,
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-node {
  width: 200px;
  height: 50px;
  border: solid 1px #ccc;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  position: relative;
  &:hover {
    border: 1px solid #e26400;
    background: #fff;
  }
}
</style>
