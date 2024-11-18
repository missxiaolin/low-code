<template>
  <a-menu
    class="flow-menu"
    :style="menuPosition"
    v-if="curModel && curModel.menus && curModel.menus.length > 0"
  >
    <a-menu-item v-for="item in curModel.menus" :key="item.key">
      <a href="javascript:;" @click="onSelect(item.key)">{{ item.label }}</a>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  props: ["curModel", "menuPosition"],
  watch: {},
  methods: {
    onSelect(key) {
      this.$emit("onSelect", key);
    },
  },
};
</script>

<style lang="scss" scoped>
.flow-menu {
  position: absolute;
  width: 150px;
  top: 167px;
  left: 612px;
}
</style>
