<template>
  <div class="editor-box">
    <div id="editor" class="editor" ref="editorRef">
      <!-- 拖拽 -->
      <shape>
        <div class="component div">1111</div>
      </shape>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import shape from "./shape/index.vue";
export default {
  components: {
    shape,
  },
  setup(props) {
    const editorRef = ref(null);

    return {
      editorRef,
    };
  },
};
</script>

<style scoped lang="scss">
.editor-box {
  width: 100%;
  min-height: 100%;
  .editor {
    width: 100%;
    height: 100%;
  }
}
.editor .component {
  position: absolute;
  left: 0;
  top: 0;
}
.div {
  width: 200px;
  height: 200px;
  border: solid 1px #fff;
}
</style>
