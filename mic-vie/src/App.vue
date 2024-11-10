<template>
  <el-config-provider :locale="lang">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useTheme } from "./hooks/useTheme";

export default {
  data() {
    return {
      lang: zhCn,
    };
  },
  mounted() {
    const { initTheme } = useTheme();

    initTheme()
  }
};
</script>

<style scoped></style>
