<template>
  <div class="menu-d">
    <!-- v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys" -->
    <div class="menu-title">Low Code</div>
    <a-menu
      mode="inline"
      theme="light"
      @select="handleClick"
      :items="items"
      :open-keys="openKeys"
      :selectedKeys="selectedKeys"
      :inline-collapsed="false"
    ></a-menu>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { initRoute } from "../../config/menu.js";
import { useRouter, useRoute } from "vue-router";
import { getpageRouteAll } from "../../api/page.js";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    let path = route.path;
    let openKeys = ref([]);
    let selectedKeys = ref([]);
    let items = ref([]);
    items.value = items.value.concat(initRoute);

    const init = () => {
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
    };

    const handleClick = (e) => {
      if (e.keyPath.length === 1) {
        openKeys.value = [];
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

    watch(
      () => route.path,
      (newPath) => {
        console.log(newPath);
        openKeys.value = [];
        selectedKeys.value = [];
        path = newPath;
        init();
      },
      { immediate: true }
    );

    onMounted(async () => {
      let res = await getpageRouteAll({
        projectId: 1,
        status: [2],
      });
      if (!res.success) return;
      let arr = [
        {
          key: "project",
          label: "页面管理",
          children: [
            // {
            //   key: "projectList",
            //   path: "/project/list",
            //   label: "项目列表",
            // },
          ],
        },
        // {
        //   key: "2",
        //   label: "组件管理",
        //   path: "/component",
        // },
        // {
        //   key: "3",
        //   label: "模板管理",
        //   path: "/template",
        // }
      ];
      res.model.forEach((item) => {
        arr[0].children.push({
          key: item.id,
          label: item.route_name,
          path: `${item.path}`,
        });
      });
      items.value = items.value.concat(arr);
      init();
    });

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
  display: flex;
  flex-direction: column;
  .menu-title {
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
    background: #141414;
  }
  :deep(.ant-menu) {
    flex: 1;
  }
  :deep(.ant-menu-light .ant-menu-item-selected) {
    background-color: var(--v3-menu-item-selected-bg-color) !important;
  }
  :deep(.ant-menu .ant-menu-submenu-arrow) {
    color: var(--v3-menu-item-selected-icon-color);
  }
}
</style>
