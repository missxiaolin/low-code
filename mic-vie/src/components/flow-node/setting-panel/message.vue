<template>
  <a-form :model="form" ref="formRef" :labelCol="{ style: { width: '55px' } }">
    <a-form-item name="type" label="类型">
      <a-radio-group
        :options="typeOptions"
        v-model:value="form.type"
        button-style="solid"
        optionType="button"
      >
      </a-radio-group>
    </a-form-item>
    <a-form-item name="value" label="内容">
      <a-input v-model:value="form.content" />
    </a-form-item>
    <a-form-item>
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
    const typeOptions = ref([
      { label: "success", value: "success" },
      { label: "error", value: "error" },
      { label: "info", value: "info" },
      { label: "warning", value: "warning" },
    ]);
    const form = ref({
      type: props.config && props.config.type ? props.config.type : "success",
      content: props.config && props.config.content ? props.config.content : "",
    });
    const onFinish = (values) => {
      emit("save", form.value);
    };

    expose({});

    return {
      typeOptions,
      formRef,
      form,
      onFinish,
    };
  },
};
</script>
