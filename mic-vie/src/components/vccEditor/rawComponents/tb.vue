<template>
  <a-tabs
    :tab-position="'left'"
    type="card"
    class="components-tab"
    v-model:activeKey="tabActiveName"
  >
    <a-tab-pane v-for="item in collapse" :tab="item.labelName" :key="item.key">
      <template v-if="item.key === tabActiveName">
        <component
          v-if="item.componentName"
          :is="item.componentName"
          :asyncComponents="asyncComponents"
        ></component>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref, reactive } from "vue";
import barRow from "./ehcarts/index.vue";

export default {
  components: {
    barRow,
  },
  setup() {
    const tabActiveName = ref("bar");
    const collapse = reactive([
      {
        labelName: "柱状图",
        key: "bar",
        className: "echarts-raw",
        componentName: "barRow",
      },
      {
        labelName: "条形图",
        key: "t",
        className: "echarts-raw",
        // componentName: "echartsRow",
      },
      {
        labelName: "折线图",
        key: "z",
        className: "echarts-raw",
        // componentName: "echartsRow",
      },
      {
        labelName: "区域图",
        key: "q",
        className: "echarts-raw",
        // componentName: "echartsRow",
      },
    ]);

    return {
      tabActiveName,
      collapse,
    };
  },
};
</script>

<style lang="scss" scoped>
.components-tab {
  padding: 0 !important;
  height: 100% !important;
  :deep(.ant-tabs) {
    height: 100% !important;
  }
  :deep(.ant-tabs-nav) {
    background-color: rgba(29, 29, 29);
    border: none !important;
  }
  :deep(.ant-tabs-tab) {
    background-color: rgba(29, 29, 29);
    &.ant-tabs-tab-active {
      background-color: #141414;
    }
  }
  :deep(.ant-tabs-tabpane) {
    padding: 0 !important;
  }
  :deep(.ant-tabs-content-holder) {
    border: none !important;
  }
  :deep(.ant-tabs-content) {
    border: none !important;
  }
  :deep(.ant-tabs-tab) {
    margin-top: 0px !important;
    border: none;
    border-radius: 0px !important;
  }
}
</style>
