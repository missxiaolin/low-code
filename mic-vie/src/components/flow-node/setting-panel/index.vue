<template>
  <div class="setting-panel">
    <div class="type">
      <div class="label">类型：</div>
      <a-select :options="options" v-model:value="config.type" />
    </div>
    <request
      v-if="config.type === 'request'"
      :config="config.config"
      @save="save"
    />
    <function
      v-if="config.type === 'function'"
      :config="config.config"
      @save="save"
    />
    <router
      v-if="config.type === 'router'"
      :config="config.config"
      @save="save"
    />
    <!-- <setupValue
      v-if="config.type === 'setupValue'"
      :config="config.config"
      @save="save"
    /> -->
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from "vue";
export default {
  name: "SettingPanel",
  components: {
    request: defineAsyncComponent(() => import("./request.vue")),
    function: defineAsyncComponent(() => import("./function.vue")),
    router: defineAsyncComponent(() => import("./router.vue")),
    // setupValue: defineAsyncComponent(() => import("./setupValue.vue")),
  },
  props: {
    popConfig: {
      type: Object,
      default: () => {
        return {
          type: "",
          config: {},
        };
      },
    },
    graphRef: {
      type: Object,
      default: () => {
        return {};
      },
    },
    curModel: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["clock"],
  setup(props, { emit, expose }) {
    const config = ref({
      type: props.popConfig.config ? props.popConfig.config.type : "",
      config: props.popConfig.config ? props.popConfig.config.config : {},
    });

    const options = ref([
      { label: "请求接口", value: "request" },
      //   { label: "设置变量", value: "setupValue" },
      { label: "执行脚本", value: "function" },
      { label: "路由跳转", value: "router" },
    ]);

    const save = (saveConfig) => {
      let menus = [
        {
          label: "成功",
          key: "success",
          nodeType: "event",
          nodeName: "成功",
          eventKey: "success",
        },
        {
          label: "失败",
          key: "error",
          nodeType: "event",
          nodeName: "失败",
          eventKey: "error",
        },
        {
          label: "成功或失败",
          key: "finally",
          nodeType: "event",
          nodeName: "成功或失败",
          eventKey: "finally",
        },
      ];
      const item = options.value.find((o) => config.value.type === o.value);
      props.graphRef.updateItem(props.curModel.id, {
        ...props.curModel.current,
        config: {
          type: config.value.type,
          config: saveConfig,
        },
        label: item.label,
        menus,
      });
      emit("clock");
    };

    return {
      config,
      options,
      save,
    };
  },
};
</script>

<style lang="scss" scoped>
.setting-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  .type {
    display: flex;
    margin-bottom: 10px;
    :deep(.ant-select) {
      flex: 1;
    }
    .label {
      min-width: 60px;
    }
  }
}
</style>
