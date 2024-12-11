<template>
  <div class="attribute-component-box">
    <div class="attribute-seeting-content" v-if="list.length > 0">
      <div
        class="attribute-seeting-content-item"
        v-for="(v, key) in list"
        :key="key"
      >
        <div
          class="attribute-seeting-content-title"
          v-if="v.title && v.children && v.children.length > 0"
        >
          {{ v.title }}
        </div>
        <template v-if="v.children && v.children.length > 0">
          <div
            class="attribute-seeting-content-content"
            v-for="(item, index) in v.children"
            :key="index"
          >
            <div class="label">
              {{ item.label }}：<a-tooltip placement="topLeft" v-if="item.tip">
                <template #title>
                  <span>{{ item.tip }}</span>
                </template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </div>
            <div class="attribute-seeting-content-item-content">
              <a-input
                v-if="item.settingType == 'input'"
                v-model:value="item.value"
                @blur="
                  (e) => {
                    handleBlur(e.srcElement.value, item.key);
                  }
                "
              ></a-input>
              <vue3-color-picker
                v-if="item.settingType == 'color'"
                v-model:pureColor="item.value"
                @update:pureColor="(e) => handleBlur(e, item.key)"
              ></vue3-color-picker>
              <a-select
                v-if="item.settingType == 'select'"
                v-model:value="item.value"
                @change="
                  (e) => {
                    handleBlur(e, item.key);
                  }
                "
              >
                <a-select-option
                  v-for="(v, key) in item.options"
                  :key="key"
                  :value="v.value"
                  >{{ v.label }}</a-select-option
                >
              </a-select>
              <SettingOutlined
                class="setting-icon"
                v-if="item.settingType == 'setting'"
                @click="eventClick(item.key)"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
    <a-empty v-else description="为匹配到组件设置"></a-empty>

    <a-drawer
      v-model:open="open"
      :contentWrapperStyle="{ transform: 'translateX(0)' }"
      :mask="false"
      title="事件流配置"
      placement="right"
      width="100%"
    >
      <template #extra>
        <a-button type="primary" @click="saveEvent">保存</a-button>
      </template>
      <div class="node-viewer">
        <flowNode :nodeData="flowData" ref="flowNodeRef"></flowNode>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { ref, watch, getCurrentInstance } from "vue";
import { getAttrJson, getAttrKeys, stringToObj } from "./utils/index";
import { uuid } from "@/utils/utils";
import flowNode from "../../../components/flow-node/flowNode.vue";
import _ from "lodash";
const { merge } = _;

export default {
  name: "attributeComponent",
  components: {
    flowNode,
  },
  props: ["localAttributes", "vueRawTag", "eventNode"],
  emits: ["childSave", "saveEventLogicCode"],
  setup(props, { emit }) {
    let list = ref([]);
    let localAttr = ref(props.localAttributes);
    let vueRawTag = ref(props.vueRawTag);
    let eventStr = ref("");
    const init = (localAttributes, vueRawTag) => {
      const attrObj = getAttrKeys(localAttributes);
      let obj = {};
      if (attrObj.style) {
        obj = merge(obj, stringToObj(attrObj.style));
      } else {
        obj.style = {};
      }
      obj.class = attrObj.class || "";
      list.value = getAttrJson(obj, vueRawTag, "component") || [];
    };

    init(props.localAttributes, props.vueRawTag);

    watch(
      props,
      (newValue) => {
        vueRawTag.value = newValue.vueRawTag;
        localAttr.value = newValue.localAttributes;
        init(newValue.localAttributes, newValue.vueRawTag);
      },
      { deep: true }
    );

    const handleBlur = (e, key) => {
      emit("childSave", key, `${e}`);
    };

    // 事件编排逻辑
    const open = ref(false);
    const flowNodeRef = ref(null);
    const flowData = ref({});

    const instance = getCurrentInstance();

    const saveEvent = () => {
      const id = uuid();
      emit("childSave", `${eventStr.value}`, `(e) => {eventFun('${id}', e)}`);
      emit("saveEventLogicCode", {
        [id]: flowNodeRef.value.flowSave(),
      });
      open.value = false;
    };

    const eventClick = (str) => {
      eventStr.value = str;
      open.value = true;
    };

    return {
      list,
      handleBlur,
      eventClick,
      open,
      saveEvent,
      flowNodeRef,
      flowData,
    };
  },
};
</script>

<style lang="scss" scoped>
.attribute-component-box {
  display: flex;
  flex-direction: column;
  .attribute-seeting-content-item {
    margin-bottom: 10px;
    .label {
      white-space: nowrap;
    }
  }
  .setting-icon {
    cursor: pointer !important;
    margin-top: 8px !important;
  }
}
.node-viewer {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      circle,
      rgba(185, 185, 185, 0.5) 1px,
      transparent 1px
    ),
    radial-gradient(circle, rgba(0, 0, 0, 0.5) 1px, transparent 1px);
  background-size: 20px 20px;
  background-repeat: repeat;
  position: relative;
  .flow-desc {
    position: absolute;
    top: 50px;
    left: 30px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 12px;
    background: #f8f0ff;
    border: solid 2px #d3adff;
    padding: 20px 24px;
    border-radius: 10px;
  }
}
</style>
