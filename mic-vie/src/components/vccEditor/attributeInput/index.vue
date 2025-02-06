<template>
  <a-card
    class="attribute-container"
    @click="
      (e) => {
        e.stopPropagation();
      }
    "
  >
    <com v-if="currentEditRawInfo"></com>
    <page v-else></page>
  </a-card>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import Page from "./page.vue";
import Com from "./component.vue";
export default {
  components: {
    Page,
    Com,
  },
  setup(props) {
    let currentEditRawInfo = ref("");
    const mainPanelProvider = inject("mainPanelProvider");
    onMounted(() => {
      mainPanelProvider
        .onSelectElement((rawInfo) => {
          currentEditRawInfo.value = rawInfo;
        })
        .onRootElementMounted((rootElement) => {
          // document
          //   .getElementsByTagName("body")[0]
          //   .addEventListener("click", (e) => {
          //     this.mainPanelProvider.clearElementSelect();
          //   });
        });
    });

    return {
      currentEditRawInfo,
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
  :deep(.ant-card-body) {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden !important;
    padding: 0 !important;
  }
  .el-scrollbar {
    padding-right: 20px;
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
</style>
