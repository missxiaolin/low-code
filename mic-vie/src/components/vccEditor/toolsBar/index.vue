<template>
  <div class="top-tools-bar">
    <ul>
      <li>
        <a-button type="link" @click="onEditModeChange">
          <EyeOutlined v-if="editMode" />
          <EyeInvisibleOutlined v-else />

          {{ editMode ? "视图" : "编辑" }}
        </a-button>
      </li>
    </ul>
    <ul>
      <li>
        <a-button type="link" @click="showCodeDialogVisible">
          <EyeOutlined />
          查看实时代码
        </a-button>
      </li>
      <li>
        <a-button type="link" @click="save">
          <SaveOutlined />
          保存
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["showCodeDialogVisible", "save"],
  setup(props, { emit }) {
    const editMode = ref(true);

    const onEditModeChange = () => {};
    const save = () => {
      emit("save");
    };
    const showCodeDialogVisible = () => {
      emit("showCodeDialogVisible");
    };
    return {
      editMode,
      onEditModeChange,
      showCodeDialogVisible,
      save,
    };
  },
};
</script>

<style lang="scss" scoped>
.top-tools-bar::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.top-tools-bar {
  overflow-x: scroll;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  border-radius: 0px;
  align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 99;
  background-color: #1d1e1f;
  ul {
    display: flex;
    flex-direction: row;
    margin: 0px !important;
    li {
      margin-right: 20px;
    }
  }
}
.edit {
  display: inline-block;
}
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
