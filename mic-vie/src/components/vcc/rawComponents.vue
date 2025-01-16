<template>
  <a-card class="row-container" @click="(e) => e.stopPropagation">
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
                  :asyncComponents="asyncComponents"
                  @mounted="onMouted"
                ></component>
              </keep-alive>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
        <a-tab-pane tab="大纲" key="structure">
          <span @click="(e) => e.stopPropagation()">
            <row-nested
              :data="treeData"
              @onNodeClick="onNodeClick"
            ></row-nested>
          </span>
        </a-tab-pane>
        <a-tab-pane tab="变量" key="data">
          <a-button type="link" @click="showFormData">+ 新增</a-button>
          <a-divider />
          <ul class="data-ul">
            <li v-for="(item, index) in customData" :key="index">
              <div class="data-key">
                <a-tooltip>
                  <template #title>{{ item.keyDesc }}</template>
                  <div>{{ item.key }}</div>
                </a-tooltip>
              </div>
              <div class="data-right">
                <EditOutlined @click="editFormData(item, index)" />
                <DeleteOutlined @click="deleteFormData(item, index)" />
              </div>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane tab="模板" key="template">
          <a-empty :description="'敬请期待'"></a-empty>
        </a-tab-pane>
      </a-tabs>
    </div>
    <dataForm
      v-if="isShowFormData"
      :formData="formData"
      @cancel="formCancel"
      @save="formSave"
    />
  </a-card>
</template>

<script>
import htmlRow from "../../rawComponents/html/index.vue";
import aBase from "../../rawComponents/a-base/index.vue";
import aForm from "../../rawComponents/a-form/index.vue";
import customRow from "../../rawComponents/custom/index.vue";
import rowNested from "./rowNested.vue";
import asyncRow from "../../rawComponents/asyncComponent/index.vue";
import dataForm from "./dataForm.vue";

import { getRawComponentContent } from "@/utils/common";
import { store as _store } from "@/libs/store.js";

export default {
  props: ["customData", "initStructure", "asyncComponents"],
  emits: ["setCurrentEditRawInfo"],
  components: {
    htmlRow,
    customRow,
    aBase,
    aForm,
    rowNested,
    dataForm,
    asyncRow,
  },
  computed: {},
  data() {
    return {
      formData: {
        index: "",
        key: "", // 变量名称
        keyType: "string", // 变量类型
        value: "", // 变量默认值
        keyDesc: "", // 变量描述
      },
      isShowFormData: false,
      _codeRawInfo: {},
      treeData: [],
      tabActiveName: "component",
      isExpand: true,
      activeNames: ["htmlRow", "aBase", "aForm", "asyncRow", "customRow"],
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
          labelName: "远程组件",
          className: "demonstration-async-component",
          selectIndex: 3,
          componentName: "asyncRow",
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
    onNodeClick(currentEditComp) {
      if (currentEditComp) {
        const vccData = currentEditComp.vccData;
        const info = window.tree[vccData.lc_id];
        this.domSelect(info);
        this.$emit("setCurrentEditRawInfo", info);
        return info;
      } else {
        return null;
      }
    },
    domSelect(info) {
      let name = "";
      try {
        name = info[Object.keys(info)[0]].vccName;
      } catch (error) {}
      const lc_uuid = info[Object.keys(info)[0]].lc_id;
      const renderControlPanel = document.getElementById(
        "render-control-panel"
      );
      const elements = renderControlPanel.querySelectorAll("[lc_id]");
      elements.forEach((element) => {
        if (element.getAttribute("lc_id") === lc_uuid) {
          element.classList.add("mark-element");

          element.setAttribute(
            "lc-component-name",
            name || Object.keys(info)[0]
          );
        } else {
          element.classList.remove("mark-element");
        }
      });
    },
    showFormData() {
      this.formData = {
        id: "",
        key: "", // 变量名称
        keyType: "string", // 变量类型
        value: "", // 变量默认值
        keyDesc: "", // 变量描述
      };
      this.isShowFormData = true;
    },
    formCancel() {
      this.isShowFormData = false;
    },
    editFormData(item, id) {
      this.formData = {
        id: id,
        key: item.key, // 变量名称
        keyType: item.keyType, // 变量类型
        value: ["array", "object"].includes(item.keyType)
          ? JSON.stringify(item.value)
          : item.value, // 变量默认值
        keyDesc: item.keyDesc, // 变量描述
      };
      this.isShowFormData = true;
    },
    deleteFormData(item, index) {
      let data = JSON.parse(JSON.stringify(this.customData));
      data.splice(index, 1);
      this.$emit("saveData", data);
    },
    formSave(form) {
      let newForm = JSON.parse(JSON.stringify(form));
      delete newForm.id;
      if (["array", "object"].includes(form.keyType)) {
        newForm.value = JSON.parse(form.value);
      }
      let data = JSON.parse(JSON.stringify(this.customData));
      if (form.id === "") {
        data.push(newForm);
      } else {
        data[form.id] = newForm;
      }
      this.$emit("saveData", data);
      this.isShowFormData = false;
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
    currentEditComp(newVal) {
      if (newVal) {
        this.onNodeClick(newVal);
      }
    },
  },
  computed: {
    renderCount() {
      return _store.state.renderCount;
    },
    canInitShortcut() {
      return this.currentEditRawInfo !== null && this.drawer;
    },
    currentEditComp() {
      if (_store.state.currentEditComp) {
        return _store.state.currentEditComp;
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
:deep(.ant-divider-horizontal) {
  margin: 0;
}
.data-ul {
  padding: 0 10px 0 10px;
  margin-top: 20px;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    .data-key {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      div {
        &:nth-child(2) {
          color: #ccc;
        }
      }
    }
    .data-right {
      width: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
