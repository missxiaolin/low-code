<template>
  <div class="attribute-style-box">
    <div class="attribute-seeting-content">
      <div class="attribute-seeting-content-item">
        <div class="label">类名：</div>
        <div class="attribute-seeting-content-item-content">
          <el-input v-model="className" @input="inputClassName"></el-input>
        </div>
      </div>
      <div
        class="attribute-seeting-content-item"
        v-for="(item, index) in styleData"
        :key="index"
      >
        <div class="label">{{ item.name }}：</div>
        <div
          class="attribute-seeting-content-item-content"
          v-if="item.type === 'input'"
        >
          <el-input
            v-model="item.value"
            @change="codeStyleAttributes"
          ></el-input>
        </div>
        <div
          class="attribute-seeting-content-item-content"
          v-if="item.type === 'color'"
        >
          <el-color-picker
            v-model="item.value"
            popper-class="vcc-color-dropdown"
            @change="codeStyleAttributes"
            @click="clickProp"
          ></el-color-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mCss } from "../../../utils/css";

const initStyleData = [
  {
    name: "宽度",
    key: "width",
    type: "input",
    value: "",
    defaultValue: "auto",
  },
  {
    name: "高度",
    key: "height",
    type: "input",
    value: "",
    defaultValue: "auto",
  },
  {
    name: "字体颜色",
    key: "color",
    type: "color",
    value: "",
    defaultValue: "inherit",
  },
  {
    name: "背景颜色",
    key: "background-color",
    type: "color",
    value: "",
    defaultValue: "inherit",
  },
];

export default {
  props: ["localAttributes"],
  data() {
    return {
      className: '',
      styleData: [],
      styleCode: "",
    };
  },
  mounted() {
    this.styleData = JSON.parse(JSON.stringify(initStyleData));
    this.init(this.localAttributes);
  },
  watch: {
    // styleData: {
    //   handler(v) {
    //     console.log('styleData', v)
    //     this.codeStyleAttributes(v);
    //   },
    //   deep: true,
    // },
    localAttributes: {
      handler(v) {
        this.styleData = JSON.parse(JSON.stringify(initStyleData));
        this.init(v);
      },
      deep: true,
    },
  },
  methods: {
    // 初始化
    init(localAttributes) {
      const styleObjects = localAttributes.filter(
        (item) => item.key === "style"
      );
      const classNameValue = localAttributes.filter(
        (item) => item.key === "class"
      );
      if (classNameValue && classNameValue.length > 0) {
        this.className = classNameValue[0].value
      } else {
        this.className = ''
      }
      if (!styleObjects || styleObjects.length == 0) {
        return;
      }
      this.styleCode = styleObjects[0].value;
      const styleObj = this.parseStyleString(styleObjects[0].value);
      this.styleData.forEach((item) => {
        if (styleObj[item.key]) {
          item.value = styleObj[item.key];
        }
      });
    },
    // 转成对象
    parseStyleString(styleString) {
      if (!styleString) {
        return;
      }
      const properties = styleString.split(";").filter(Boolean); // 分割并去除空项
      const styleObject = {};
      properties.forEach((property) => {
        const [key, value] = property.split(":").map((part) => part.trim()); // 分割键和值，并去除前后空白
        if (key && value) {
          styleObject[key] = value;
        }
      });

      return styleObject;
    },
    codeStyleAttributes() {
      const data = this.styleData;
      let str = "";
      data.forEach((item) => {
        if (item.value) {
          str = str + `${item.key}: ${item.value}; `;
        } else {
          str = str + `${item.key}: ${item.defaultValue}; `;
        }
      });
      this.mergeStyles(this.styleCode, str, (newStyle) => {
        if (newStyle) {
          this.$emit("childSave", "style", `${newStyle}`);
        }
      });
    },
    // 合并style
    mergeStyles(style1, style2, cal) {
      if (!style1) {
        cal(style2);
      }
      const css1 = `
        .my-class {
          ${style1}
        }
      `;
      const css2 = `
        .my-class {
          ${style2}
        }
      `;
      mCss(css1, css2).then((res) => {
        const extractedClass = res
          .match(/\.my-class {([\s\S]*?)}/)[1]
          .replace(/\s+/g, " ");
        cal(extractedClass);
      });
    },
    clickProp(event) {
      event.stopPropagation();
    },

    inputClassName(e) {
      this.$emit("childSave", "class", `${e}`);
    }
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
