<template>
  <div class="mt-setting-container">
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in modalList"
            :key="item.lc_id"
            @click="handleModalClick(item)"
          >
            弹窗 - {{ item.lc_id }}
          </a-menu-item>
        </a-menu>
      </template>
      <a-badge :count="modalList.length">
        <a-button type="text" danger>弹窗</a-button>
      </a-badge>
    </a-dropdown>
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in drawerList"
            :key="item.lc_id"
            @click="handleDrawerClick(item)"
          >
            抽屉 - {{ item.lc_id }}
          </a-menu-item>
        </a-menu>
      </template>
      <a-badge :count="drawerList.length">
        <a-button type="text" danger>抽屉</a-button>
      </a-badge>
    </a-dropdown>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["rawDataStructure"],
  setup(props) {
    let modalList = ref([]);
    let drawerList = ref([]);
    const rawDataStructure = props.rawDataStructure;
    let arr = [];
    try {
      arr = rawDataStructure.template.__children;
    } catch (error) {}

    const init = (rawArr) => {
      rawArr.forEach((item) => {
        if (
          Object.keys(item).length > 0 &&
          Object.keys(item)[0] == "mic-modal"
        ) {
          modalList.value.push(item[Object.keys(item)[0]]);
        }
        if (
          Object.keys(item).length > 0 &&
          Object.keys(item)[0] == "mic-drawer"
        ) {
          drawerList.value.push(item[Object.keys(item)[0]]);
        }
        if (
          item[Object.keys(item)[0]].__children &&
          item[Object.keys(item)[0]].__children.length > 0
        ) {
          init(item[Object.keys(item)[0]].__children);
        }
      });
    };
    init(arr);

    const handleModalClick = (row) => {
      // 说明绑定了v-model:open
      if (Object.keys(row).includes("v-model:open")) {
      }
    };

    const handleDrawerClick = (row) => {
      // 说明绑定了v-model:open
      if (Object.keys(row).includes("v-model:open")) {
      }
    };

    return {
      modalList,
      drawerList,
      handleModalClick,
      handleDrawerClick,
    };
  },
};
</script>

<style scoped lang="scss">
.mt-setting-container {
  position: absolute;
  left: 10px;
  bottom: 15px;
  z-index: 999;
  border: 1px solid #303030;
  display: flex;
  flex-direction: column;
}
</style>
