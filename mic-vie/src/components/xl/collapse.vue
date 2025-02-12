<template>
  <a-collapse-panel>
    <template #header>
      <div class="panel-header-box">
        <div>{{ title }}</div>
        <div class="panel-header-box-right">
          <PlusOutlined @click="addItem" />
          <DeleteOutlined @click="delItem" />
        </div>
      </div>
    </template>
    <a-tabs
      v-model:activeKey="activeKey"
      size="small"
      class="collapse-tabs-box"
      v-if="value"
    >
      <a-tab-pane
        v-for="(item, index) in value"
        :key="item.id"
        :tab="`系列${index + 1}`"
      >
        <slot :item="item"></slot>
      </a-tab-pane>
    </a-tabs>
  </a-collapse-panel>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "micCollapsePanel",
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  emits: ["addItem", "delItem"],
  setup(props, { emit }) {
    const activeKey = ref(props.value[0]?.id || "");
    const addItem = (e) => {
      e.stopPropagation();
      e.preventDefault();
      emit("addItem");
    };
    const delItem = (e) => {
      e.stopPropagation();
      e.preventDefault();
      emit("delItem");
    };

    watch(
      () => props.value,
      (newValue) => {
        console.log(newValue);
        activeKey.value = newValue[0]?.id || "";
      }
    );

    return {
      activeKey,
      addItem,
      delItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.panel-header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .panel-header-box-right {
    margin-right: 40px;
    display: none;
    :deep(.anticon) {
      margin-right: 5px;
    }
  }
}
.collapse-tabs-box {
  :deep(.ant-tabs-nav-list) {
    width: auto !important;
  }
}
</style>
