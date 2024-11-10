<template>
  <el-config-provider :locale="lang">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
  data() {
    return {
      lang: zhCn,
    };
  },
};
</script>

<style scoped></style>
