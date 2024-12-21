<template>
  <div class="layouts">
    <div class="menu">
      <route-menu></route-menu>
    </div>
    <div class="layouts-right">
      <header></header>
      <div class="layouts-main">
        <route-main></route-main>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    routeMenu: defineAsyncComponent(() => import("./child/menu.vue")),
    header: defineAsyncComponent(() => import("./child/header.vue")),
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
  .layouts-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .layouts-main {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
