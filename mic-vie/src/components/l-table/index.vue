<template>
  <div class="content-body">
    <el-table :data="data">
      <!-- 循环遍历生成表头 -->
      <template v-for="(col, index) in columns">
        <template v-if="!col.noEmptyValue">
          <el-table-column
            :key="index"
            :fixed="index == 0 ? true : false"
            :prop="`${col.prop}`"
            :label="`${col.label}`"
            :width="col.width || ''"
          />
        </template>
        <template v-else>
          <el-table-column
            :key="index"
            fixed="right"
            v-bind="col"
            :label="`${col.label}`"
            :width="col.width || ''"
          >
            <template #default="scope">
              <slot
                :name="col.prop || col.scope"
                :row="scope.row"
              ></slot>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div class="page-scroll mt20" v-if="isShowPagination">
      <el-pagination
        :page-size="pageSize"
        background
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    handleCurrentChange(e) {
      console.log(e)
      this.$emit("handleCurrentChange", e)
    }
  }
};
</script>
