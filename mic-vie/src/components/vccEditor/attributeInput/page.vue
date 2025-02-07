<template>
  <div class="config-manager-page">
    <div class="config-manager-head">页面设置</div>
    <div class="config-manager-body">
      <ul>
        <li>
          <div class="label">宽度：</div>
          <div class="content-item-content">
            <a-input
              v-model:value="styleObj.width"
              placeholder="请输入宽度"
              @blur="
                (e) => {
                  handleBlur(e);
                }
              "
            ></a-input>
          </div>
        </li>
        <li>
          <div class="label">高度：</div>
          <div class="content-item-content">
            <a-input
              v-model:value="styleObj.height"
              @blur="
                (e) => {
                  handleBlur(e);
                }
              "
              placeholder="请输入高度"
            ></a-input>
          </div>
        </li>
        <li>
          <div class="label">背景颜色：</div>
          <div class="content-item-content">
            <vue3-color-picker
              v-model:pureColor="styleObj['background-color']"
              @update:pureColor="(e) => handleBlur(e)"
            ></vue3-color-picker>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { styleStringToObj, objectToArray } from "../utils/utils";
export default {
  setup() {
    const styleObj = ref({
      "background-color": "",
      height: "",
      position: "",
      width: "",
    });
    const pageConfig = ref({});
    const mainPanelProvider = inject("mainPanelProvider");
    let pageInfo;

    const init = () => {
      const rawDataStructure = mainPanelProvider.getRawDataStructure();
      try {
        pageInfo = rawDataStructure.template.__children[0].div;
      } catch (error) {}
      if (!pageInfo) {
        return;
      }
      styleObj.value = styleStringToObj(pageInfo.style);
    };

    const handleBlur = () => {
      const style = styleObj.value;
      const cssString = Object.entries(style)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");

      pageInfo.style = cssString;
      mainPanelProvider.saveAttribute(
        objectToArray(pageInfo),
        pageInfo.lc_id,
        false
      );
    };

    onMounted(() => {
      setTimeout(() => {
        init();
      }, 20);
    });

    return {
      pageConfig,
      styleObj,
      handleBlur,
    };
  },
};
</script>

<style lang="scss" scoped>
.config-manager-page {
  height: 100%;
  user-select: none;
  overflow: auto;

  .config-manager-head {
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    color: #bcc9d4;
    user-select: none;
    background: #2e343c;
  }

  .config-manager-body {
    width: 100%;
    height: auto;
    overflow: hidden;
    ul {
      display: flex;
      flex-direction: column;
      padding: 15px;
      li {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        .label {
          min-width: 50px;
          line-height: 30px;
        }
        .content-item-content {
          flex: 1;
        }
      }
    }
  }
}
</style>
