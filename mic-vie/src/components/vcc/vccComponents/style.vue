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
        <div
          class="attribute-seeting-content-item-content"
          v-if="item.settingType == 'input'"
        >
          <a-input :value="item.value"></a-input>
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
  setup(props) {
    const list = ref([]);

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
      console.log(list.value);
    };

    init(props.localAttributes, props.vueRawTag);

    watch(
      props,
      (newValue) => {
        init(newValue.localAttributes, newValue.vueRawTag);
      },
      { deep: true }
    );

    return {
      list,
    };
  },
};
// export default {
//   props: ["localAttributes", "vueRawTag"],
//   data() {
//     return {
//       className: "",
//       styleCode: "",
//     };
//   },
//   mounted() {
//     console.log(this.localAttributes, this.vueRawTag);
//     // this.init(this.localAttributes);
//   },
//   watch: {
//     localAttributes: {
//       handler(v) {
//         this.init(v);
//       },
//       deep: true,
//     },
//   },
//   methods: {
//     // 初始化
//     init(localAttributes) {
//       const classNameValue = localAttributes.filter(
//         (item) => item.key === "class"
//       );
//       if (classNameValue && classNameValue.length > 0) {
//         this.className = classNameValue[0].value;
//       } else {
//         this.className = "";
//       }
//     },
//     clickProp(event) {
//       event.stopPropagation();
//     },

//     inputClassName(e) {
//       // this.$emit("childSave", "class", `${e}`);
//     },
//   },
// };
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
