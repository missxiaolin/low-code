<template>
  <a-form :model="form" ref="formRef">
    <a-form-item name="routeType" label="跳转方式">
      <a-select :options="options" v-model:value="form.routeType" />
    </a-form-item>
    <a-form-item name="routeUrl" label="跳转链接">
      <a-input v-model:value="form.routeUrl" />
    </a-form-item>
    <div class="form-item">
      <div class="label">发送数据：</div>
      <div class="content">
        <a-form-item v-for="(item, index) in form.routeData" :key="index">
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
      </div>
    </div>
    <a-form-item>
      <a-button type="primary" @click="onFinish">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref } from "vue";
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
      { label: "内部系统跳转", value: "route" },
      // { label: "微服务跳转", value: "micro-app" },
      { label: "超链接跳转", value: "a" },
    ]);
    const form = ref({
      routeType:
        props.config && props.config.routeType
          ? props.config.routeType
          : "route",
      routeUrl:
        props.config && props.config.routeUrl ? props.config.routeUrl : "",
      routeData:
        props.config && props.config.routeData ? props.config.routeData : [],
    });
    const onFinish = () => {
      emit("save", form.value);
    };

    const addParams = () => {
      form.value.routeData.push({
        key: "",
        value: "",
      });
    };

    const delPrams = (index) => {
      form.value.routeData.splice(index, 1);
    };

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
