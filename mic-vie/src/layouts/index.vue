<template>
  <a-layout class="layouts">
    <a-layout class="menu">
      <route-menu></route-menu>
    </a-layout>
    <div class="layouts-right">
      <route-header></route-header>
      <div class="layouts-main">
        <route-main></route-main>
      </div>
    </div>
  </a-layout>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    routeMenu: defineAsyncComponent(() => import("./child/menu.vue")),
    routeHeader: defineAsyncComponent(() => import("./child/header.vue")),
    routeMain: defineAsyncComponent(() => import("./child/main.vue")),
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.layouts {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  .menu {
    height: 100%;
    flex: none !important;
  }
  .layouts-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .layouts-main {
      flex: 1;
    }
  }
}
</style>
