<template>
  <AConfigProvider
    :locale="lang"
    :theme="{
      algorithm: [darkAlgorithm, compactAlgorithm],
    }"
  >
    <template v-if="routeWhite.indexOf(path) === -1">
      <layouts />
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </AConfigProvider>
</template>

<script>
import zhCN from "ant-design-vue/locale/zh_CN";
import { theme } from "ant-design-vue";
import { useTheme } from "./hooks/useTheme";
import { onMounted, ref, defineAsyncComponent, watch } from "vue";
import { useRouter } from "vue-router";
import rWhite from "./config/route";

const { darkAlgorithm, compactAlgorithm } = theme;

export default {
  components: {
    layouts: defineAsyncComponent(() => import("./layouts/index.vue")),
  },
  setup() {
    const router = useRouter();
    const routeWhite = ref(rWhite);
    let path = ref("");

    // 监听当前路由
    watch(
      () => router.currentRoute.value,
      (newValue) => {
        path.value = newValue.path;
      },
      { immediate: true }
    );

    onMounted(() => {
      const { initTheme } = useTheme();
      initTheme();
    });
    return {
      routeWhite,
      path,
      lang: zhCN,
      darkAlgorithm,
      compactAlgorithm,
    };
  },
};
</script>

<style scoped></style>
