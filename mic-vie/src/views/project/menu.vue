<template>
  <div class="home-main">
    <div class="mu-search-container pall10">
      <a-row>
        <a-col :span="8">
          <mic-search-label :labelName="'名称'">
            <a-input v-model:value="searchForm.name" placeholder="请输入名称" />
          </mic-search-label>
        </a-col>
        <a-col :span="8">
          <mic-search-label :labelName="'分类'">
            <a-select
              v-model:value="searchForm.type"
              :options="typeOptions"
              placeholder="请选择分类"
            >
            </a-select>
          </mic-search-label>
        </a-col>
        <a-col :span="8">
          <mic-search-label :labelName="'状态'">
            <a-select
              v-model:value="searchForm.status"
              placeholder="请选择分类"
              :options="statusOptions"
            >
            </a-select>
          </mic-search-label>
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
      <mic-search-table
        :data="table.data"
        :columns="table.columns"
        :total="table.total"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #type="scope">
          {{ scope.row.type == 1 ? "菜单" : "按钮" }}
        </template>
        <template #status="scope">
          {{ scope.row.status == 1 ? "显示" : "隐藏" }}
        </template>
        <template #options="scope">
          <a-button link size="small" @click="edit(scope.row)"> 编辑 </a-button>
        </template>
      </mic-search-table>
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
          <a-select v-model:value="form.ruleForm.menu_id" allowClear>
            <!-- :options="menuListOptions" -->
            <a-select-option
              v-for="item in menuListOptions"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          ref="name"
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请输入名称!' }]"
        >
          <a-input v-model:value="form.ruleForm.name" />
        </a-form-item>
        <a-form-item
          v-if="form.ruleForm.type == 2"
          ref="path"
          label="路径"
          name="path"
          :rules="[{ required: true, message: '请输入路径!' }]"
        >
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
import { message } from "ant-design-vue";
import { tableColumns } from "./menu.js";
import { useGeneralStore } from "../../store/modules/project";
import {
  projectMenuAll,
  projectMenuList,
  projectMenuSave,
} from "../../api/menu.js";

export default {
  setup() {
    const generalStore = useGeneralStore();
    const projectId = generalStore.currentProjectId;
    const formRef = ref(null);
    let menuListOptions = ref([]);
    let open = ref(false);
    let searchForm = ref({
      projectId: Number(projectId),
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
        id: 0,
        project_id: Number(projectId),
        menu_id: "",
        path: "",
        name: "",
        type: 1,
        status: 1,
      },
      rules: [],
    });

    const getMenuList = async () => {
      let res = await projectMenuList({
        ...searchForm.value,
      });
      if (!res.success) {
        return;
      }
      table.value.data = res.model.list;
      table.value.total = res.model.count;
    };

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
      form.value.ruleForm = {
        id: 0,
        projectId: Number(projectId),
        menu_id: "",
        path: "",
        name: "",
        type: 1,
        status: 1,
      };
      open.value = true;
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          let res = await projectMenuSave({
            ...form.value.ruleForm,
            project_id: Number(projectId),
            menu_id:
              form.value.ruleForm.menu_id === ""
                ? 0
                : form.value.ruleForm.menu_id,
          });
          if (!res.success) {
            return;
          }
          open.value = false;
          getMenuList();
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const edit = (item) => {
      form.value.ruleForm = {
        id: item.id,
        menu_id: item.menu_id === 0 ? "" : item.menu_id,
        path: item.path,
        name: item.name,
        type: item.type,
        status: item.status,
      };
      open.value = true;
    };

    // 获取所有菜单
    const getMenuAllList = async () => {
      let res = await projectMenuAll({
        projectId,
      });
      if (!res.success) {
        return;
      }

      menuListOptions.value = res.model;
    };

    onMounted(() => {
      if (!projectId) {
        message.info("请先选择项目！");
        return;
      }
      getMenuAllList();
      getMenuList();
    });

    return {
      edit,
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
