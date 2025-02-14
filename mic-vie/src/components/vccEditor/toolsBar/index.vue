<template>
  <div class="datav-header">
    <!-- <div class="head-btn-group view-btn-group">
      <a-tooltip>
        <template #title>预览</template>
        <div class="head-btn">
          <EyeOutlined />
        </div>
      </a-tooltip>
    </div> -->
    <div class="datav-edit-header">
      <div class="editor-header-wp">
        <div class="editor-config">
          <a-tooltip>
            <template #title>图层</template>
            <div class="head-btn">
              <ClusterOutlined @click="onShowLayer" />
            </div>
          </a-tooltip>
          <a-tooltip>
            <template #title>预览</template>
            <div class="head-btn">
              <EyeOutlined />
            </div>
          </a-tooltip>
        </div>
      </div>
      <div class="screen-info">
        <span>{{ "可视化大屏编辑器" }}</span>
      </div>
      <div class="global-actions">
        <a-tooltip>
          <template #title>查看实时代码</template>
          <div class="head-btn">
            <EyeOutlined @click="showCodeDialogVisible" />
          </div>
        </a-tooltip>
        <a-tooltip>
          <template #title>保存</template>
          <div class="head-btn">
            <SaveOutlined @click="save" />
          </div>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["showCodeDialogVisible", "save", "onShowLayer"],
  setup(props, { emit }) {
    const editMode = ref(true);

    const onEditModeChange = () => {};
    const save = () => {
      emit("save");
    };
    const showCodeDialogVisible = () => {
      emit("showCodeDialogVisible");
    };

    const onShowLayer = () => {
      emit("onShowLayer");
    };
    return {
      onShowLayer,
      editMode,
      onEditModeChange,
      showCodeDialogVisible,
      save,
    };
  },
};
</script>

<style lang="scss" scoped>
.datav-header {
  width: 100%;
  position: relative;
  height: 40px;
  padding-right: 8px;
  display: flex;
  z-index: 100;
  align-items: center;
  user-select: none;
  color: #a1aeb3;
  border-bottom: 1px solid #000;
  background: #1d1e1f;

  .view-btn-group {
    margin: 0 15px;
    z-index: 1;
  }
}
.head-btn-group {
  display: flex;
  box-sizing: border-box;
  background: #1d1e1f;
  border: 1px solid rgb(255 235 235 / 10%);
  box-shadow: 0 0 0 1px #181818;

  .head-btn {
    width: 45px;
    border-radius: 0;
    box-shadow: none;
    height: 22px;
    padding: 3px 0;
    border-left: 1px solid transparent;
  }
}

.head-btn {
  width: 40px;
  height: 25px !important;
  padding: 4px 0;
  text-align: center;
  cursor: pointer;
  background: #303640;
  box-shadow: inset 0 0 0 1px rgb(255 235 235 / 10%), 0 0 0 1px #181818;
  transition: 0.2s;

  .head-btn-icon {
    color: #fff;

    &:not(:first-child) {
      border-left: 1px solid rgb(255 235 235 / 10%);
    }

    &.--rotate {
      animation: com-rotate 2s infinite;
      animation-direction: alternate-reverse;
    }
  }

  &:not(.--disabled):hover {
    background: #414750;
  }

  &.--selected {
    background: #2681ff;

    & + .head-btn {
      border-left-color: transparent;
    }

    &:not(.--disabled):hover {
      background: #2681ff;
    }
  }

  &.--disabled {
    cursor: not-allowed;

    .head-btn-icon {
      opacity: 0.2;
    }
  }
}

.datav-edit-header {
  width: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  height: 40px;
  z-index: 100;
  .editor-header-wp {
    display: flex;
    overflow: hidden;
    transition: width 0.3s ease;
  }
  .editor-config {
    display: flex;
    width: 300px;
    align-items: center;
    transition: 0.3s ease;
    .head-btn {
      margin-right: 5px;
    }
  }
  .screen-info {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    text-align: center;
    cursor: default;
    max-width: 500px;
    color: #fff;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .workspace-icon {
      margin-right: 8px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .global-actions {
    position: absolute;
    top: 0;
    right: 8px;
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    .head-btn {
      margin-right: 5px;
    }
  }
}
</style>
