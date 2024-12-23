<template>
  <div class="vue-page-main">
    <!-- <div class="mu-search-container pall10"></div> -->
    <div class="mu-handle-content flex flex-1 flex-column">
      <div class="mb20">
        <a-button type="primary" @click="goVcc">创建路由</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "page",
  setup() {
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {});

    const goVcc = () => {
      router.push({
        path: "/form",
        query: {
          projectId: route.query.projectId,
        },
      });
    };

    return {
      goVcc,
    };
  },
};
</script>

<style lang="scss" scoped>
.vue-page-main {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 1;
}
</style>
