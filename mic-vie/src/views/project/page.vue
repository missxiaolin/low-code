<template>
  <div class="vue-page-main">
    <div class="mu-search-container pall10">
      <a-row>
        <a-col :span="8">
          <search-label :labelName="'路由名称'">
            <a-input
              v-model:value="searchForm.route_name"
              placeholder="请输入路由名称"
            />
          </search-label>
        </a-col>
        <a-col :span="8">
          <search-label :labelName="'路由路径'">
            <a-input
              v-model:value="searchForm.path"
              placeholder="请输入路由路径"
            />
          </search-label>
        </a-col>
        <a-col :span="8"></a-col>
      </a-row>
      <div class="mu-search-form-button">
        <a-button @click="resetForm">重置</a-button>
        <a-button type="primary" @click="getPage">查询</a-button>
      </div>
    </div>
    <div class="mu-handle-content flex flex-1 flex-column">
      <div class="mb20">
        <a-button type="primary" @click="goVcc(0)">创建路由</a-button>
      </div>
      <xl-search-table
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
      </xl-search-table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { pageRouteList } from "../../api/page";
import { tableColumns } from "./page.js";

export default {
  name: "page",
  setup() {
    const router = useRouter();
    const route = useRoute();
    let searchForm = ref({
      projectId: Number(route.query.projectId) || 0,
      route_name: "",
      path: "",
      pageSize: 10,
      page: 1,
    });
    let table = ref({
      data: [],
      columns: tableColumns,
      total: 0,
    });
    onMounted(() => {});

    const goVcc = (id = 0) => {
      window.open("/form?projectId=" + route.query.projectId + "&pageId=" + id);
      // router.push({
      //   path: "/form",
      //   query: {
      //     projectId: route.query.projectId,
      //     pageId: id,
      //   },
      // });
    };

    const resetForm = () => {
      searchForm.value = {
        projectId: 0,
        route_name: "",
        path: "",
        pageSize: 10,
        page: 1,
      };
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

    const handleCurrentChange = (page) => {
      searchForm.value.page = page + 1;
      getProjectList();
    };

    onMounted(() => {
      getPage();
    });

    return {
      goVcc,
      searchForm,
      resetForm,
      getPage,
      table,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.vue-page-main {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 1;
}
</style>
