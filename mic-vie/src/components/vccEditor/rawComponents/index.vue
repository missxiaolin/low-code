<template>
  <a-card class="row-container" @click="(e) => e.stopPropagation">
    <div class="row-container-scrollbar">
      <a-tabs class="attribute-tabs" v-model:activeKey="tabActiveName">
        <a-tab-pane tab="组件" key="component">
          <a-collapse
            v-model:activeKey="collapse.activeNames"
            :bordered="false"
            class="row-collapse"
          >
            <a-collapse-panel
              v-for="item in collapse.iconArray"
              :key="item.componentName"
              :header="item.labelName"
              :name="item.componentName"
            >
              <keep-alive>
                <component
                  :is="item.componentName"
                  :asyncComponents="asyncComponents"
                ></component>
              </keep-alive>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
        <a-tab-pane tab="图层" key="structure">
          <a-empty></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="变量" key="data">
          <a-empty></a-empty>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import { ref, reactive } from "vue";
import echartsRow from "./ehcarts/index.vue";
export default {
  components: {
    echartsRow,
  },
  setup(props) {
    const tabActiveName = ref("component");
    const collapse = reactive({
      activeNames: ["echartsRow"],
      iconArray: [
        {
          labelName: "echarts",
          className: "echarts-raw",
          componentName: "echartsRow",
        },
      ],
    });

    return {
      tabActiveName,
      collapse,
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
  .row-container-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .row-container-scrollbar {
    height: 100%;
    overflow-y: scroll;
    padding-right: 16px;
    :deep(.ant-collapse-content-box) {
      padding-right: 0;
    }
  }
  :deep(.ant-card-body) {
    width: 100%;
    padding-right: 0;
    box-sizing: border-box;
    overflow: hidden !important;
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
