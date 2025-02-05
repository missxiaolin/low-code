<template>
  <div class="vcc-column-ul vcc-dp-column-ul">
    <div class="column-li dp-column-li" lc-mark>
      <div
        class="title com-title"
        lc_id="micBar"
        component_name="micBar"
        width="400"
        height="230"
      >
        <div class="name">柱状图</div>
        <div class="li-img li-img-bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.vcc-column-ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.li-img-bar {
  background-image: url("/static/images/basic-bar-332-144.png");
}
</style>
