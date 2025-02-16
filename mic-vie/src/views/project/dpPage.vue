<template>
  <div class="home-main">
    <div class="mu-search-container pall10">
      <a-row>
        <a-col :span="8">
          <mic-search-label :labelName="'名称'">
            <a-input
              v-model:value="searchForm.name"
              placeholder="请输入路由名称"
            />
          </mic-search-label>
        </a-col>
        <a-col :span="8"> </a-col>
        <a-col :span="8"></a-col>
      </a-row>
      <div class="mu-search-form-button">
        <a-button @click="resetForm">重置</a-button>
        <a-button type="primary" @click="getPage">查询</a-button>
      </div>
    </div>
    <div class="mu-handle-content flex flex-1 flex-column">
      <div class="mb20">
        <a-button type="primary" @click="showPop">创建大屏</a-button>
        <a-modal v-model:open="isShow" @ok="addFormSave" title="创建大屏">
          <a-form :model="addForm">
            <a-form-item label="名称">
              <a-input v-model:value="addForm.name" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <mic-search-table
        :data="table.data"
        :columns="table.columns"
        :total="table.total"
        @handleCurrentChange="handleCurrentChange"
      >
        <template #options="scope">
          <a-button link size="small" @click="goVcc(scope.row.id)">
            编辑
          </a-button>
        </template>
      </mic-search-table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { tableColumns } from "./dpPage.js";
import { pageRouteSave, pageRouteList } from "../../api/dpPage";
import { useGeneralStore } from "../../store/modules/project";
const generalStore = useGeneralStore();
export default {
  name: "dpPage",
  setup() {
    const projectId = generalStore.currentProjectId;
    const router = useRouter();
    const isShow = ref(false);
    const addForm = ref({
      project_id: projectId,
      name: "",
      tem_json: `{"template":{"lc_id":"root","__children":[{"div":{"class":"container","id": "vcc-container","style": "width: 1920px; height: 1080px;background-color: #142A41;position: relative;","lc_id":"container","__children":[]}}]}}`,
      script_json: `export default {
    setup() {

      return {};
    },
  };`,
      css: "",
      eventNode: "[]",
      customData: "[]",
      status: 2,
    });
    const route = useRoute();
    let searchForm = ref({
      projectId: projectId,
      name: "",
      pageSize: 10,
      page: 1,
    });
    const resetForm = () => {
      searchForm.value = {
        projectId: projectId,
        name: "",
        pageSize: 10,
        page: 1,
      };
    };
    let table = ref({
      data: [],
      columns: tableColumns,
      total: 0,
    });

    const showPop = () => {
      isShow.value = true;
      addForm.value.name = "";
    };

    const addFormSave = async () => {
      if (addForm.value.name == "") {
        return;
      }
      const res = await pageRouteSave(addForm.value);
      if (!res.success) {
        return;
      }
      isShow.value = false;
      window.open(`/dp/form?id=${res.model}&projectId=${projectId}`);
      getPage();
      //   router.push({
      //     path: "/dp/form",
      //     query: {
      //       id: res.model,
      //     },
      //   });
    };

    const getPage = async () => {
      let param = searchForm.value;
      let res = await pageRouteList(param);
      if (!res.success) {
        return;
      }
      table.value.data = res.model.list;
      table.value.total = res.model.count;
    };

    const handleCurrentChange = (page) => {};

    const goVcc = (id) => {
      window.open(`/dp/form?id=${id}&projectId=${projectId}`);
    };

    onMounted(() => {
      getPage();
    });

    return {
      addFormSave,
      searchForm,
      resetForm,
      getPage,
      goVcc,
      table,
      handleCurrentChange,
      showPop,
      isShow,
      addForm,
    };
  },
};
</script>
