<template>
  <div class="attribute-style-box">
    <div class="attribute-seeting-content">
      <div class="attribute-seeting-content-item">
        <div class="label">类名：</div>
        <div class="attribute-seeting-content-item-content">
          <a-input v-model="className" @input="inputClassName"></a-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["localAttributes"],
  data() {
    return {
      className: "",
      styleCode: "",
    };
  },
  mounted() {
    this.init(this.localAttributes);
  },
  watch: {
    localAttributes: {
      handler(v) {
        this.init(v);
      },
      deep: true,
    },
  },
  methods: {
    // 初始化
    init(localAttributes) {
      const classNameValue = localAttributes.filter(
        (item) => item.key === "class"
      );
      if (classNameValue && classNameValue.length > 0) {
        this.className = classNameValue[0].value;
      } else {
        this.className = "";
      }
    },
    clickProp(event) {
      event.stopPropagation();
    },

    inputClassName(e) {
      // this.$emit("childSave", "class", `${e}`);
    },
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
