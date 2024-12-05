<template>
  <div class="custom-node">
    <div>开始</div>
    <!-- style="top: 50px; left: 10px" -->
    <Handle
      id="source-a"
      type="source"
      :position="Position.Left"
      style="top: 50px; left: 10px"
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
    console.log(props);

    return {
      Position,
    };
  },
};
</script>

<style>
.custom-node {
  width: 200px;
  height: 50px;
  border: solid 1px #ccc;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  position: relative;
}
</style>
