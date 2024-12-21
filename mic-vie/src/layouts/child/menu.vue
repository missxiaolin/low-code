<template>
  <div class="menu-d">
    <!-- v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys" -->
    <a-menu
      mode="inline"
      theme="dark"
      @select="handleClick"
      :items="items"
      :open-keys="openKeys"
      :selectedKeys="selectedKeys"
      :inline-collapsed="false"
    ></a-menu>
  </div>
</template>

<script>
import { ref } from "vue";
import { initRoute } from "./menu.js";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const path = route.path;
    let openKeys = ref([]);
    let selectedKeys = ref([]);
    let items = ref([]);
    items.value = items.value.concat(initRoute);

    items.value.forEach((item) => {
      if (item.path === path) {
        openKeys.value = [item.key];
        selectedKeys.value = [item.key];
        return;
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.path === path) {
            openKeys.value = [item.key];
            selectedKeys.value = [child.key];
          }
        });
      }
    });

    const handleClick = (e) => {
      if (e.keyPath.length === 1) {
        openKeys.value = [""];
        selectedKeys.value = [e.keyPath[0]];
      }
      if (e.keyPath.length === 2) {
        openKeys.value = [e.keyPath[0]];
        selectedKeys.value = [e.keyPath[1]];
      }
      const item = e.item;
      if (item.path) {
        router.push(item.path);
      }
    };

    return {
      openKeys,
      selectedKeys,
      handleClick,
      items,
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-d {
  width: 250px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  :deep(.ant-menu) {
    min-height: 100%;
  }
}
</style>
