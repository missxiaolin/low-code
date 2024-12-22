<template>
  <div class="pop-box">
    <el-button type="primary" @click="showPop">{{ btnText }}</el-button>
    <el-dialog
      :model-value="dialogVisible"
      :title="title"
      :modal-append-to-body="false"
      :show-close="true"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :label-width="labelWidth"
        :disabled="disabled"
      >
        <template v-for="(item, index) in btnPopForm">
          <template v-if="item.type == 'input'">
            <el-form-item
              :key="index"
              :label="item.label"
              :prop="`${item.key}`"
            >
              <el-input v-model="ruleForm[item.key]" />
            </el-form-item>
          </template>
          <template v-if="item.type == 'radio'">
            <el-form-item
              :key="index"
              :label="item.label"
              :prop="`${item.key}`"
            >
              <el-radio-group v-model="ruleForm[item.key]">
                <el-radio
                  v-for="(v, i) in item.dataOptions"
                  :key="i"
                  :label="v.value"
                  >{{ v.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </template>
          <template v-if="item.type == 'checkbox'">
            <el-form-item
              :key="index"
              :label="item.label"
              :prop="`${item.key}`"
            >
              <el-checkbox-group v-model="ruleForm[item.key]">
                <el-checkbox
                  :label="v.value"
                  :value="v.value"
                  v-for="(v, i) in item.dataOptions"
                  :key="i"
                />
              </el-checkbox-group>
            </el-form-item>
          </template>
          <template v-if="item.type == 'data'">
            <el-form-item
              :key="index"
              :label="item.label"
              :prop="`${item.key}`"
            >
              <el-date-picker
                v-model="ruleForm[item.key]"
                :type="item.dataType"
                :teleported="true"
                :editable="false"
                :clearable="false"
                :placeholder="`${item.placeholder}`"
                :value-format="item.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                :format="item.format || 'YYYY-MM-DD HH:mm:ss'"
              />
            </el-form-item>
          </template>
        </template>

        <el-form-item v-if="isShowBottomBtn">
          <div class="form-bottom-box">
            <el-button type="primary" @click="submitForm('ruleFormRef')">
              {{ formSaveBtn }}
            </el-button>
            <el-button @click="resetForm('ruleFormRef')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
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
    labelWidth: {
      type: String,
      default: "auto",
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
  watch: {
    btnPopForm(v) {
      this.init(v);
    },
    detail(v) {
      this.init(this.btnPopForm, v || {});
    },
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
    };
  },
  mounted() {
    this.init(this.btnPopForm, this.detail);
  },
  methods: {
    init(popForm, detail) {
      let ruleFormObj = {};
      let rulesArr = {};
      popForm.forEach((item) => {
        ruleFormObj[item.key] = detail[item.key] || item.default || "";
        rulesArr[item.key] = item.rules;
      });
      this.ruleForm = ruleFormObj;
      this.rules = rulesArr;
    },
    showPop() {
      this.$emit("popClick", true);
    },
    handleClose() {
      this.$emit("popClick", false);
    },
    async submitForm(formEl) {
      const el = this.$refs[formEl];
      if (!el) return;
      await el.validate((valid, fields) => {
        if (valid) {
          this.$emit("success", this.ruleForm);
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },
    resetForm(formEl) {
      const el = this.$refs[formEl];
      if (!el) return;
      el.resetFields();
    },
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
