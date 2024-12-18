<template>
  <div>
    <vcc
      :initCodeEntity="codeInfoEntity"
      @updateCodeEntity="onCodeUpdate"
      @onLoadFinish="onLoadFinish"
      @save="save"
    ></vcc>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
// 以这样一段结构初始化VCC组件
const initCodeStr =
  '{"template":{"lc_id":"root","lc_uuid":"root","__children":[{"div":{"class":"container","lc_id":"container","lc_uuid":"container","__children":[]}}]}}';

const jsTem = `export default {
  setup() {
    let $data = toRefs({
    });

    return {
      ...$data,
    };
  },
};
`;

export default {
  components: {
    vcc: defineAsyncComponent(() => import("../../components-v2/vcc.vue")),
  },
  data() {
    return {
      codeInfoEntity: {
        codeStructure: "",
        JSCode: ``,
        mode: 1,
        css: ``,
        eventNode: {},
        customData: [],
      },
    };
  },
  mounted() {
    this.codeInfoEntity.JSCode = jsTem;
    this.codeInfoEntity.css = "";
    this.codeInfoEntity.codeStructure = JSON.parse(initCodeStr);
  },
  methods: {
    onCodeUpdate({ codeRawVueInfo, JSCode, css, eventNode }) {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
      // console.log("onCodeUpdate", codeRawVueInfo, JSCode, css, eventNode);
    },
    onLoadFinish() {},
    async save(code) {
      console.log(code);
    },
  },
};
</script>

<style lang="scss" scoped>
.vcc-detaiil-box {
  display: flex;
  .vcc-base-box {
    width: 100%;
    box-shadow: 0 1px 3px rgba(192, 198, 201, 0.3);
    .vcc-body-header {
      height: 42px;
      background: var(--search-bg-color);
      line-height: 42px;
      padding: 0 15px;
      font-weight: 600;
      font-size: 14px;
    }
    .vcc-body-content {
      padding: 20px;
    }
  }
}
</style>
