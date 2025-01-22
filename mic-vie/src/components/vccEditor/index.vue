<template>
  <div class="editor-box vcc-main">
    <div class="vcc-component"></div>
    <div id="editor" class="editor" ref="editorRef">
      <!-- 拖拽 -->
      <shape :defaultStyle="defaultStyle" @change="change">
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
    let defaultStyle = ref({
      top: 20,
      left: 20,
      height: 300,
      width: 300,
    });
    const editorRef = ref(null);

    const change = (data) => {
      if (!data) return;
      console.log(data);
      defaultStyle.value = data;
    };

    return {
      editorRef,
      defaultStyle,
      change,
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
.vcc-main {
  padding: 10px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.editor .component {
  position: static !important;
}
.div {
  width: 100%;
  height: 100%;
  border: solid 1px #fff;
}
</style>
