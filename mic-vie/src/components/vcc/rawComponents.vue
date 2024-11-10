<template>
  <el-card class="row-container">
    <el-scrollbar height="calc(100vh - 130px)" class="row-container-scrollbar">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in iconArray"
          :key="index"
          :title="item.labelName"
          :name="item.componentName"
        >
          <keep-alive>
            <component :is="item.componentName" @mounted="onMouted"></component>
          </keep-alive>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </el-card>
</template>

<script>
import elBase from "../../rawComponents/elBase/index.vue";
import htmlRow from "../../rawComponents/html/index.vue";
import elForm from "../../rawComponents/elForm/index.vue";
import customRow from "../../rawComponents/custom/index.vue";

export default {
  components: {
    elBase,
    htmlRow,
    elForm,
    customRow,
  },
  computed: {},
  data() {
    return {
      isExpand: true,
      activeNames: ['htmlRow', 'elBase', 'elForm', 'customRow'],
      iconArray: [
        {
          labelName: "html组件",
          className: "demonstration-raw",
          selectIndex: 0,
          componentName: "htmlRow",
          titleArray: [],
        },
        {
          labelName: "el基础组件",
          className: "demonstration-element-base",
          selectIndex: 1,
          componentName: "elBase",
          titleArray: [],
        },
        {
          labelName: "el表单组件",
          className: "demonstration-element-form",
          selectIndex: 2,
          componentName: "elForm",
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
  :deep(.el-card__body) {
    width: 100%;
    padding-right: 0;
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
