<template>
  <a-form :model="form" ref="formRef">
    <a-form-item name="url" label="请求url">
      <a-textarea
        v-model:value="form.functionScript"
        placeholder="function"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
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
    const form = ref({
      functionScript:
        props.config && props.config.functionScript
          ? props.config.functionScript
          : "",
    });
    const onFinish = () => {
      emit("save", form.value);
    };

    return {
      formRef,
      form,
      onFinish,
    };
  },
};
</script>
