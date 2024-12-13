<template>
  <a-card class="row-container">
    <div class="row-container-scrollbar">
      <!-- :tab-position="'left'" -->
      <a-tabs class="attribute-tabs" v-model:activeKey="tabActiveName">
        <a-tab-pane tab="组件设置" key="component">
          <a-collapse
            v-model:activeKey="activeNames"
            :bordered="false"
            class="row-collapse"
          >
            <a-collapse-panel
              v-for="item in iconArray"
              :key="item.componentName"
              :header="item.labelName"
              :name="item.componentName"
            >
              <keep-alive>
                <component
                  :is="item.componentName"
                  @mounted="onMouted"
                ></component>
              </keep-alive>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
        <a-tab-pane tab="大纲" key="structure">
          <row-nested :data="treeData"></row-nested>
          <div class="current-edit-info">
            {{ currentEditRawInfo }}
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import htmlRow from "../../rawComponents/html/index.vue";
import aBase from "../../rawComponents/a-base/index.vue";
import aForm from "../../rawComponents/a-form/index.vue";
import customRow from "../../rawComponents/custom/index.vue";
import rowNested from "./rowNested.vue";

import { getRawComponentContent } from "@/utils/common";
import { store as _store } from "@/libs/store.js";

export default {
  props: ["initStructure"],
  emits: ["setCurrentEditRawInfo"],
  components: {
    htmlRow,
    customRow,
    aBase,
    aForm,
    rowNested,
  },
  computed: {},
  data() {
    return {
      _codeRawInfo: {},
      treeData: [],
      tabActiveName: "component",
      isExpand: true,
      activeNames: ["htmlRow", "aBase", "aForm", "customRow"],
      iconArray: [
        {
          labelName: "html组件",
          className: "demonstration-raw",
          selectIndex: 0,
          componentName: "htmlRow",
          titleArray: [],
        },
        {
          labelName: "Ant Design 基础组件",
          className: "demonstration-a-base",
          selectIndex: 1,
          componentName: "aBase",
          titleArray: [],
        },
        {
          labelName: "Ant Design 表单组件",
          className: "demonstration-a-form",
          selectIndex: 1,
          componentName: "aForm",
          titleArray: [],
        },
        {
          labelName: "自定义组件",
          className: "demonstration-custom",
          selectIndex: 3,
          componentName: "customRow",
          titleArray: [],
        },
      ],
    };
  },
  methods: {
    onMouted(index) {
      this.initOnly(this.iconArray[index || 0]);
      this.updateCode(this.initStructure);
    },
    /**
     * 初始化组件导航栏，只有2个及以上的组件类才会出现
     */
    initOnly(mountedObject) {
      const titles = document.getElementsByClassName(mountedObject.className);

      // if (titles.length > 1) {
      //   for (let i = 0; i < titles.length; i++) {
      //     const element = titles[i];
      //     const arr = element.textContent.split(" ");
      //     mountedObject.titleArray.push({
      //       titleChinese: arr.length === 2 ? arr[1] : arr[0],
      //       titleEnglish: arr.length === 1 ? null : arr[0],
      //       element: element,
      //     });
      //   }
      // } else if (titles.length === 1) {
      //   mountedObject.onlyTitle = {
      //     element: titles[0],
      //   };
      // }
    },
    // 初始化拖拽导航
    updateCode(codeRawInfo) {
      if (codeRawInfo) {
        this._codeRawInfo = codeRawInfo;
        const content = getRawComponentContent(codeRawInfo);
        const children = content.__children;
        this.treeData = children;
      }
    },
  },
  watch: {
    initStructure: {
      handler(newVal) {
        this.updateCode(newVal);
      },
      immediate: true,
    },
    renderCount() {
      // 这里利用了vuedraggable v-model的特性，它会更改对象本身的引用
      this.$emit("reRender", this._codeRawInfo);
    },
  },
  computed: {
    renderCount() {
      return _store.state.renderCount;
    },
    canInitShortcut() {
      return this.currentEditRawInfo !== null && this.drawer;
    },
    currentEditRawInfo() {
      if (_store.state.currentEditComp) {
        const vccData = _store.state.currentEditComp.vccData;
        const info = window.tree[vccData.lc_id];
        this.$emit("setCurrentEditRawInfo", info);
        return info;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row-container {
  width: 300px;
  display: flex;
  height: 100%;
  position: relative;
  .row-container-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .row-container-scrollbar {
    height: 100%;
    overflow-y: scroll;
    padding-right: 16px;
    :deep(.ant-collapse-content-box) {
      padding-right: 0;
    }
  }
  :deep(.ant-card-body) {
    width: 100%;
    padding-right: 0;
    box-sizing: border-box;
    overflow: hidden !important;
  }
  :deep(.ant-collapse) {
    background-color: transparent !important;
  }
  .left-tabs {
    position: relative;
  }
  .icon-box {
    height: 50px;
    position: absolute;
    left: 50px;
    bottom: 0;
    cursor: pointer;
    z-index: 10;
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
.current-edit-info {
  width: 0px;
  height: 0px;
  overflow: hidden;
}
</style>
