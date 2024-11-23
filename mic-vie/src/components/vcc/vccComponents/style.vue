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
          <a-input
            v-model:value="item.value"
            @blur="
              (e) => {
                handleBlur(e, item.key);
              }
            "
          ></a-input>
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
        const str = Object.entries(style)
          .map(([key, value]) => `${key}: ${value}`)
          .join(";");
        emit("childSave", "style", str);
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
      const str = Object.entries(newStyle)
        .map(([key, value]) => {
          if (value) {
            return `${key}: ${value}`;
          }
        })
        .join(";");
      emit("childSave", "style", str);
    };

    return {
      list,
      handleBlur,
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
