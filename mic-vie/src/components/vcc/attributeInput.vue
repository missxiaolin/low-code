<template>
  <a-card
    class="attribute-container"
    @click="
      (e) => {
        e.stopPropagation();
      }
    "
  >
    <div v-if="!isShowAttribute" class="attribute-empty">
      <a-empty description="还没有数据哦">
        <template #default> 赶快拖拽组件来生成你的H5页面吧～ </template>
      </a-empty>
    </div>
    <template v-else>
      <a-tabs class="attribute-tabs" v-model:activeKey="activeName">
        <a-tab-pane tab="组件设置" key="component">
          <comComponent
            v-if="vueRawTag"
            :localAttributes="localAttributes"
            :customData="customData"
            :vueRawTag="vueRawTag"
            :eventNode="eventNode"
            @saveEventLogicCode="saveEventLogicCode"
            @childSave="childSave"
            @deleteItem="deleteItem"
            @save="save"
          />
          <a-empty v-else description="请选择组件"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="样式" key="style">
          <styleComponent
            v-if="vueRawTag"
            :localAttributes="localAttributes"
            :vueRawTag="vueRawTag"
            @childSave="childSave"
          />
          <a-empty v-else description="请选择组件"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="自定义组件" key="custom">
          <a-empty description="该组件不支持设定"></a-empty>
        </a-tab-pane>
        <a-tab-pane tab="高级" key="senior">
          <div style="text-align: center">
            <a-switch
              v-model:checked="editMode"
              active-text="自由编辑"
              inactive-text="约束编辑"
              active-color="#13ce66"
              inactive-color="#13ce66"
            >
            </a-switch>
          </div>

          <div style="margin-top: 20px">
            <div name="1" v-show="!editMode">
              <div>
                <div
                  class="item"
                  v-for="(item, index) in localAttributes"
                  :key="index"
                >
                  <a-input
                    v-model:value="item.key"
                    :placeholder="'key' + index"
                    class="half-width"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                  ></a-input>
                  <div class="split">:</div>
                  <a-input
                    v-model:value="item.value"
                    type="textarea"
                    :placeholder="'value' + index"
                    class="half-width"
                    style="flex-grow: 4"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                  ></a-input>
                  <MinusCircleOutlined
                    style="margin-left: 5px"
                    @click="deleteItem(index)"
                  />
                </div>

                <div class="quick-add-root">
                  快速增加一些属性:
                  <div style="margin-top: 5px">
                    <transition name="el-zoom-in-center">
                      <a-tag
                        v-if="attributeKeys.indexOf('class') == -1"
                        size="small"
                        color="success"
                        @click="onClassClick"
                        effect="dark"
                        class="tag"
                        >Class
                      </a-tag>
                    </transition>
                    <transition name="el-zoom-in-center">
                      <a-tag
                        v-if="attributeKeys.indexOf('@click') == -1"
                        size="small"
                        color="success"
                        @click="onEventClick"
                        effect="dark"
                        class="tag"
                        >点击事件</a-tag
                      >
                    </transition>
                    <transition name="el-zoom-in-center">
                      <a-tag
                        v-if="!attributeKeys.includes('__text__')"
                        size="small"
                        color="success"
                        @click="onTextClick"
                        effect="dark"
                        class="tag"
                        >文本内容</a-tag
                      >
                    </transition>
                  </div>
                </div>
              </div>
            </div>
            <div name="2" v-show="editMode">
              <a-input
                type="textarea"
                :autosize="{ minRows: 4 }"
                placeholder="请输入属性, 以key: value的形式(冒号后要有空格)"
                v-model:value="textAttributes"
              >
              </a-input>
            </div>
          </div>

          <div style="margin-top: 10px; text-align: center">
            <a-tooltip
              class="item"
              effect="dark"
              title="新增属性 ctrl+a"
              placement="bottom"
            >
              <a-button
                type="primary"
                shape="circle"
                class="center"
                @click="createNew"
              >
                <PlusOutlined style="color: white" />
              </a-button>
            </a-tooltip>
            <a-tooltip
              class="item"
              effect="dark"
              title="保存属性 ctrl+s"
              placement="bottom"
            >
              <a-button
                type="primary"
                shape="circle"
                class="center"
                @click="save"
              >
                <RedoOutlined style="color: white" />
              </a-button>
            </a-tooltip>
            <a-tooltip
              v-if="enableRemoveButton"
              class="item"
              effect="dark"
              content="移除该组件 ctrl+d"
              placement="bottom"
            >
              <a-button
                type="primary"
                shape="circle"
                class="center"
                @click="remove"
              >
                <DeleteOutlined style="color: white" />
              </a-button>
            </a-tooltip>
            <a-tooltip
              v-if="enableBroButton"
              class="item"
              effect="dark"
              title="复制一个兄弟组件 ctrl+c"
              placement="bottom"
            >
              <a-button
                type="primary"
                class="center"
                @click="copyBro"
                shape="circle"
              >
                <CopyOutlined style="color: white" />
              </a-button>
            </a-tooltip>
            <div style="text-algin: center">
              <span class="shortcut-tip">支持快捷键操作</span>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </template>
  </a-card>
</template>

<script>
import { getRawComponentKey, getRawComponentContent } from "@/utils/common";
import { brotherEleEnum, copyBroCode } from "@/libs/bro-ele-config";
import keymaster from "keymaster";
import styleComponent from "./vccComponents/style.vue";
import comComponent from "./vccComponents/component.vue";
import { store as _store } from "@/libs/store.js";
import { message } from "ant-design-vue";
const [messageApi, contextHolder] = message.useMessage();

export default {
  components: {
    styleComponent,
    comComponent,
  },
  props: [
    "__rawVueInfo__",
    "enableRemoveButton",
    "shortcutInitMode",
    "isShowAttribute",
    "eventNode",
    "customData",
  ], // __rawVueInfo__为当前编辑的原始代码对象, shortcutInitMode快捷键的初始化方式
  data: function () {
    return {
      vueRawTag: "",
      activeName: "component",
      input: "",
      localAttributes: [],
      enable: true,
      autoplay: false,
      editMode: false,
      textAttributes: "",
    };
  },
  mounted() {
    const container = document.querySelector(".attribute-container");
    container.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    if (this.shortcutInitMode === "auto") {
      // 这种方式用于在检视图中，因为它依赖组件的创建和销毁
      this.initShortcut();
    }
  },

  beforeDestroy() {
    if (this.shortcutInitMode === "auto") {
      // 防止内存泄漏
      this.destroyShortcut();
    }
  },

  methods: {
    destroyShortcut() {
      // console.log(`destroyShortcut by mode: ${this.shortcutInitMode}`);
      keymaster.unbind("⌘+a, ctrl+a");
      keymaster.unbind("⌘+s, ctrl+s");
      keymaster.unbind("⌘+d, ctrl+d");
      keymaster.unbind("⌘+c, ctrl+c");
    },

    initShortcut() {
      // console.log(`init by mode: ${this.shortcutInitMode}`);
      keymaster("⌘+a, ctrl+a", () => {
        if (this.enable) {
          this.createNew();
          return false;
        }
      });
      keymaster("⌘+s, ctrl+s", () => {
        if (this.enable) {
          this.save();
          return false;
        }
      });
      keymaster("⌘+d, ctrl+d", () => {
        if (this.enable) {
          this.remove();
          return false;
        }
      });
      keymaster("⌘+c, ctrl+c", () => {
        if (this.enable && this.enableBroButton) {
          this.copyBro();
          return false;
        }
      });
    },

    onClassClick() {
      this.localAttributes.push({ key: "class", value: "class-name" });
    },
    onEventClick() {
      this.localAttributes.push({ key: "@click", value: "onEventClick" });
    },
    onTextClick() {
      this.localAttributes.push({ key: "__text__", value: "content" });
    },

    createNew() {
      this.localAttributes.push({ key: "", value: "" });
    },
    saveEventLogicCode(obj) {
      this.$emit("saveEventLogicCode", obj);
    },
    childSave(key, value) {
      let check = false;
      this.localAttributes.forEach((item) => {
        if (item.key == key) {
          item.value = value;
          check = true;
        }
      });
      if (!check) {
        this.localAttributes.push({ key, value });
      }
      this.save(false);
    },
    save(isShowNotify = true) {
      try {
        let resultList = [];
        if (!this.editMode) {
          resultList = this.localAttributes.filter((item) => {
            return !!item.key;
          });
        } else {
          const attributes = this.textAttributes.split("\n");
          resultList = attributes.map((item) => {
            const [key, value] = item.split(": ");
            return {
              key,
              value,
            };
          });
          this.localAttributes = resultList;
        }
        this.$emit("save", {
          resultList,
          lc_id: this.rawInfoID,
          vueRawTag: this.vueRawTag,
        });
        if (isShowNotify) {
          messageApi.success("代码已更新");
        }
      } catch (error) {
        console.log(error);
        this.$message.error(error);
      }
    },
    remove() {
      this.$emit("remove", { lc_id: this.rawInfoID });
    },
    deleteItem(index) {
      this.localAttributes.splice(index, 1);
    },
    copyBro() {
      copyBroCode(this.__rawVueInfo__);
      _store.commit("onDragEnd");
    },
    onShow() {
      // 这种方式适用于常规模式下的初始化，因为这个实例初始化后不会被销毁，一直常驻内存。但又不能受到其它实例销毁时的影响，所以需要明确的再次初始化。
      this.initShortcut();
    },
    onHide() {
      this.destroyShortcut();
    },
  },

  computed: {
    componentName() {
      return this.__rawVueInfo__ ? getRawComponentKey(this.__rawVueInfo__) : "";
    },
    rawInfoID() {
      return this.__rawVueInfo__
        ? getRawComponentContent(this.__rawVueInfo__).lc_id
        : "";
    },
    enableBroButton() {
      const checkResult = brotherEleEnum().find((item) => {
        return item.name == this.componentName;
      });
      return checkResult && false;
    },
    attributeList() {
      let result = [];
      let tag = "";
      const vueRawInfo = this.__rawVueInfo__;

      if (vueRawInfo) {
        tag =
          Object.keys(vueRawInfo) && Object.keys(vueRawInfo).length > 0
            ? Object.keys(vueRawInfo)[0]
            : "";

        const object = vueRawInfo[getRawComponentKey(vueRawInfo)];

        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (
              typeof element !== "object" &&
              key != "lc-mark" &&
              key != "lc_id" &&
              key != "div-lc-mark" &&
              key != "lc_uuid" &&
              key != "vccName"
            ) {
              // 这两个是保留字段，不对外提供使用
              if (key != "") result.push({ key: key, value: element });
            }
          }
        }
      }
      return [result, tag];
    },

    attributeKeys() {
      return this.localAttributes.map((item) => item.key);
    },
  },
  watch: {
    attributeList: {
      handler: function () {
        const [result, tag] = this.attributeList;
        this.localAttributes = result;
        this.vueRawTag = tag;
      },
      immediate: true,
    },
    localAttributes(newValue) {
      if (newValue.length === 0) {
        newValue.push({ key: "", value: "" });
      }

      this.textAttributes = newValue
        .map((item) => `${item.key}: ${item.value}`)
        .join("\n");
    },
  },
};
</script>

<style scoped lang="scss">
.attribute-empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.attribute-container {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  :deep(.ant-card-body) {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden !important;
  }
  .el-scrollbar {
    padding-right: 20px;
  }
}

.attribute-tabs {
  height: 100%;
  :deep(.ant-empty) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
  }
  :deep(.ant-tabs-content-holder::-webkit-scrollbar) {
    width: 0;
    height: 0;
  }
  :deep(.ant-tabs-content) {
    height: 100%;
  }
  :deep(.ant-tabs-tabpane) {
    height: 100%;
  }
  :deep(.ant-tabs-content-holder) {
    height: 100%;
    overflow-y: scroll;
  }
}
.container {
  padding: 10px;
  width: 50%;
  text-align: center;
}

.half-width {
  width: 100px;
}

.center {
  display: inline-block !important;
  margin: 10px 10px;
}

.item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.quick-add-root {
  padding: 5px 10px;
  border: 1px dashed #c6c6c6;
  border-radius: 5px;
  font-size: 12px;
  color: gray;

  .tag {
    margin-right: 5px;
  }

  .tag:last-child {
    margin-right: 0;
  }
}

.split {
  width: 30px;
  text-align: center;
  font-weight: bold;
}

.el-icon-plus,
.el-icon-minus {
  margin-left: 10px;
}

.el-button + .el-button {
  margin-left: 0px;
}

.shortcut-tip {
  font-size: 12px;
  color: grey;
  padding: 2px;
  border-bottom: grey solid 1px;
}
</style>
