<template>
  <div class="home-main">
    <div class="mu-search-container pall10">
      <a-row>
        <a-col :span="8">
          <mic-search-label :labelName="'名称'">
            <a-input v-model:value="searchForm.name" placeholder="请输入名称" />
          </mic-search-label>
        </a-col>
        <a-col :span="8"> </a-col>
        <a-col :span="8"> </a-col>
      </a-row>
      <div class="mu-search-form-button">
        <a-button @click="resetSearchForm">重置</a-button>
        <a-button type="primary" @click="getComponentList">查询</a-button>
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
          <a-button link size="small" @click="generate(scope.row)" class="ml10">
            发布
          </a-button>
        </template>
      </mic-search-table>
    </div>
    <!-- 组件添加 -->
    <a-modal
      v-model:open="componentFormOpen"
      @ok="saveComponent"
      title="组件"
      v-if="componentFormOpen"
    >
      <a-form
        :model="componentFormForm"
        :label-col="{ span: 4 }"
        ref="componentFormRef"
      >
        <a-form-item
          label="名称"
          name="name"
          :rules="[{ required: true, message: '名称必填!' }]"
        >
          <a-input v-model:value="componentFormForm.name" />
        </a-form-item>
        <a-form-item
          label="组件name"
          name="componentName"
          :rules="[{ required: true, message: '组件名称必填!' }]"
        >
          <a-input v-model:value="componentFormForm.componentName" />
        </a-form-item>
        <a-form-item
          label="组件内容"
          name="component"
          :rules="[{ required: true, message: '组件内容必填!' }]"
        >
          <a-textarea v-model:value="componentFormForm.component" />
        </a-form-item>
        <a-form-item
          label="组件属性"
          name="attribute"
          :rules="[{ required: true, message: '组件属性必填!' }]"
        >
          <!-- <a-textarea v-model:value="componentFormForm.attribute" /> -->
          <codeEditor
            style="height: 200px"
            :language="'json'"
            v-model:value="componentFormForm.attribute"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  componentList,
  componentSave,
  componentDetail,
  componentGenerate,
} from "../../api/component";
import codeEditor from "../../components/editor/index.vue";
import { ref, onMounted } from "vue";
import { tableColumns } from "./component.js";
import { useGeneralStore } from "../../store/modules/project";
export default {
  components: {
    codeEditor,
  },
  setup(props) {
    const generalStore = useGeneralStore();
    const componentFormOpen = ref(false);
    const componentFormRef = ref(null);
    const projectId = generalStore.currentProjectId;
    const componentFormForm = ref({
      id: 0,
      project_id: Number(projectId),
      name: "",
      componentName: "",
      component: "",
      attribute: "{}",
      version: "",
    });
    const searchForm = ref({
      name: "",
      pageSize: 10,
      projectId: Number(projectId),
      page: 1,
    });
    let table = ref({
      data: [],
      columns: tableColumns,
      total: 0,
    });

    const getComponentList = async () => {
      let res = await componentList(searchForm.value);
      if (!res.success) return;
      table.value.data = res.model.list || [];
      table.value.total = res.model.count;
    };
    const resetSearchForm = () => {
      searchForm.value = {
        name: "",
        pageSize: 10,
        page: 1,
      };
      getComponentList();
    };

    const showPop = () => {
      componentFormForm.value = {
        id: 0,
        project_id: Number(projectId),
        name: "",
        componentName: "",
        component: "",
        attribute: `{"component":[],"style":["width","height"],"customComponent":{"base":{"title":"基础","children":[]},"event":{"title":"事件","children":[]}}}`,
        version: "",
      };
      componentFormOpen.value = true;
    };

    const edit = async (row) => {
      componentFormForm.value = {
        id: row.id,
        project_id: row.project_id,
        name: row.name,
        componentName: row.componentName,
        component: row.component,
        attribute: row.attribute,
        version: "",
      };
      componentFormOpen.value = true;
    };

    const saveComponent = () => {
      componentFormRef.value
        .validate()
        .then(async () => {
          let res = await componentSave(componentFormForm.value);
          if (!res.success) return;
          componentFormOpen.value = false;
          getComponentList();
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const handleCurrentChange = (page) => {
      searchForm.value.page = page + 1;
      getMenuList();
    };

    const generate = async (row) => {
      let res = await componentGenerate({
        projectId: projectId,
        id: row.id,
      });
      if (!res.success) return;
      getComponentList();
    };

    onMounted(() => {
      getComponentList();
    });

    return {
      searchForm,
      resetSearchForm,
      table,
      showPop,
      edit,
      getComponentList,
      handleCurrentChange,
      componentFormOpen,
      componentFormRef,
      componentFormForm,
      saveComponent,
      generate,
    };
  },
};
</script>
