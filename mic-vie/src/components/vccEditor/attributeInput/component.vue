<template>
  <div class="config-manager-page setting-panel-gui-box">
    <div class="title">{{ title }}</div>
    <div class="config-manager-body">
      <ul>
        <li>
          <div class="label">图表尺寸：</div>
          <div class="content-item-content">
            <mic-number
              classWrap="item-5"
              v-model:value="posObj.width"
              label="宽度"
              @change="(e) => handleUpdate(posObj, ':defaultStyle')"
              prefix="px"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              v-model:value="posObj.height"
              label="高度"
              prefix="px"
              @change="(e) => handleUpdate(posObj, ':defaultStyle')"
            ></mic-number>
          </div>
        </li>
        <li>
          <div class="label">图表位置：</div>
          <div class="content-item-content">
            <mic-number
              classWrap="item-5"
              v-model:value="posObj.left"
              label="距离左边"
              prefix="px"
              @change="(e) => handleUpdate(posObj, ':defaultStyle')"
            ></mic-number>
            <mic-number
              classWrap="item-5"
              v-model:value="posObj.top"
              label="距离顶部"
              prefix="px"
              @change="(e) => handleUpdate(posObj, ':defaultStyle')"
            ></mic-number>
          </div>
        </li>
      </ul>
      <component v-if="com" :is="com"></component>
    </div>
  </div>
</template>

<script>
import { ref, inject, defineAsyncComponent, onMounted, watch } from "vue";
import {
  attrStringToObj,
  attrObjToString,
  objectToArray,
} from "../utils/utils";

export default {
  props: {
    currentEditRawInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const com = ref(null);
    const mainPanelProvider = inject("mainPanelProvider");
    const rawObject = ref({});
    const title = ref("");
    const posObj = ref({});
    const init = () => {
      if (props.currentEditRawInfo) {
        rawObject.value =
          props.currentEditRawInfo[Object.keys(props.currentEditRawInfo)[0]];
        title.value = rawObject.value.vccName;
        posObj.value = attrStringToObj(rawObject.value[":defaultStyle"]);

        try {
          const c = defineAsyncComponent(() =>
            import(`./config/${rawObject.value.vccComponentName}Config.vue`)
          );
          com.value = c;
        } catch (error) {
          com.value = "";
        }
      }
    };

    const handleUpdate = (e, key) => {
      rawObject.value[key] = `${attrObjToString(e)}`;
      mainPanelProvider.saveAttribute(
        objectToArray(rawObject.value),
        rawObject.value.lc_id
      );
    };

    watch(props, (newVal) => {
      init();
    });

    onMounted(() => {
      init();
    });

    return {
      title,
      posObj,
      handleUpdate,
      com,
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
</style>
