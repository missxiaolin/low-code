<template>
  <a-card
    class="attribute-container"
    @click="
      (e) => {
        e.stopPropagation();
      }
    "
  >
    <div v-if="currentEditRawInfo">
      <a-tabs
        v-model:activeKey="activeKey"
        class="attribute-tabs"
        :destroyInactiveTabPane="true"
      >
        <a-tab-pane key="settings" tab="配置">
          <com :currentEditRawInfo="currentEditRawInfo"> </com>
        </a-tab-pane>
        <a-tab-pane key="data" tab="数据">
          <dataCom :currentEditRawInfo="currentEditRawInfo"></dataCom>
        </a-tab-pane>
      </a-tabs>
    </div>

    <page v-else></page>
  </a-card>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import Page from "./page.vue";
import Com from "./component.vue";
import dataCom from "./dataCom.vue";
export default {
  components: {
    Page,
    Com,
    dataCom,
  },
  setup(props) {
    let activeKey = ref("settings");
    let currentEditRawInfo = ref("");
    const mainPanelProvider = inject("mainPanelProvider");
    onMounted(() => {
      mainPanelProvider.onSelectElement((rawInfo) => {
        if (!rawInfo) {
          currentEditRawInfo.value = "";
          return;
        }
        if (JSON.stringify(rawInfo) == JSON.stringify(currentEditRawInfo.value))
          return;
        currentEditRawInfo.value = rawInfo;
      });
    });

    return {
      currentEditRawInfo,
      activeKey,
    };
  },
};
</script>

<style lang="scss" scoped>
.attribute-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.attribute-container {
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 99;
  border: none;
  border-radius: 0px !important;
  :deep(.ant-card-body) {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden !important;
    padding: 0 !important;
    & > div {
      height: 100%;
    }
  }
  .el-scrollbar {
    padding-right: 20px;
  }
}

.attribute-tabs {
  height: 100%;
  :deep(.ant-tabs-nav-operations) {
    display: none;
  }
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
    background: #1d2126;
  }
  :deep(.ant-tabs-nav) {
    margin-bottom: 0 !important;
  }
  :deep(.ant-tabs-nav-list) {
    width: 100%;
  }
  :deep(.ant-tabs-tab) {
    width: 50%;
    text-align: center;
    .ant-tabs-tab-btn {
      width: 100%;
    }
  }
}
</style>
