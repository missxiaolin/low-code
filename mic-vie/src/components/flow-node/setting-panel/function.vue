<template>
  <a-form :model="form" ref="formRef" :labelCol="{ style: { width: '55px' } }">
    <a-form-item name="functionScript" label="脚本">
      <a-textarea
        v-model:value="form.functionScript"
        placeholder="function"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
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
  },
  emits: ["save"],
  setup(props, { emit, expose }) {
    const formRef = ref(null);
    const form = ref({
      functionScript:
        props.config && props.config.functionScript
          ? props.config.functionScript
          : `(function (ctx) {
  // TODO
                    
})(ctx)`,
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
