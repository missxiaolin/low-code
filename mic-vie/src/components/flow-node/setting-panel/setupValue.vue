<template>
  <a-form :model="form" ref="formRef" :labelCol="{ style: { width: '55px' } }">
    <a-tabs v-model:activeKey="form.activeKey">
      <a-tab-pane key="select" tab="参数">
        <a-form-item name="key" label="变量">
          <a-select
            v-model:value="form.key"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          >
            <a-select-option
              v-for="(v, key) in customData"
              :key="key"
              :value="v.key"
              >{{ v.keyDesc }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="input" tab="自定义">
        <a-form-item name="routeType" label="变量">
          <a-input v-model:value="form.key" />
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
    <a-form-item name="value" label="值">
      <a-input v-model:value="form.value" />
    </a-form-item>
    <a-form-item class="form-bottom-box">
      <a-button type="primary" @click="onFinish">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref, defineProps } from "vue";
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    customData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, expose }) {
    const formRef = ref(null);
    const form = ref({
      activeKey:
        props.config && props.config.activeKey
          ? props.config.activeKey
          : "select",
      key: props.config && props.config.key ? props.config.key : "",
      value: props.config && props.config.value ? props.config.value : "",
    });
    const onFinish = (values) => {
      emit("save", form.value);
    };

    expose({});

    return {
      formRef,
      form,
      onFinish,
    };
  },
};
</script>
