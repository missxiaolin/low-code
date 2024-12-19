<template>
  <a-modal
    :open="true"
    title="变量添加"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <a-form
      :model="formData"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="变量名称"
        name="key"
        :rules="[{ required: true, message: '请输入变量名称!' }]"
      >
        <a-input v-model:value="formData.key" />
      </a-form-item>
      <a-form-item
        label="变量类型"
        name="keyType"
        :rules="[{ required: true, message: '请输入变量名称!' }]"
      >
        <a-radio-group
          v-model:value="formData.keyType"
          @change="onKeyTypeChange"
          optionType="button"
          size="default"
          button-style="solid"
          :options="keyTypeOptions"
        >
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="变量默认值"
        name="value"
        :rules="[{ required: true, message: '请输入变量默认值!' }]"
      >
        <a-input
          v-if="['string', 'number'].includes(formData.keyType)"
          v-model:value="formData.value"
        />
        <a-switch
          v-else-if="['boolean'].includes(formData.keyType)"
          v-model:checked="formData.value"
        />
        <codeEditor
          v-else-if="['array'].includes(formData.keyType)"
          style="height: 200px"
          :language="'json'"
          v-model:value="formData.value"
        />
        <codeEditor
          v-else
          style="height: 200px"
          :language="'json'"
          v-model:value="formData.value"
        />
      </a-form-item>
      <a-form-item
        label="变量描述"
        name="keyDesc"
        :rules="[{ required: true, message: '请输入变量描述!' }]"
      >
        <a-input v-model:value="formData.keyDesc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 20 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import codeEditor from "../editor/index.vue";

export default {
  props: ["formData"],
  components: {
    codeEditor,
  },
  data() {
    return {
      keyTypeOptions: [
        {
          label: "字符串",
          value: "string",
        },
        {
          label: "数字",
          value: "number",
        },
        {
          label: "布尔值",
          value: "boolean",
        },
        {
          label: "数组",
          value: "array",
        },
        {
          label: "对象",
          value: "object",
        },
      ],
    };
  },
  methods: {
    onFinish() {
      let form = this.formData;
      form.id = this.formData.id;
      this.$emit("save", form);
    },
    onKeyTypeChange() {
      if (this.formData.keyType === "boolean") {
        this.formData.value = false;
      } else if (this.formData.keyType === "array") {
        this.formData.value = "[]";
      } else if (this.formData.keyType === "object") {
        this.formData.value = "{}";
      } else {
        this.formData.value = "";
      }
    },
  },
};
</script>
