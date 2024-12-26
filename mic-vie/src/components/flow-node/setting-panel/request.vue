<template>
  <a-form :model="form" ref="formRef" :labelCol="{ style: { width: '55px' } }">
    <a-form-item name="url" label="请求url">
      <a-input v-model:value="form.requestUrl" />
    </a-form-item>
    <a-form-item name="method" label="请求方式">
      <a-select :options="options" v-model:value="form.requestMethod" />
    </a-form-item>
    <a-tabs v-model:activeKey="form.activeKey">
      <a-tab-pane key="requestParams" tab="参数">
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
      <a-tab-pane key="script" tab="脚本">
        <a-form-item name="requestParamsScript" label="脚本">
          <a-textarea
            v-model:value="form.requestParamsScript"
            placeholder="function"
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
      requestUrl:
        props.config && props.config.requestUrl ? props.config.requestUrl : "",
      requestMethod:
        props.config && props.config.requestMethod
          ? props.config.requestMethod
          : "",
      activeKey:
        props.config && props.config.activeKey
          ? props.config.activeKey
          : "requestParams",
      requestParams:
        props.config && props.config.requestParams
          ? props.config.requestParams
          : [],
      requestParamsScript:
        props.config && props.config.requestParamsScript
          ? props.config.requestParamsScript
          : `(function (ctx) {
  // TODO
                    
})(ctx)`,
    });
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
