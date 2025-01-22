<template>
  <a-card class="row-container" @click="(e) => e.stopPropagation">
    <div class="row-container-scrollbar"></div>
  </a-card>
</template>

<style lang="scss" scoped>
.row-container {
  width: 300px;
  display: flex;
  height: 100%;
  position: relative;
  .row-container-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .row-container-scrollbar {
    height: 100%;
    overflow-y: scroll;
    padding-right: 16px;
    :deep(.ant-collapse-content-box) {
      padding-right: 0;
    }
  }
  :deep(.ant-card-body) {
    width: 100%;
    padding-right: 0;
    box-sizing: border-box;
    overflow: hidden !important;
  }
  :deep(.ant-collapse) {
    background-color: transparent !important;
  }
  .left-tabs {
    position: relative;
  }
  .icon-box {
    height: 50px;
    position: absolute;
    left: 50px;
    bottom: 0;
    cursor: pointer;
    z-index: 10;
  }
}
.attribute-tabs {
  height: 100%;
  :deep(.ant-empty) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
  :deep(.ant-tabs-content-holder::-webkit-scrollbar) {
    width: 0;
    height: 0;
  }
  :deep(.ant-tabs-content) {
    height: 100%;
  }
  :deep(.ant-tabs-tabpane) {
    height: 100%;
  }
  :deep(.ant-tabs-content-holder) {
    height: 100%;
    overflow-y: scroll;
  }
}
.current-edit-info {
  width: 0px;
  height: 0px;
  overflow: hidden;
}
:deep(.ant-divider-horizontal) {
  margin: 0;
}
.data-ul {
  padding: 0 10px 0 10px;
  margin-top: 20px;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    .data-key {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      div {
        &:nth-child(2) {
          color: #ccc;
        }
      }
    }
    .data-right {
      width: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
