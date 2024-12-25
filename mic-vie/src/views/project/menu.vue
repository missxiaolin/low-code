<template>
  <div class="home-main">
    <div class="mu-search-container pall10">
      <a-row>
        <a-col :span="8">
          <search-label :labelName="'名称'">
            <a-input v-model:value="searchForm.name" placeholder="请输入名称" />
          </search-label>
        </a-col>
        <a-col :span="8">
          <search-label :labelName="'分类'">
            <a-select
              v-model:value="searchForm.type"
              :options="typeOptions"
              placeholder="请选择分类"
            >
            </a-select>
          </search-label>
        </a-col>
        <a-col :span="8">
          <search-label :labelName="'状态'">
            <a-select
              v-model:value="searchForm.status"
              placeholder="请选择分类"
              :options="statusOptions"
            >
            </a-select>
          </search-label>
        </a-col>
      </a-row>
      <div class="mu-search-form-button">
        <a-button @click="resetSearchForm">重置</a-button>
        <a-button type="primary" @click="getMenuList">查询</a-button>
      </div>
    </div>
    <div class="mu-handle-content flex flex-1 flex-column">
      <div class="mb20">
        <a-button type="primary" @click="showPop">添加</a-button>
      </div>
      <xl-search-table
        :data="table.data"
        :columns="table.columns"
        :total="table.total"
        @handleCurrentChange="handleCurrentChange"
      ></xl-search-table>
    </div>
    <a-modal :title="'创建'" :footer="null" v-model:open="open">
      <a-form
        ref="formRef"
        :model="form.ruleForm"
        :rules="form.rules"
        :label-col="{ span: 3 }"
      >
        <a-form-item ref="type" label="类型" name="type">
          <a-radio-group
            :options="typeOptions"
            v-model:value="form.ruleForm.type"
          />
        </a-form-item>
        <a-form-item
          v-if="form.ruleForm.type == 2"
          ref="menu_id"
          label="菜单"
          name="menu_id"
        >
          <a-select
            :options="menuListOptions"
            v-model:value="form.ruleForm.menu_id"
          />
        </a-form-item>
        <a-form-item ref="name" label="名称" name="name">
          <a-input v-model:value="form.ruleForm.name" />
        </a-form-item>
        <a-form-item ref="path" label="路径" name="path">
          <a-input v-model:value="form.ruleForm.path" />
        </a-form-item>

        <a-form-item ref="status" label="状态" name="status">
          <a-radio-group
            :options="statusOptions"
            v-model:value="form.ruleForm.status"
          />
        </a-form-item>
        <a-form-item class="form-bottom-box">
          <a-button type="primary" @click="onSubmit">保存</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { tableColumns } from "./menu.js";

export default {
  setup() {
    const formRef = ref(null);
    let menuListOptions = ref([]);
    let open = ref(false);
    let searchForm = ref({
      name: "",
      type: "",
      status: "",
      pageSize: 10,
      page: 1,
    });
    const statusOptions = reactive([
      {
        value: 1,
        label: "显示",
      },
      {
        value: 2,
        label: "隐藏",
      },
    ]);
    const typeOptions = reactive([
      {
        value: 1,
        label: "菜单",
      },
      {
        value: 2,
        label: "页面",
      },
    ]);
    let table = ref({
      data: [],
      columns: tableColumns,
      total: 0,
    });

    let form = ref({
      ruleForm: {
        menu_id: "",
        path: "",
        name: "",
        type: 1,
        status: 1,
      },
      rules: [],
    });

    const getMenuList = () => {};

    const resetSearchForm = () => {
      searchForm.value = {
        name: "",
        type: "",
        status: "",
        pageSize: 10,
        page: 1,
      };
      getMenuList();
    };

    const handleCurrentChange = (page) => {
      searchForm.value.page = page + 1;
      getMenuList();
    };

    const showPop = () => {
      open.value = true;
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log("values", ruleForm, toRaw(ruleForm));
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    onMounted(() => {
      getMenuList();
    });

    return {
      menuListOptions,
      typeOptions,
      statusOptions,
      searchForm,
      getMenuList,
      resetSearchForm,
      table,
      handleCurrentChange,
      open,
      showPop,
      form,
      formRef,
      onSubmit,
      resetForm,
    };
  },
};
</script>
