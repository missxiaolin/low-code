<template>
  <a-form :model="form" ref="formRef">
    <a-form-item name="url" label="请求url">
      <a-input v-model:value="form.requestUrl" />
    </a-form-item>
    <a-form-item name="method" label="请求方式">
      <a-select :options="options" v-model:value="form.requestMethod" />
    </a-form-item>
    <a-tabs>
      <a-tab-pane key="prams" tab="prams">
        <a-form-item v-for="(item, index) in form.requestParams" :key="index">
          <div class="prams-form-item">
            <a-input v-model:value="item.key" placeholder="key" />
            <a-input v-model:value="item.value" placeholder="value" />
            <MinusCircleOutlined @click="delPrams(index)" />
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="dashed" style="width: 100%" @click="addParams">
            <PlusOutlined />
            添加字段
          </a-button>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="body" tab="body">
        <a-form-item name="body.type" label="类型">
          <a-select
            :options="bodyTypeOptions"
            v-model:value="form.requestBody.type"
          />
        </a-form-item>
        <a-form-item
          v-if="form.requestBody.type === 'script'"
          name="script"
          label="脚本"
        >
          <a-textarea
            v-model:value="form.requestBody.script"
            placeholder="script"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
        <a-form-item
          v-if="form.requestBody.type === 'json'"
          name="json"
          label="json"
        >
          <a-textarea
            v-model:value="form.requestBody.json"
            placeholder="json"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
    <a-form-item>
      <a-button type="primary" @click="onFinish">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "request",
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
      requestUrl: "",
      requestMethod: "",
      requestParams: [],
      requestBody: {
        type: "json",
        script: "",
        json: "",
      },
    });
    const bodyTypeOptions = ref([
      { label: "json", value: "json" },
      { label: "script", value: "script" },
    ]);
    const options = ref([
      { label: "POST", value: "post" },
      { label: "GET", value: "get" },
    ]);
    const onFinish = () => {
      emit("save", form.value);
    };

    const addParams = () => {
      form.value.requestParams.push({
        key: "",
        value: "",
      });
    };

    const delPrams = (index) => {
      form.value.requestParams.splice(index, 1);
    };

    expose({
      onFinish,
    });

    return {
      formRef,
      form,
      onFinish,
      options,
      addParams,
      delPrams,
      bodyTypeOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.prams-form-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :deep(.ant-input) {
    width: 40%;
  }
  :deep(.anticon) {
    margin-left: 10px;
  }
}
</style>
