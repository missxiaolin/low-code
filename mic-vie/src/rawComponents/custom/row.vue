<template lc_id="FnLP+KMf1S">
  <div class="vcc-column-ul" lc_id="0IVyx2rzvA">
    <div class="column-li" lc-mark lc_id="LjfMKyUFO7">
      <img
        class="li-img max-img"
        src="../../assets/img/custom-form.png"
        alt
        lc_id="yoMLS3E95x"
      />
      <div class="title" lc_id="vSzA1wZphy">表单组件</div>
      <div class="li-mark-content" lc_id="nuB8PjgWQH">
        <l-form
          :form="formItem"
          :span="8"
          @success="formSuccess"
          lc_id="Cib8KAOhoO"
        ></l-form>
      </div>
    </div>
    <div class="column-li" lc-mark lc_id="fPacU7/1gd">
      <img
        class="li-img max-img"
        src="../../assets/img/form-search.png"
        alt
        lc_id="NhPtGUouGv"
      />
      <div class="title" lc_id="XuZ90HDddh">搜索表单组件</div>
      <div class="li-mark-content" lc_id="nuB8PjgWQH">
        <l-s-form
          :form="sFormItem"
          :span="8"
          @success="sFormSuccess"
          lc_id="xB2AIRewX5"
        ></l-s-form>
      </div>
    </div>
    <div class="column-li" lc-mark lc_id="A+fndT7/cq">
      <img
        class="li-img max-img"
        src="../../assets/img/form-search.png"
        alt
        lc_id="UxoQQiVIWy"
      />
      <div class="title" lc_id="34buRE/x5n">表格组件</div>
      <div class="li-mark-content" lc_id="nuB8PjgWQH">
        <l-table
          :data="tableData"
          :columns="columns"
          :page-size="pageSize"
          :total="pageTotal"
          @handleCurrentChange="handleCurrentChange"
          lc_id="l/pSi+VFnx"
        ></l-table>
      </div>
    </div>
    <div class="column-li" lc-mark lc_id="GP1I6H4euv">
      <img
        class="li-img max-img"
        src="../../assets/img/cc.png"
        alt
        lc_id="WcWJu5xT21"
      />
      <div class="title" lc_id="ehb8xB56H6">插槽</div>
      <div class="li-mark-content" lc_id="PK82+5iDwB">
        <template lc_id="9j3AVQuXGS"></template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItem: [],
      sFormItem: [],
      tableData: [],
      columns: [],
      pageSize: 10,
      pageTotal: 1,
    };
  },
  methods: {
    formSuccess(data) {
      console.log(data);
    },
    sFormSuccess(data) {
      console.log(data);
    },
    handleCurrentChange(e) {},
  },
};
</script>
