<template>
  <div class="attribute-component-box">
    <div
      class="attribute-seeting-content"
      v-if="Object.keys(baseObj).length > 0 || Object.keys(eventObj).length > 0"
    >
      <div class="attribute-seeting-content-item" v-if="baseObj">
        <div class="attribute-seeting-content-title" v-if="baseObj.title">
          {{ baseObj.title }}
        </div>
        <template v-if="baseObj.children && baseObj.children.length > 0">
          <div
            class="attribute-seeting-content-content"
            v-for="(item, index) in baseObj.children"
            :key="index"
          >
            <div class="label" v-if="item.settingType !== 'setting'">
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
                :getPopupContainer="(triggerNode) => triggerNode.parentNode"
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
              <a-radio-group
                v-if="item.settingType == 'radio'"
                @change="(e) => handleBlur(e.target.value, item.key)"
                v-model:value="item.value"
                :option-type="item.radioType"
                :options="item.options"
                style="margin-top: 5px"
              />
              <a-select
                v-if="item.settingType == 'dataSelect'"
                v-model:value="item.value"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode"
                @change="
                  (e) => {
                    handleBlur(e, item.key);
                  }
                "
              >
                <a-select-option
                  v-for="(v, key) in customData"
                  :key="key"
                  :value="v.key"
                  >{{ v.keyDesc }}</a-select-option
                >
              </a-select>

              <!-- <SettingOutlined
                class="setting-icon"
                v-if="item.settingType == 'setting'"
                @click="eventClick(item.key)"
              /> -->
            </div>
          </div>
        </template>
      </div>
      <div class="attribute-seeting-content-item" v-if="eventObj">
        <div class="attribute-seeting-content-title" v-if="eventObj.title">
          {{ eventObj.title }}
        </div>
        <div class="attribute-seeting-content-content event-content">
          <a-dropdown
            :placement="'bottom'"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            :trigger="['click']"
          >
            <a-button type="dashed" block>添加事件</a-button>
            <template #overlay>
              <ul
                class="event-ul"
                v-if="eventObj.children && eventObj.children.length > 0"
              >
                <li v-for="(item, index) in eventObj.children" :key="index">
                  <a-button
                    type="text"
                    block
                    :disabled="attrEvents.includes(item.key) ? true : false"
                    @click="(e) => eventClick(e, item.key)"
                    >{{ item.label }}</a-button
                  >
                </li>
              </ul>
            </template>
          </a-dropdown>
          <ul
            class="event-ul-box"
            v-if="eventObj.children && eventObj.children.length > 0"
          >
            <template v-for="(item, index) in eventObj.children">
              <li :key="index" v-if="attrEvents.includes(item.key)">
                <div>
                  {{ item.label }}
                </div>
                <div>
                  <EditOutlined @click="editEventClick(item.key)" />
                  <DeleteOutlined
                    class="ml10"
                    @click="delEventClick(item.key)"
                  />
                </div>
              </li>
            </template>
          </ul>
        </div>
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
      <div class="node-viewer" v-if="open">
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
import { message } from "ant-design-vue";
const [messageApi, contextHolder] = message.useMessage();
import _ from "lodash";
const { merge } = _;

export default {
  name: "attributeComponent",
  components: {
    flowNode,
  },
  props: [
    "localAttributes",
    "vueRawTag",
    "eventNode",
    "customData",
    "__rawVueInfo__",
  ],
  emits: ["childSave", "saveEventLogicCode", "deleteItem", "save"],
  setup(props, { emit }) {
    let baseObj = ref({});
    let eventObj = ref({});
    let localAttr = ref(props.localAttributes);
    let vueRawTag = ref(props.vueRawTag);
    let eventStr = ref("");
    let attrEvents = ref([]);
    let selectUuid = ref("");
    const init = (localAttributes, vueRawTag) => {
      attrEvents.value = [];
      baseObj.value = {};
      eventObj.value = {};
      const attrObj = getAttrKeys(localAttributes);
      Object.keys(attrObj).forEach((key) => {
        if (key.indexOf("@") > -1) {
          attrEvents.value.push(key);
        }
      });
      let obj = attrObj;
      let attrs = getAttrJson(obj, vueRawTag, "component") || [];
      attrs.forEach((item) => {
        if (item.key === "base") {
          baseObj.value = item;
        } else if (item.key === "event") {
          eventObj.value = item;
        }
      });
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
      let flNode = flowNodeRef.value.flowSave();

      emit("saveEventLogicCode", {
        [selectUuid.value]: flNode,
      });
      open.value = false;
    };

    const getUuid = (str) => {
      const regex = /eventFun\(`([^`]+)`,/;
      const match = str.match(regex);

      if (match) {
        const firstArgument = match[1];
        return firstArgument;
      } else {
        return "";
      }
    };

    // del 事件
    const delEventClick = (key) => {
      if (!key) return;
      let value = "";
      const localAttrs = localAttr.value;
      localAttrs.forEach((item, index) => {
        if (item.key === key) {
          emit("deleteItem", index);
          value = item.value;
        }
      });
      let eventUuidValue = getUuid(value);
      let eventNode = props.eventNode;
      if (eventNode[eventUuidValue]) {
        let newEventNode = JSON.parse(JSON.stringify(eventNode));
        delete newEventNode[eventUuidValue];
        emit("saveEventLogicCode", newEventNode);
      }

      emit("save", false);
    };

    // 显示逻辑编排
    const editEventClick = (key) => {
      if (!key) return;
      let value = "";
      const localAttrs = localAttr.value;
      localAttrs.forEach((item, index) => {
        if (item.key === key) {
          value = item.value;
        }
      });
      let eventUuidValue = getUuid(value);
      if (!eventUuidValue) {
        messageApi.error("该事件不支持逻辑编排！");
        return;
      }
      selectUuid.value = eventUuidValue;
      flowData.value = props.eventNode[eventUuidValue] || {};
      open.value = true;
    };

    // 添加事件
    const eventClick = (e, str) => {
      const id = uuid();
      let fnStr = `(e) => {eventFun(\`${id}\`, e)}`;
      emit("childSave", str, fnStr);
    };

    return {
      baseObj,
      eventObj,
      attrEvents,
      delEventClick,
      editEventClick,
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
.event-ul {
  background-color: var(--v3-menu-bg);
  li {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.event-content {
  display: flex;
  flex-direction: column !important;
}
.event-ul-box {
  background-color: var(--v3-menu-bg);
  margin-top: 30px;
  li {
    cursor: pointer;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
