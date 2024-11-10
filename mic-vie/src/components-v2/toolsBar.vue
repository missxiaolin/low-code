<template>
  <div class="top-tools-bar">
    <ul>
      <!-- <li>
        <el-link
          type="primary"
          @click="$emit('undo')"
          style="margin-right: 3px"
        >
          <svg-icon icon-class="undo" />
        </el-link>
        <el-link type="primary" @click="$emit('redo')" class="ml5">
          <svg-icon icon-class="redo" />
        </el-link>
      </li> -->
      <li>
        <el-link
          :type="editMode ? 'primary' : 'danger'"
          @click="onEditModeChange"
        >
          <el-icon class="mr5"><View v-if="editMode" /><Edit v-else /></el-icon
          >{{ editMode ? "视图" : "编辑" }}
        </el-link>
      </li>
      <li>
        <el-link type="primary" @click="$emit('structureVisible')">
          <el-icon class="mr5"><Guide /></el-icon>结构树
        </el-link>
      </li>
    </ul>
    <ul>
      <li>
        <el-link type="primary" @click="$emit('clear')">
          <el-icon class="mr5"><Delete /></el-icon>
          清空
        </el-link>
      </li>
      <li>
        <el-link type="primary" @click="$emit('showVueDialogVisible')">
          <el-icon class="mr5"><Edit /></el-icon>
          Vue 二次编辑
        </el-link>
      </li>
      <li>
        <el-link type="primary" @click="$emit('showCssDialogVisible')">
          <el-icon class="mr5"><Edit /></el-icon>
          编辑Css
        </el-link>
      </li>
      <li>
        <el-link type="primary" @click="$emit('showJsDialogVisible')">
          <el-icon class="mr5"><Edit /></el-icon>
          编辑JS逻辑
        </el-link>
      </li>
      <li>
        <el-link type="primary" @click="$emit('showCodeDialogVisible')">
          <el-icon class="mr5"><View /></el-icon>
          查看实时代码
        </el-link>
      </li>
      <li>
        <el-link type="primary" @click="$emit('save')">
          <el-icon class="mr5"><Document /></el-icon>
          保存
        </el-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  props: [],
  components: {},
  data() {
    return {
      previewMode: false,
      editMode: true,
    };
  },
  watch: {},
  computed: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  methods: {
    // 在此自动生成
    request() {
      // 网络请求，可选
    },
    logout() {
      window.ssoLogin.logout();
    },

    onPreviewModeChange() {
      this.previewMode = !this.previewMode;
      this.$emit("onPreviewModeChange", this.previewMode);
    },

    onEditModeChange() {
      this.editMode = !this.editMode;
      this.$emit("onEditModeChange", this.editMode);

      setTimeout(() => {
        this.editMode = true;
      }, 500);
    },
    notification() {
      ElNotification({
        message: "暂未开发",
        type: "warning",
      });
    },
  },
  fillter: {},
};
</script>

<style lang="scss" scoped>
.top-tools-bar {
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  border-radius: 0px;
  align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ul {
    display: flex;
    flex-direction: row;
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
