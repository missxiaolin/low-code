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
            >
              <a-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </a-select>
          </search-label>
        </a-col>
      </a-row>
      <div class="mu-search-form-button">
        <a-button @click="resetForm">重置</a-button>
        <a-button type="primary" @click="getProjectList">查询</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup(props) {
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
    const searchForm = reactive({
      name: "",
      type: "",
      status: "",
      pageSize: 10,
      page: 1,
    });

    const getProjectList = () => {};

    const resetForm = () => {
      searchForm = {
        name: "",
        type: "",
        status: "",
        pageSize: 10,
        page: 1,
      };
      getProjectList();
    };

    return {
      typeOptions,
      searchForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.vue-home-main {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
