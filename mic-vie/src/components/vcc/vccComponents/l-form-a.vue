<template>
  <div class="attribute-seeting-box">
    <div class="attribute-seeting-content">
      <div class="attribute-seeting-content-item">
        <div class="label">提交按钮：</div>
        <div class="attribute-seeting-content-item-content">
          <el-input
            placeholder="请输入提交按钮文案"
            v-model="formSaveBtn"
            @input="inputFormSaveBtn"
          ></el-input>
        </div>
      </div>
      <div class="l-form-b" v-if="formItem.length > 0">
        <div v-for="(item, index) in formItem" :key="index" class="l-form-b-li">
          <div class="icon-left" @click="removeItem(index)">
            <el-icon><RemoveFilled /></el-icon>
          </div>
          <div class="label">{{ item.label }}</div>
          <div class="value">
            <VNode :content="item" :isEscapeFn="false" />
          </div>
          <div class="icon-right">
            <el-icon class="mr5" @click="editP(index)"><Top /></el-icon>
            <el-icon @click="editForm(item, index)"><Edit /></el-icon>
          </div>
        </div>
      </div>
      <el-popover placement="left-start" trigger="hover">
        <template #reference>
          <el-button>添加表单</el-button>
        </template>
        <template #default>
          <div class="form-select-btn" @click="formSelectBtn">
            <el-button
              v-for="(item, index) in formArr"
              :key="index"
              @click="selectBtn(index)"
              >{{ item.name }}</el-button
            >
          </div>
        </template>
      </el-popover>
    </div>
    <!-- 表单添加 -->
    <el-dialog
      v-model="isShowFormAPop"
      :title="isAddFn ? '添加方法' : `添加表单${popObj.name}`"
    >
      <el-form
        ref="ruleFormARef"
        :model="popObj"
        :rules="rules"
        label-width="auto"
        status-icon
        v-if="!isAddFn"
      >
        <el-form-item label="字段名称：" prop="label">
          <el-input v-model="popObj.label" />
        </el-form-item>
        <el-form-item label="字段名：" prop="valueName">
          <el-input
            v-model="popObj.valueName"
            placeholder="请输入用于后端解析的英文字段名"
          />
        </el-form-item>
        <el-form-item label="默认值：" prop="value">
          <el-input
            v-model="popObj.value"
            :placeholder="'请输入绑定默认值多选框按照,隔开'"
          />
        </el-form-item>
        <el-form-item label="是否必填：" prop="popObj.rule.isRequire">
          <el-radio-group v-model="popObj.rule.isRequire" @change="radioChage">
            <el-radio :label="false">不必填</el-radio>
            <el-radio :label="true">必填</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="popObj.rule.isRequire"
          label="必填提示："
          prop="rule.errorMessage"
        >
          <el-input v-model="popObj.rule.errorMessage" />
        </el-form-item>
        <el-form-item
          label="数据："
          v-if="
            ['checkbox-group', 'radio-group', 'select'].indexOf(popObj.type) >
            -1
          "
          class="form-options-content"
        >
          <div
            v-for="(item, index) in popObj.options"
            :key="index"
            class="form-options-box"
          >
            <ul>
              <li>
                <div class="optionn-label">名称：</div>
                <div class="optionn-value">
                  <el-input v-model="item.label" />
                </div>
                <div class="icon-right"></div>
              </li>
              <li>
                <div class="optionn-label">绑定字段：</div>
                <div class="optionn-value">
                  <el-input v-model="item.value" />
                </div>
                <div class="icon-right" @click="deleteOption(index)">
                  <el-icon><RemoveFilled /></el-icon>
                </div>
              </li>
            </ul>
          </div>
          <div style="width: 100%">
            <el-button type="primary" circle @click="addOption">
              <el-icon><Plus /></el-icon>
            </el-button>
          </div>
        </el-form-item>
        <template v-if="Object.keys(popObj.propsData).length > 0">
          <template v-for="(item, index) in popObj.propsDataSelects">
            <el-form-item
              v-if="Object.keys(popObj.propsData).indexOf(`${item.key}`) > -1"
              :key="index"
              :label="`${item.name}：`"
            >
              <div class="flex">
                <el-input
                  v-if="item.type != 'function' && item.type != 'data'"
                  v-model="popObj.propsData[item.key]"
                />
                <el-select
                  v-else-if="item.type == 'data'"
                  v-model="popObj.propsData[item.key]"
                  style="width: 100%"
                >
                  <el-option
                    v-for="(v, i) in item.data"
                    :key="i"
                    :label="v.label"
                    :value="v.value"
                  />
                </el-select>
                <el-input
                  v-else
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  v-model="popObj.propsData[item.key]"
                  disabled
                ></el-input>
                <div
                  class="fn-edit"
                  v-if="item.type == 'function'"
                  @click="editFn(item, popObj.propsData[item.key])"
                >
                  <el-icon><Edit /></el-icon>
                </div>
                <div class="icon-right" @click="deleteProps(item.key)">
                  <el-icon><RemoveFilled /></el-icon>
                </div>
              </div>
            </el-form-item>
          </template>
        </template>
        <el-form-item>
          <el-popover placement="right-start" trigger="hover" width="180px">
            <template #reference>
              <el-button type="primary" circle>
                <el-icon><Plus /></el-icon>
              </el-button>
            </template>
            <template #default>
              <div class="form-props-btn" @click="formSelectBtn">
                <template
                  v-if="
                    Object.keys(popObj.propsData).length ==
                    popObj.propsDataSelects.length
                  "
                >
                  <div>无属性</div>
                </template>
                <template
                  v-else
                  v-for="(item, index) in popObj.propsDataSelects"
                >
                  <el-button
                    v-if="
                      Object.keys(popObj.propsData).indexOf(`${item.key}`) == -1
                    "
                    :key="index"
                    @click="propsClick(item)"
                    >{{ item.name }}</el-button
                  >
                </template>
              </div>
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <div class="form-bottom">
            <el-button type="primary" @click="submitForm('ruleFormARef')"
              >保存</el-button
            >
            <el-button @click="isShowFormAPop = false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div v-else class="fn-box">
        <editor
          :value="fnObj && fnObj.value ? fnObj.value : codeFn"
          height="200px"
          ref="codeEditor"
        />
        <div class="form-bottom mt20">
          <el-button type="primary" @click="saveFn">添加</el-button>
          <el-button type="primary" @click="clockFn">返回</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VNode from "../../lForm/vnodeComponent";
import editor from "../../editor/index.vue";
import { formArr } from "./utils/index";
const codeFn = `return (e) => {
    // this.vue 就是vue的当前实例
    console.log(e, this.vue);
}
`;

export default {
  components: {
    VNode,
    editor,
  },
  props: ["localAttributes", "componentName"],
  inject: ["vccApp"],
  watch: {
    componentName: {
      handler(newValue) {
        this.localAttributes.forEach((item) => {
          if (item.key == ":formSaveBtn") {
          this.formSaveBtn = item.value
              ? item.value.replace(/['']/g, "")
              : newValue == 'l-form' ? "保存" : '搜索';
          } else {
            this.formSaveBtn = newValue == 'l-form' ? "保存" : '搜索';
          }
        });
      },
      deep: true
    }
  },
  data() {
    return {
      formSaveBtn: this.componentName == 'l-form' ? "保存" : '查询',
      formArr,
      editIndex: "",
      popObj: {},
      isAddFn: false,
      codeFn,
      fnObj: {},
      rules: {
        label: [{ required: true, message: "请输入名称", trigger: "blur" }],
        valueName: [
          { required: true, message: "请输入绑定数据字段", trigger: "blur" },
        ],
      },
      isShowFormAPop: false,
      jsCode: "",
      formItem: [],
    };
  },
  mounted() {
    this.jsCode = this.vccApp.mainPanelProvider.getComponentOptions();
    this.init(this.localAttributes);
  },
  methods: {
    inputFormSaveBtn(e) {
      this.$emit("childSave", ":formSaveBtn", `'${e}'`);
    },
    init(localAttributes) {
      localAttributes.forEach((item) => {
        if (item.key == ":form") {
          this.formItem = this.jsCode.data()[item.value] || [];
          this.formItemKey = item.value;
        }
        if (item.key == ":formSaveBtn") {
          this.formSaveBtn = item.value
            ? item.value.replace(/['']/g, "")
            : this.componentName == 'l-form' ? "保存" : '搜索';
        }
      });
    },
    // 为了右侧属性框不消失阻止冒泡
    formSelectBtn(event) {
      event.stopPropagation();
    },
    // 修改表单项
    editForm(item, index) {
      this.editIndex = index;
      let form = JSON.parse(JSON.stringify(this.formArr));
      let obj = form.find((obj) => obj.type === item.type);
      if (!obj) {
        this.$message.error("该控件无法编辑");
        return;
      }
      let newObj = {
        ...obj,
        propsData: item.propsData,
        label: item.label,
        valueName: item.valueName,
        value: item.value,
        options: item.options || [],
        rule: {
          isRequire: item.rule.length > 0 ? item.rule[0].required : false,
          errorMessage: item.rule.length > 0 ? item.rule[0].message : "",
        },
        propsData: item.propsData,
      };
      // 多选框value 单独处理一下
      if (["checkbox-group"].indexOf(this.popObj.type) > -1) {
        newObj.value =
          item.value && item.value.length > 0 ? item.value.join(",") : "";
      }

      this.popObj = newObj;

      this.isAddFn = false;
      this.isShowFormAPop = true;
    },
    selectBtn(index) {
      this.editIndex = "";
      let popObj = JSON.parse(JSON.stringify(formArr[index]));
      this.popObj = popObj;
      this.isAddFn = false;
      this.isShowFormAPop = true;
    },
    propsClick(item) {
      // 添加方法
      if (item.type === "function") {
        this.fnObj = JSON.parse(JSON.stringify(item));
        this.isAddFn = true;
        return;
      }
      this.popObj.propsData[item.key] = item.value || "";
    },
    clockFn() {
      this.isAddFn = false;
    },
    editFn(item, value) {
      this.fnObj = JSON.parse(JSON.stringify(item));
      this.fnObj.value = value;
      this.isAddFn = true;
    },
    saveFn() {
      const code = this.$refs.codeEditor.getEditorCode();
      this.popObj.propsData[this.fnObj.key] = code;
      this.isAddFn = false;
    },
    radioChage(v) {
      if (v) {
        this.rules.rule = {
          errorMessage: [
            { required: true, message: "请输入提示", trigger: "blur" },
          ],
        };
      } else {
        delete this.rules.rule;
      }
    },
    deleteProps(key) {
      delete this.popObj.propsData[key];
    },
    addOption() {
      this.popObj.options.push({
        label: "",
        value: "",
      });
    },
    deleteOption(key) {
      this.popObj.options.splice(key, 1);
    },
    async submitForm(formEl) {
      const el = this.$refs[formEl];
      if (!el) return;
      await el.validate((valid, fields) => {
        if (valid) {
          let obj = {
            label: this.popObj.label,
            valueName: this.popObj.valueName,
            value: this.popObj.value,
            type: this.popObj.type,
            rule: this.popObj.rule,
            propsData: this.popObj.propsData,
          };
          // 多选框value 单独处理一下
          if (["checkbox-group"].indexOf(this.popObj.type) > -1) {
            obj.value = this.popObj.value ? this.popObj.value.split(",") : [];
          }
          if (
            ["checkbox-group", "radio-group", "select"].indexOf(
              this.popObj.type
            ) > -1
          ) {
            obj.options = this.popObj.options || [];
          }
          if (this.editIndex === 0 || this.editIndex) {
            this.formItem[this.editIndex] = obj;
          } else {
            this.formItem.push(obj);
          }

          this.viewSaveJs();
          this.isShowFormAPop = false;
        } else {
          //   console.log("error submit!", fields);
        }
      });
    },
    removeItem(index) {
      let array = this.formItem;
      let indexToRemove = index;
      array = array
        .slice(0, indexToRemove)
        .concat(array.slice(indexToRemove + 1));
      this.formItem = array;
      this.viewSaveJs();
    },
    editP(index) {
      if (index == 0) {
        return;
      }
      function swapByDestructuring(array, index1, index2) {
        [array[index1], array[index2]] = [array[index2], array[index1]];
      }
      swapByDestructuring(this.formItem, index, index - 1);
      this.viewSaveJs();
    },
    viewSaveJs(fn = []) {
      const data = {
        [this.formItemKey]: JSON.parse(JSON.stringify(this.formItem)),
      };
      console.log("data--------", data, fn);
      this.vccApp.viewSaveJs(data, fn);
    },
  },
};
</script>

<style lang="scss">
.attribute-seeting-box {
  display: flex;
  flex-direction: column;
  .attribute-seeting-content-item {
    margin-bottom: 10px;
  }
  .l-form-b {
    display: flex;
    flex-direction: column;
    color: var(--el-text-color-primary);
    .l-form-b-li {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-bottom: 5px;
      .label {
        width: 50px;
        margin-right: 10px;
        line-height: 30px;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .icon-left {
        margin-top: 7px;
        margin-right: 4px;
      }
      .value {
        height: 40px;
        flex: 1;
        position: relative;
        overflow: auto;
        > div {
          position: absolute;
          left: 0;
          top: 0;
        }
      }

      .icon-right {
        margin-top: 7px;
        margin-left: 10px;
      }
    }
  }
}
.form-select-btn {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-bottom: 5px;
    width: 130px;
    margin-left: 0px;
  }
  :deep(.el-button) {
    margin-bottom: 5px;
  }
}
.form-bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.form-props-btn {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-bottom: 5px;
    width: 160px;
    margin-left: 0px;
  }
  :deep(.el-button) {
    margin-bottom: 5px;
  }
}
.flex {
  flex: 1;
  .icon-right {
    margin-left: 20px;
    margin-right: 20px;
  }
  .fn-edit {
    margin-left: 10px;
  }
  :deep(.el-select) {
    width: 100%;
    flex: 1;
  }
  :deep(.el-input) {
    flex: 1;
  }
}
.form-options-content {
  :deep(.el-form-item__content) {
    display: flex;
    flex-direction: column;
  }
}
.form-options-box {
  display: flex;
  flex-direction: column;
  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    li {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;
      .optionn-label {
        white-space: nowrap;
        margin-right: 8px;
      }
      &:nth-child(2) {
        .optionn-label {
          white-space: nowrap;
          margin-left: 8px;
        }
      }
      .icon-right {
        margin-left: 20px;
      }
    }
  }
}
</style>
