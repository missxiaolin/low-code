<template>
  <a-form :model="form" ref="formRef">
    <a-form-item name="routeType" label="跳转方式">
      <a-select :options="options" v-model:value="form.routeType" />
    </a-form-item>
    <a-form-item name="routeUrl" label="跳转链接">
      <a-input v-model="form.routeUrl" />
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
  },
  emits: ["save"],
  setup(props, { emit, expose }) {
    const formRef = ref(null);
    const options = ref([
      { label: "打开新页面", value: "push" },
      { label: "后退", value: "back" },
    ]);
    const form = ref({
      routeType: props.config.routeType || "",
      routeUrl: props.config.routeUrl || "",
    });
    const onFinish = () => {
      emit("save", form.value);
    };

    return {
      formRef,
      form,
      onFinish,
      options,
    };
  },
};
</script>
