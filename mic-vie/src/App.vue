<template>
  <AConfigProvider :locale="lang">
    <router-view></router-view>
  </AConfigProvider>
</template>

<script>
import zhCN from "ant-design-vue/locale/zh_CN";
// import "ant-design-vue/dist/"
import { useTheme } from "./hooks/useTheme";

export default {
  data() {
    return {
      lang: zhCN,
    };
  },
  mounted() {
    const { initTheme } = useTheme();

    // initTheme();
  },
};
</script>

<style scoped></style>
