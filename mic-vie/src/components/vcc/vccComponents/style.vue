<template>
  <div class="attribute-style-box">
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
                    handleBlur(e, item.key);
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
            </div>
          </div>
        </template>
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
        item.children.forEach((child) => {
          if (child.key !== "class") {
            style[child.key] = child.value;
          }
        });
      });
      // 不存在不需要进行合并直接添加存在进行添加
      if (!attrObj.style) {
        const cssString = Object.entries(style)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => `${key}: ${value}`)
          .join(";");
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
        .join(";");
      emit("childSave", "style", cssString);
    };

    return {
      list,
      handleBlur,
    };
  },
};
</script>

<style lang="scss" scoped>
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
