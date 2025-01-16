<template>
  <div class="vcc-column-ul">
    <div
      class="column-li"
      lc-mark
      v-for="(item, index) in asyncComponents"
      :key="index"
    >
      <div
        class="title"
        lc_id="MZSdyF6HeN"
        :component_url="`http://component.missxiaolin.com/${item.componentName}.es.js`"
        :component_name="item.componentName"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["asyncComponents"],
};
</script>
