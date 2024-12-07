<template>
  <div class="attribute-component-box">
    <div class="attribute-seeting-content" v-if="list.length > 0">
      <div
        class="attribute-seeting-content-item"
        v-for="(v, key) in list"
        :key="key"
      >
        <div class="attribute-seeting-content-title" v-if="v.title">
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
            </div>
          </div>
        </template>
      </div>
    </div>
    <a-empty v-else description="为匹配到组件设置"></a-empty>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { getAttrJson, getAttrKeys, stringToObj } from "./utils/index";
import _ from "lodash";
const { merge } = _;

export default {
  name: "attributeComponent",
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

    return {
      list,
      handleBlur,
    };
  },
};
</script>

<style lang="scss" scoped>
.aattribute-component-box {
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
