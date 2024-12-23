<template>
  <div class="vcc-detaiil-box" v-if="isShowVcc">
    <vcc
      :initCodeEntity="codeInfoEntity"
      @updateCodeEntity="onCodeUpdate"
      @onLoadFinish="onLoadFinish"
      @save="save"
    >
      <template v-slot:toole>
        <toolePage :pageForm="pageForm" @success="toolePageSuccess"></toolePage>
      </template>
    </vcc>
  </div>
</template>

<script>
import { pageRouteSave, pageRouteDetail } from "../../api/page";
import { message } from "ant-design-vue";
import toolePage from "./components/toolePage.vue";
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
    toolePage,
  },
  data() {
    return {
      projectId: 0,
      pageForm: {
        id: 0,
        route_name: "",
        path: "",
        status: 2,
      },
      isShowVcc: false,
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
    this.projectId = Number(this.$route.query.projectId) || 0;
    this.pageForm.id = Number(this.$route.query.pageId) || 0;
    this.init();
  },
  methods: {
    async init() {
      if (!this.pageForm.id || this.pageForm.id === 0) {
        this.codeInfoEntity.JSCode = jsTem;
        this.codeInfoEntity.css = "";
        this.codeInfoEntity.codeStructure = JSON.parse(initCodeStr);
        this.isShowVcc = true;
        return;
      }
      let res = await pageRouteDetail({
        id: this.pageForm.id,
        projectId: this.projectId,
      });
      if (!res.success) {
        message.error(res.errorMessage);
        return;
      }
      const model = res.model;
      this.pageForm = {
        id: model.id,
        route_name: model.route_name,
        path: model.path,
        status: model.status,
      };
      this.codeInfoEntity.JSCode = model.script_json;
      this.codeInfoEntity.css = model.css;
      this.codeInfoEntity.codeStructure = JSON.parse(model.tem_json);
      this.codeInfoEntity.eventNode = JSON.parse(model.eventNode);
      this.codeInfoEntity.customData = JSON.parse(model.customData);
      this.isShowVcc = true;
    },
    onCodeUpdate({ codeRawVueInfo, JSCode, css, eventNode, customData }) {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
      // console.log("onCodeUpdate", codeRawVueInfo, JSCode, css, eventNode);
    },
    onLoadFinish() {},
    async save(obj) {
      if (!this.pageForm.route_name || !this.pageForm.path) {
        return message.error("请先设置页面信息！！！");
      }
      const data = {
        id: this.pageForm.id,
        project_id: this.$route.query.projectId,
        route_name: this.pageForm.route_name,
        path: this.pageForm.path,
        status: this.pageForm.status,
        tem_json: JSON.stringify(obj.codeRawVueInfo),
        script_json: obj.JSCode,
        page_html: obj.code,
        css: obj.css,
        eventNode: JSON.stringify(obj.eventNode),
        customData: JSON.stringify(obj.customData),
      };
      let res = await pageRouteSave(data);
      if (!res.success) {
        message.error(res.errorMessage);
        return;
      }
      message.success("保存成功");
      setTimeout(() => {
        this.$router.push({
          path: "/project/page",
          query: {
            projectId: this.$route.query.projectId,
          },
        });
      }, 2000);
    },
    toolePageSuccess(e) {
      this.pageForm = {
        route_name: e.route_name,
        path: e.path,
        status: e.status,
      };
    },
  },
  // watch: {
  //   isShowVcc(val) {
  //     if (val) {
  //       this.codeInfoEntity.codeStructure = JSON.parse(initCodeStr);
  //     }
  //   },
  // },
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
