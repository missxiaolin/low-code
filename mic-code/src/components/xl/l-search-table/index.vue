<template>
  <div class="content-body">
    <a-table :dataSource="data" :columns="columns" :pagination="false" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.prop || column.scope">
          <slot :name="column.prop || column.scope" :row="record"></slot>
        </template>
        <template v-else>
          {{ record[column.key] }}
        </template>
      </template>
    </a-table>
    <div class="page-scroll mt20" v-if="isShowPagination">
      <a-pagination
        show-quick-jumper
        @change="onChange"
        :pageSize="pageSize"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "micSearchTable",
  props: {
    // 表格数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => [],
    },
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  emits: ["handleCurrentChange"],
  setup(props, { emit }) {
    const onChange = (page) => {
      emit("handleCurrentChange", page);
    };
    return {
      onChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-scroll {
  display: flex;
  flex-direction: row;
  justify-content: end;
  overflow: hidden;
}
</style>
