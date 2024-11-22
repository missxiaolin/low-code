<template>
  <AConfigProvider
    :locale="lang"
    :theme="{
      algorithm: [darkAlgorithm, compactAlgorithm],
    }"
  >
    <router-view></router-view>
  </AConfigProvider>
</template>

<script>
import zhCN from "ant-design-vue/locale/zh_CN";
import { theme } from "ant-design-vue";
import { useTheme } from "./hooks/useTheme";
const { darkAlgorithm, compactAlgorithm } = theme;

export default {
  data() {
    return {
      lang: zhCN,
      darkAlgorithm,
      compactAlgorithm,
    };
  },
  mounted() {
    const { initTheme } = useTheme();
    initTheme();
  },
};
</script>

<style scoped></style>
