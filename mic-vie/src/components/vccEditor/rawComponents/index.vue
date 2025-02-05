<template>
  <a-card class="row-container" @click="(e) => e.stopPropagation">
    <div class="row-container-scrollbar">
      <a-tabs
        class="attribute-tabs"
        v-model:activeKey="tabActiveName"
        :tab-position="'left'"
      >
        <a-tab-pane tab="图表" key="component" class="tab-pane-w">
          <barRow />
        </a-tab-pane>
        <a-tab-pane tab="地图" key="map" class="tab-pane-w">
          <a-empty description="尽请期待"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="信息" key="info" class="tab-pane-w">
          <a-empty description="尽请期待"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="表格" key="table" class="tab-pane-w">
          <a-empty description="尽请期待"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="控件" key="widget" class="tab-pane-w">
          <a-empty description="尽请期待"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="媒体" key="media" class="tab-pane-w">
          <a-empty description="尽请期待"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="其他" key="other" class="tab-pane-w">
          <a-empty description="尽请期待"></a-empty>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import { ref, reactive } from "vue";
import barRow from "./ehcarts/index.vue";

export default {
  components: {
    barRow,
  },
  setup(props) {
    const tabActiveName = ref("component");

    return {
      tabActiveName,
    };
  },
};
</script>

<style lang="scss" scoped>
.row-container {
  width: 300px;
  display: flex;
  height: 100%;
  position: relative;
  .tab-pane-w {
    padding: 0 !important;
  }
  .row-container-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .row-container-scrollbar {
    height: 100%;
    overflow-y: scroll;
    :deep(.ant-collapse-content-box) {
      padding-right: 0;
    }
  }
  :deep(.ant-card-body) {
    width: 100%;
    padding-right: 0;
    box-sizing: border-box;
    overflow: hidden !important;
    padding: 0;
  }
  :deep(.ant-collapse) {
    background-color: transparent !important;
  }
  .left-tabs {
    position: relative;
  }
  .icon-box {
    height: 50px;
    position: absolute;
    left: 50px;
    bottom: 0;
    cursor: pointer;
    z-index: 10;
  }
}
.attribute-tabs {
  height: 100%;
  :deep(.ant-empty) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
  :deep(.ant-tabs-content-holder::-webkit-scrollbar) {
    width: 0;
    height: 0;
  }
  :deep(.ant-tabs-content) {
    height: 100%;
  }
  :deep(.ant-tabs-tabpane) {
    height: 100%;
  }
  :deep(.ant-tabs-content-holder) {
    height: 100%;
    overflow-y: scroll;
  }
}
.current-edit-info {
  width: 0px;
  height: 0px;
  overflow: hidden;
}
:deep(.ant-divider-horizontal) {
  margin: 0;
}
.data-ul {
  padding: 0 10px 0 10px;
  margin-top: 20px;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    .data-key {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      div {
        &:nth-child(2) {
          color: #ccc;
        }
      }
    }
    .data-right {
      width: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
