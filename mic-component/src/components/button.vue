<template>
  <div id="css-modules-div">
    <a-button>Button with style</a-button>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
export default {
  components: {
    "a-button": Button,
    setup(props) {},
  },
};
</script>
<style scoped lang="scss">
.powderblue {
  color: powderblue;
}
</style>
