<template>
  <div class="field-box">
    <div class="label">{{ label }}</div>
    <div
      :class="{
        'content-item-content': true,
        'content-item-content-span-2': span === 2,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "micField",
  props: {
    label: {
      type: String,
      default: "",
    },
    span: {
      type: Number,
      default: 1,
    },
    tooltip: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.field-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  .label {
    min-width: 70px;
    line-height: 30px;
    text-align: right;
    color: #fff;
  }
  .content-item-content {
    flex: 1;
  }
  .content-item-content-span-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    :deep(.ant-input-number) {
      width: 47%;
    }
  }
  :deep(.ant-input) {
    width: 100%;
  }
  :deep(.ant-select) {
    width: 100%;
  }
  :deep(.ant-input-number) {
    width: 100%;
  }
}
</style>
