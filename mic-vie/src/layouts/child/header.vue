<template>
  <div class="header-animat">
    <div></div>
    <!-- <RedoOutlined class="trigger" /> -->
    <div class="header-animat-right">
      <!-- <QuestionCircleOutlined class="help" /> -->
      <a-avatar class="header-animat-avatar" :size="22">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <div class="header-animat-username">admin</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header-animat",
  setup() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-animat {
  width: 100%;
  height: 64px;
  background-color: var(--v3-header-bg-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--ve-header-animat) !important;
  .trigger {
    font-size: 20px !important;
    margin-left: 20px;
  }
  .header-animat-right {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .help {
    font-size: 14px !important;
    margin-right: 20px;
  }
  .header-animat-avatar {
    margin-right: 10px;
  }
  .header-animat-username {
    margin-right: 30px;
  }
}
</style>
