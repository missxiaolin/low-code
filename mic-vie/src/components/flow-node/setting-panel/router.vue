<template>
  <a-form :model="form" ref="formRef" @finish="onFinish">
    <a-form-item name="url" label="请求url" v-model="form.url">
      <a-input />
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
  setup(props, { emit, expose }) {
    const formRef = ref(null);
    const form = ref({
      url: "",
    });
    const onFinish = (values) => {
      console.log("Received values of form:", values);
      //   console.log('dynamicValidateForm:', dynamicValidateForm);
    };

    return {
      formRef,
      form,
    };
  },
};
</script>
