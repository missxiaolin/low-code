<template>
  <div class="search-l-b">
    <div class="label-name">{{ props.labelName }}</div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    labelName: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-l-b {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 8px;
  ::v-deep(.el-select) {
    width: 100%;
  }
  .label-name {
    position: absolute;
    top: 0px;
    left: 20px;
    padding: 0 3px;
    font-size: 12px;
    line-height: 16px;
    color: var(--el-text-color-primary);
    height: auto;
    background-color: var(--search-bg-color) !important;
    z-index: 2;
    align-items: center !important;
  }
}

</style>
