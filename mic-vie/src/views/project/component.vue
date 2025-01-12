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
        <a-col :span="8"> < </a-col>
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
        </template>
      </mic-search-table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { tableColumns } from "./component.js";
export default {
  setup(props) {
    const searchForm = {
      name: "",
      pageSize: 10,
      page: 1,
    };
    let table = ref({
      data: [],
      columns: tableColumns,
      total: 0,
    });

    const getComponentList = () => {};
    const resetSearchForm = () => {
      searchForm.value = {
        name: "",
        pageSize: 10,
        page: 1,
      };
      getComponentList();
    };

    const showPop = () => {};

    const handleCurrentChange = (page) => {
      searchForm.value.page = page + 1;
      getMenuList();
    };

    return {
      searchForm,
      resetSearchForm,
      table,
      showPop,
      getComponentList,
      handleCurrentChange,
    };
  },
};
</script>
