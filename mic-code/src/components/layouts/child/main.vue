<template>
  <div class="main-app" v-if="!isManualRefresht">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from "vue";
import { useGeneralStore } from "../../../store/modules/project";
const generalStore = useGeneralStore();

export default {
  setup() {
    const isManualRefresht = computed(() => {
      return generalStore.getManualRefresh;
    });

    return {
      isManualRefresht,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-app {
  padding: 20px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
