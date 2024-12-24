<template>
  <div class="vue-home-main">
    <div class="mu-search-container pall10">
      <a-row>
        <a-col :span="8">
          <search-label :labelName="'项目名称'">
            <a-input
              v-model:value="searchForm.name"
              placeholder="请输入项目名称"
            />
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
        <a-button @click="resetForm">重置</a-button>
        <a-button type="primary" @click="getProjectList">查询</a-button>
      </div>
    </div>

    <div class="mu-handle-content flex flex-1 flex-column">
      <div class="mb20">
        <xl-pop
          :btn-text="'创建项目'"
          :title="'项目'"
          :detail="projectDetail"
          :form-save-btn="'保存'"
          :btn-pop-form="popForm"
          :dialog-visible="dialogVisible"
          :disabled="formDisbled"
          :is-show-bottom-btn="popShowBottomBtn"
          @popClick="popClick"
          @success="popSuccess"
        ></xl-pop>
      </div>
      <xl-search-table
        :data="table.data"
        :columns="table.columns"
        :total="table.total"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #status="scope">
          {{
            scope.row.status == 1
              ? "禁用"
              : scope.row.status == 2
              ? "启用"
              : "发布中"
          }}
        </template>
        <template #options="scope">
          <a-button link size="small" @click="edit(scope.row)"> 编辑 </a-button>
          <a-button link size="small" @click="detail(scope.row)" class="ml10">
            详情
          </a-button>
          <a-button
            link
            size="small"
            @click="goRoutePage(scope.row)"
            class="ml10"
          >
            路由配置
          </a-button>
          <a-button link size="small" @click="generate(scope.row)" class="ml10">
            发布
          </a-button>
        </template>
      </xl-search-table>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { projectSave, projectList, projectGenerate } from "../../api/project";
import { btnPopForm, tableColumns } from "./list.js";
import { useGeneralStore } from "../../store/modules/project.js";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export default {
  setup(props) {
    const generalStore = useGeneralStore();
    const router = useRouter();
    let projectDetail = ref({});
    let dialogVisible = ref(false);
    let formDisbled = ref(false);
    let popShowBottomBtn = ref(true);
    const popForm = ref(btnPopForm);
    let table = ref({
      data: [],
      columns: tableColumns,
      total: 0,
    });
    const typeOptions = reactive([
      {
        value: "1",
        label: "电脑端",
      },
      {
        value: "2",
        label: "移动端",
      },
    ]);
    const statusOptions = reactive([
      {
        value: "1",
        label: "禁用",
      },
      {
        value: "2",
        label: "启用",
      },
    ]);
    const searchForm = ref({
      name: "",
      type: "",
      status: "",
      pageSize: 10,
      page: 1,
    });

    const getProjectList = async () => {
      let res = await projectList(searchForm.value);
      if (!res.success) {
        return;
      }
      table.value.data = res.model.list;
      table.value.total = res.model.count;
    };

    const resetForm = () => {
      searchForm.value = {
        name: "",
        type: "",
        status: "",
        pageSize: 10,
        page: 1,
      };
      getProjectList();
    };

    const handleCurrentChange = (page) => {
      searchForm.value.page = page + 1;
      getProjectList();
    };

    const popClick = (e) => {
      dialogVisible.value = e;
      projectDetail.value = {};
      formDisbled.value = false;
      popForm.value[1].disabled = false;
      popShowBottomBtn.value = true;
    };

    const edit = (e) => {
      popForm.value[1].disabled = true;
      projectDetail.value = e;
      popShowBottomBtn.value = true;
      dialogVisible.value = true;
    };

    const detail = (e) => {
      projectDetail.value = e;
      dialogVisible.value = true;
      formDisbled.value = true;
      popShowBottomBtn.value = false;
    };

    const popSuccess = async (e) => {
      let data = JSON.parse(JSON.stringify(e));
      if (projectDetail.value && projectDetail.value.id) {
        data.id = projectDetail.value.id;
      }
      let res = await projectSave(data);
      if (!res.success) {
        message.error(res.errorMessage);
        return;
      }
      generalStore.getValidProject();
      message.success(data.id ? "修改成功" : "添加成功");
      projectDetail.value = {};
      dialogVisible.value = false;
      getProjectList();
    };

    const goRoutePage = (item) => {
      router.push({
        path: "/project/page",
        query: {
          projectId: item.id,
        },
      });
    };

    const generate = async (item) => {
      let res = await projectGenerate({
        id: item.id,
      });
      if (!res.success) {
        message.error(res.errorMessage);
        return;
      }
      message.success("项目发布中");
      getProjectList();
    };

    onMounted(() => {
      getProjectList();
    });

    return {
      generate,
      goRoutePage,
      popClick,
      edit,
      detail,
      popShowBottomBtn,
      projectDetail,
      popForm,
      table,
      typeOptions,
      statusOptions,
      searchForm,
      resetForm,
      formDisbled,
      popClick,
      dialogVisible,
      popSuccess,
      getProjectList,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.vue-home-main {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
