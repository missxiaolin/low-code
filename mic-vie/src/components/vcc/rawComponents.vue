<template>
  <a-card class="row-container">
    <a-scrollbar height="100%" class="row-container-scrollbar">
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
            <component :is="item.componentName" @mounted="onMouted"></component>
          </keep-alive>
        </a-collapse-panel>
      </a-collapse>
    </a-scrollbar>
  </a-card>
</template>

<script>
import htmlRow from "../../rawComponents/html/index.vue";
import customRow from "../../rawComponents/custom/index.vue";

export default {
  components: {
    htmlRow,
    customRow,
  },
  computed: {},
  data() {
    return {
      isExpand: true,
      activeNames: ["htmlRow", "customRow"],
      iconArray: [
        {
          labelName: "html组件",
          className: "demonstration-raw",
          selectIndex: 0,
          componentName: "htmlRow",
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
  },
};
</script>

<style lang="scss" scoped>
.row-container {
  width: 300px;
  display: flex;
  height: 100%;
  position: relative;
  .row-container-scrollbar {
    padding-right: 20px;
  }
  :deep(.ant-card-body) {
    width: 100%;
    padding-right: 0;
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
</style>
