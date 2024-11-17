<template>
  <a-form :model="form" ref="formRef" @finish="onFinish">
    <a-form-item name="url" label="请求url" v-model="form.url">
      <a-input />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, defineProps } from "vue";
const form = ref({
  url: "",
});
</script>
