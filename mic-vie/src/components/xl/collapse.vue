<template>
  <mic-panel title="系列" class="mic-panel-box">
    <template #header>
      <div class="panel-header-box">
        <div class="panel-header-title">{{ title }}</div>
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
  </mic-panel>
</template>

<script>
import { ref, watch, useAttrs } from "vue";
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
    const attrs = useAttrs();
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
      attrs,
    };
  },
};
</script>

<style lang="scss" scoped>
.panel-header-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .panel-header-title {
    font-size: 14px;
  }
  .panel-header-box-right {
    margin-right: 30px;
    display: none;
    :deep(.anticon) {
      margin-right: 5px;
    }
  }
}
.mic-panel-box {
  .collapse-tabs-box {
    padding: 0 15px 0 15px;
    :deep(.ant-tabs-nav-list) {
      width: auto !important;
    }
    :deep(.ant-tabs-content-holder) {
      height: 100%;
      overflow-y: scroll;
      background-color: hsl(215deg 15% 8%) !important;
    }
    :deep(.ant-tabs-nav) {
      margin-bottom: 10px !important;
    }
  }
}
</style>

<style lang="scss">
.mic-panel-body-show {
  .panel-header-box {
    .panel-header-box-right {
      display: block;
    }
  }
}
</style>
