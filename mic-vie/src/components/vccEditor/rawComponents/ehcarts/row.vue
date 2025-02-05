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
    <div class="column-li dp-column-li" lc-mark>
      <div
        class="title com-title"
        lc_id="micLine"
        component_name="micLine"
        width="500"
        height="300"
      >
        <div class="name">折线图</div>
        <div class="li-img li-img-line"></div>
      </div>
    </div>
    <div class="column-li dp-column-li" lc-mark>
      <div
        class="title com-title"
        lc_id="micWordCloud"
        component_name="micWordCloud"
        width="300"
        height="200"
      >
        <div class="name">词云</div>
        <div class="li-img li-img-word-cloud"></div>
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
.li-img-word-cloud {
  background-image: url("/static/images/word-cloud-160-116.png");
}
.li-img-line {
  background-image: url("/static/images/basic-line-332-144.png");
}
</style>
