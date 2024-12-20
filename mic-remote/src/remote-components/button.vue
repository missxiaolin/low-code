<template>
  <div class="container">
    <a-button>默认按钮{{ ceshi }}</a-button>
    <a-watermark
      content="xiaolin"
      style="width: 500px; height: 400px"
    ></a-watermark>
  </div>
</template>

<script>
import { toRefs, onMounted, getCurrentInstance } from "vue";
export default {
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const $data = toRefs({
      ceshi: 1,
    });
    const $events = {};

    // 执行事件流
    const eventFun = (eventStr, e) => {
      if (!eventStr) return;
      const eventObj = JSON.parse(eventStr);
      instance.proxy.$execEventFlow(instance, eventObj, e);
    };

    const pagesInit = (str) => {
      console.log("pagesInit", str);
      console.log(instance);
      console.log(instance.proxy.$execEventFlow);
      if (!str || $events[str]) return;
      const eventObj = $events[str];
      eventFun(eventObj, null);
    };

    onMounted(() => {
      pagesInit("init");
    });

    return {
      ...$data,
      eventFun,
    };
  },
};
</script>

<style scoped>
.container {
}
</style>
