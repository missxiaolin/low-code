<template>
  <div class="form-container">
    <el-form
      :label-width="labelWidth"
      :disabled="disabled"
    >
      <el-row>
        <el-col :span="span" v-for="(item, index) in form" :key="index">
          <el-form-item :label="item.label" :prop="`${item.valueName}`">
            <VNode
              :parentThis="this"
              :content="item"
              :isEscapeFn="true"
              v-model="item.value"
              @updateOptions="updateOptions(item, index)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="isShowBottomBtn">
        <div class="form-bottom-box">
          <el-button type="primary" @click="submitForm">
            {{ formSaveBtn }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VNode from "./vnodeComponent";
import { cloneDeep } from 'lodash';

export default {
  components: {
    VNode,
  },
  props: {
    span: {
      type: Number,
      default: 8,
    },
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isShowBottomBtn: {
      type: Boolean,
      default: true,
    },
    formSaveBtn: {
      type: String,
      default: "保存",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      originalData: ''
    };
  },
  mounted() {
    this.originalData = cloneDeep(this.form)
  },
  watch: {
    
  },
  methods: {
    resetForm() {
      this.form.forEach((item, index) => {
        item.value = this.originalData[index].value;
      })
    },
    async submitForm() {
      let checkForm = false
      let from = {}
      for (let i = 0; i < this.form.length; i++) {
        if (this.form[i].rule && this.form[i].rule.isRequire && (this.form[i].value === null || this.form[i].value === undefined || this.form[i].value === '')) {
          this.$message(this.form[i].rule.errorMessage)
          checkForm = true
          break
        }
        from[this.form[i].valueName] = this.form[i].value
      }
      if (checkForm) {
        return
      }
      this.$emit("success", from);
    },
    updateOptions(item, index) {
      const { propsData = {}, options = [] } = item;
      const { customValue = "value", customLabel = "label" } = propsData;
      const targetItem = originalData[index];
      // 改变options后，判断是否能匹配到value,否则重置value
      const targetOptions = options.find(
        (ele) => ele[customValue] === item.value
      );
      if (!targetOptions) {
        item.value = targetItem.value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  :deep(.el-select) {
    flex: 1;
  }
  :deep(.el-col) {
    padding-right: 20px;
  }
  .form-bottom-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
