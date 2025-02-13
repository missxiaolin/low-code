<template>
  <div class="config-manager-page setting-panel-gui-box">
    <div class="title">{{ title }}</div>
    <div class="config-manager-body">
      <component v-if="com" :is="com" type="data"></component>
      <mic-panel title="静态数据" :isExpand="true" class="data-panel-box">
        <codeEditor
          v-if="isShowCodeEditor"
          style="height: 300px"
          :language="'json'"
          v-model:value="micData"
        />
      </mic-panel>
    </div>
  </div>
</template>

<script>
import { ref, inject, defineAsyncComponent, onMounted, watch } from "vue";
import { echartsConfig } from "../../_config/eIndex";
import codeEditor from "../../editor/index.vue";
import {
  attrStringToObj,
  attrObjToString,
  objectToArray,
} from "../utils/utils";

export default {
  components: {
    codeEditor,
  },
  props: {
    currentEditRawInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const isShowCodeEditor = ref(false);
    const micData = ref("[]");
    const com = ref(null);
    const mainPanelProvider = inject("mainPanelProvider");
    const rawObject = ref({});
    const title = ref("");
    const init = () => {
      isShowCodeEditor.value = false;
      if (props.currentEditRawInfo) {
        rawObject.value =
          props.currentEditRawInfo[Object.keys(props.currentEditRawInfo)[0]];
        title.value = rawObject.value.vccName;

        try {
          const c = defineAsyncComponent(() =>
            import(`./config/${rawObject.value.vccComponentName}Config.vue`)
          );
          com.value = c;
          const data = rawObject.value[":data"]
            ? attrStringToObj(rawObject.value[":data"]).source
            : echartsConfig[rawObject.value.vccComponentName].source;
          micData.value = data ? JSON.stringify(data) : "[]";
          setTimeout(() => {
            isShowCodeEditor.value = true;
          }, 10);
        } catch (error) {
          com.value = "";
        }
      }
    };

    watch(
      () => props.currentEditRawInfo,
      (newVal) => {
        init();
      }
    );

    const setEData = (val) => {
      const data = JSON.parse(val);
      const obj = {
        source: data,
      };
      rawObject.value[":data"] = attrObjToString(obj);
      mainPanelProvider.saveAttribute(
        objectToArray(rawObject.value),
        rawObject.value.lc_id
      );
    };

    watch(micData, (newVal) => {
      if (!newVal) {
        return;
      }
      setEData(newVal);
    });

    init();

    return {
      title,
      com,
      isShowCodeEditor,
      micData,
      setEData,
    };
  },
};
</script>

<style lang="scss" scoped>
.setting-panel-gui-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  &.setting-panel-gui-box::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .title {
    margin-top: 10px;
    padding-left: 10px;
    font-size: 14px;
  }
}
.data-panel-box {
  :deep(.mic-panel-body) {
    padding-top: 0px !important;
  }
}
</style>
