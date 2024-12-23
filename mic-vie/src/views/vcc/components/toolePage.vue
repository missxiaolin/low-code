<template>
  <li>
    <a-button type="link" @click="showPagePop">
      <BookOutlined />页面设置
    </a-button>
    <a-modal v-model:open="open" title="页面设置" :footer="null">
      <a-form
        ref="formRef"
        :label-col="{ span: 3 }"
        :model="pageData.form"
        :rules="pageData.rules"
      >
        <a-form-item ref="route_name" label="路由名称" name="route_name">
          <a-input v-model:value="pageData.form.route_name" />
        </a-form-item>
        <a-form-item ref="path" label="路由路径" name="path">
          <a-input
            v-model:value="pageData.form.path"
            :disabled="props.pageForm.id > 0"
          />
        </a-form-item>
        <a-form-item ref="status" label="路由路径" name="status">
          <a-radio-group
            v-model:value="pageData.form.status"
            :options="statusOptions"
          >
          </a-radio-group>
        </a-form-item>
        <a-form-item class="form-bottom-btns">
          <a-button type="primary" @click="onSubmit">保存</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </li>
</template>

<script>
import { ref } from "vue";
function startsWithSlash(rule, value) {
  const regex = /^\//;
  if (value === "") {
    return Promise.resolve();
  } else if (!regex.test(value)) {
    return Promise.reject("路由路径必须/开头");
  } else {
    return Promise.resolve();
    // callback();
  }
}

export default {
  props: ["pageForm"],
  emits: ["success"],
  setup(props, { emit }) {
    let open = ref(false);
    const formRef = ref(false);
    const statusOptions = ref([
      {
        label: "禁用",
        value: 1,
        disabled: true,
      },
      {
        label: "启用",
        value: 2,
      },
    ]);
    let pageData = ref({
      form: {
        route_name: props.pageForm.route_name || "",
        path: props.pageForm.path || "",
        status: props.pageForm.status || 2,
      },
      rules: {
        route_name: [
          {
            required: true,
            message: "请输入路由名称",
          },
        ],
        path: [
          {
            required: true,
            message: "请输入路由路径",
          },
          { validator: startsWithSlash, trigger: "change" },
        ],
        status: [
          {
            required: true,
            message: "Please select status",
          },
        ],
      },
    });

    const showPagePop = () => {
      open.value = true;
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          emit("success", pageData.value.form);
          open.value = false;
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      props,
      open,
      showPagePop,
      formRef,
      statusOptions,
      pageData,
      onSubmit,
      resetForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-bottom-btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>
