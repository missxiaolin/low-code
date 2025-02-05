<template>
  <div class="chart-container">
    <e-charts ref="chart" theme="dark" :option="option" :autoresize="true" />
  </div>
</template>

<script>
import { computed, toRef, shallowRef, onMounted, watch, ref } from "vue";
import { groupBy, merge } from "lodash-es";
import dayjs from "dayjs";

export default {
  name: "micLine",
  props: {
    com: {
      type: Object,
      default: () => {
        return {};
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit, expose }) {
    const chart = ref(null);
    const c = merge(wordCloudConfig, props.com.config || {});
    const config = toRef(c);

    const dv_data = computed(() => {
      return props.data && props.data.length > 0
        ? props.data
        : echartsConfig.micWordCloud.source;
    });

    const dv_field = computed(() => {
      return config.value.dvField;
    });

    return {
      chart,
    };
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
