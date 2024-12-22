<template>
  <div class="dashboard-main markdown-body dark" v-html="markdownToHtml"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { loadScript } from "../../utils/loadScript";
import axios from "axios";
import "github-markdown-css";

export default defineComponent({
  setup() {
    let markdownToHtml = ref("");

    const init = () => {
      loadScript("/marked.min.js", "marked", async () => {
        let mdRes = await axios.get("/js.md");
        // @ts-ignore
        markdownToHtml.value = marked.parse(mdRes.data);
      });
    };

    onMounted(() => {
      init();
    });
    return {
      markdownToHtml,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  &.markdown-body {
    padding: 20px;
    border-radius: 10px;
    background-color: var(--v3-body-bg-color);
    color: var(--el-text-color-primary);
  }
}
</style>
