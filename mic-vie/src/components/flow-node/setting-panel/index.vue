<template>
  <div class="setting-panel">
    <div class="type">
      <div class="label">类型：</div>
      <a-select :options="options" />
    </div>
    <http />
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "./http.vue";
const formRef = ref(null);
const form = ref({
  type: "http",
  url: "",
});
const options = ref([
  { label: "请求接口", value: "http" },
  { label: "设置变量", value: "seetingValue" },
]);

const onFinish = (values) => {
  console.log("Received values of form:", values);
  //   console.log('dynamicValidateForm:', dynamicValidateForm);
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
