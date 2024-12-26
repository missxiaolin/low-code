<template>
  <div class="pop-box">
    <a-button type="primary" @click="showPop">{{ btnText }}</a-button>

    <a-modal
      :title="title"
      :footer="null"
      @cancel="handleClose"
      v-model:open="open"
    >
      <a-form
        ref="formRef"
        :model="ruleForm"
        :rules="rules"
        :label-col="{ span: 3 }"
        :disabled="disabled"
      >
        <template v-for="(item, index) in btnPopForm">
          <template v-if="item.type == 'input'">
            <a-form-item
              :key="index"
              :ref="item.key"
              :label="item.label"
              :name="item.key"
            >
              <a-input
                :disabled="disabled || item.disabled"
                v-model:value="ruleForm[item.key]"
              />
            </a-form-item>
          </template>
          <template v-if="item.type == 'radio'">
            <a-form-item
              :key="index"
              :ref="item.key"
              :label="item.label"
              :name="item.key"
            >
              <a-radio-group
                :disabled="disabled || item.disabled"
                :options="item.dataOptions"
                v-model:value="ruleForm[item.key]"
              />
            </a-form-item>
          </template>
        </template>
        <a-form-item class="form-bottom-box" v-if="isShowBottomBtn">
          <a-button type="primary" @click="onSubmit">{{
            formSaveBtn
          }}</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, ref, toRaw, watch, toRefs } from "vue";

export default {
  name: "micPop",
  props: {
    btnText: {
      type: String,
      default: "",
    },
    // 弹窗内容
    title: {
      type: String,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isShowBottomBtn: {
      type: Boolean,
      default: true,
    },
    btnPopForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formSaveBtn: {
      type: String,
      default: "保存",
    },
    detail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: ["popClick", "success"],
  setup(props, { emit }) {
    const formRef = ref(null);
    let ruleForm = ref({});
    let rules = ref([]);
    let open = ref(props.dialogVisible);
    const showPop = () => {
      emit("popClick", true);
    };

    const handleClose = () => {
      emit("popClick", false);
    };

    const init = (popForm, detail) => {
      let ruleFormObj = {};
      let rulesArr = {};
      popForm.forEach((item) => {
        ruleFormObj[item.key] = detail[item.key] || item.default || "";
        rulesArr[item.key] = item.rules;
      });
      ruleForm.value = ruleFormObj;
      rules.value = rulesArr;
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          // console.log("values", ruleForm, toRaw(ruleForm));
          emit("success", ruleForm.value);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    onMounted(() => {
      init(props.btnPopForm, props.detail);
    });
    watch(
      props,
      (newVal) => {
        open.value = newVal.dialogVisible;
        init(newVal.btnPopForm, newVal.detail);
      },
      {
        immediate: true,
      }
    );

    return {
      open,
      formRef,
      onSubmit,
      resetForm,
      showPop,
      handleClose,
      ruleForm,
      rules,
    };
  },
};
</script>

<style scoped lang="scss">
.form-bottom-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
}
</style>
