<template>
  <div class="top-tools-bar">
    <ul>
      <!-- <li>
        <a-button type="link"
          @click="$emit('undo')"
          style="margin-right: 3px"
        >
          <svg-icon icon-class="undo" />
        <a-button>
        <a-button type="primary" @click="$emit('redo')" class="ml5">
          <svg-icon icon-class="redo" />
        </<a-button>
      </li> -->
      <li>
        <a-button type="link" @click="onEditModeChange">
          <EyeOutlined v-if="editMode" />
          <EyeInvisibleOutlined v-else />

          {{ editMode ? "视图" : "编辑" }}
        </a-button>
      </li>
    </ul>
    <ul>
      <slot></slot>
      <li>
        <a-button type="link" @click="$emit('clear')">
          <DeleteOutlined />
          清空
        </a-button>
      </li>
      <li>
        <a-button type="link" @click="$emit('showVueDialogVisible')">
          <FormOutlined />
          Vue 编辑
        </a-button>
      </li>
      <li>
        <a-button type="link" @click="$emit('showCodeDialogVisible')">
          <EyeOutlined />
          查看实时代码
        </a-button>
      </li>
      <li>
        <a-button type="link" @click="$emit('save')">
          <SaveOutlined />
          保存
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";
import { h } from "vue";

export default {
  props: [],
  data() {
    return {
      h,
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
    notification() {},
  },
  fillter: {},
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
  ul {
    display: flex;
    flex-direction: row;
    margin: 0;
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
