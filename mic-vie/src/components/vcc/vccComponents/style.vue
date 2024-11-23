<template>
  <div class="attribute-style-box">
    <div class="attribute-seeting-content" v-if="list.length > 0">
      <div
        class="attribute-seeting-content-item"
        v-for="(item, key) in list"
        :key="key"
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
                handleBlur(e, item.key);
              }
            "
          ></a-input>
          <input
            v-if="item.settingType == 'color'"
            class="color-input"
            type="color"
            v-model="item.value"
            @blur="
              (e) => {
                handleBlur(e, item.key);
              }
            "
          />
        </div>
      </div>
    </div>
    <a-empty v-else description="为匹配到样式设置"></a-empty>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { getAttrJson, getAttrKeys, stringToObj } from "./utils/index";
import _ from "lodash";
const { merge } = _;
export default {
  props: ["localAttributes", "vueRawTag"],
  emits: ["childSave"],
  setup(props, { emit }) {
    let list = ref([]);
    let localAttr = ref(props.localAttributes);
    let vueRawTag = ref(props.vueRawTag);

    const init = (localAttributes, vueRawTag) => {
      const attrObj = getAttrKeys(localAttributes);
      let obj = {};
      if (attrObj.style) {
        obj = merge(obj, stringToObj(attrObj.style));
      } else {
        obj.style = {};
      }
      obj.class = attrObj.class || "";
      list.value = getAttrJson(obj, vueRawTag, "style");
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
      if (key === "class") {
        emit("childSave", "class", `${e.srcElement.value}`);
        return;
      }
      // 单独处理style
      const attrObj = getAttrKeys(localAttr.value);
      let style = {};
      list.value.forEach((item) => {
        if (item.key !== "class") {
          style[item.key] = item.value;
        }
      });
      // 不存在不需要进行合并直接添加存在进行添加
      if (!attrObj.style) {
        const cssString = Object.entries(style)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => `${key}: ${value}`)
          .join(";\n");
        emit("childSave", "style", cssString);
        return;
      }
      const obj = attrObj.style.split(";").reduce((result, item) => {
        const [key, value] = item.split(":").map((entry) => entry.trim());
        if (key && value) {
          result[key] = value;
        }
        return result;
      }, {});
      const newStyle = merge(obj, style);
      const cssString = Object.entries(newStyle)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => `${key}: ${value}`)
        .join(";\n");
      emit("childSave", "style", cssString);
    };

    return {
      list,
      handleBlur,
    };
  },
};
</script>

<style lang="scss">
.attribute-style-box {
  display: flex;
  flex-direction: column;
  .attribute-seeting-content-item {
    margin-bottom: 10px;
    .label {
      white-space: nowrap;
    }
  }
}
</style>
