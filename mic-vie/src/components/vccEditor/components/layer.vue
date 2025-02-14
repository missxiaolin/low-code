<template>
  <transition name="width-transition">
    <div :class="['layer-box', { 'full-width': isFullWidth }]">
      <div class="layer-manager-head">图层</div>
      <div class="layer-manager-body" v-if="isShowLayer">
        <draggable
          :list="list"
          @change="draggableChange"
          draggable=".draggable-item"
        >
          <div
            :class="{
              'layer-item': true,
              'draggable-item': true,
            }"
            v-for="item in list"
            :key="item"
          >
            <BarsOutlined />
            {{ item["mic-shape"].vccName }}
          </div>
        </draggable>
      </div>
    </div>
  </transition>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    isFullWidth: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let isShowLayer = ref(true);
    let rawDataStructure = ref({});
    let list = ref([]);
    const mainPanelProvider = inject("mainPanelProvider");
    const draggableChange = (e) => {
      const rawData = rawDataStructure.value;
      rawData.template.__children[0].div.__children = JSON.parse(
        JSON.stringify(list.value)
      );
      mainPanelProvider.render(rawData);
    };

    onMounted(() => {
      mainPanelProvider.onCodeStructureUpdated((codeRawVueInfo) => {
        isShowLayer.value = false;
        rawDataStructure.value = mainPanelProvider.getRawDataStructure();
        list.value = rawDataStructure.value.template.__children[0].div
          .__children
          ? JSON.parse(
              JSON.stringify(
                rawDataStructure.value.template.__children[0].div.__children
              )
            )
          : [];
        setTimeout(() => {
          isShowLayer.value = true;
        });
      });
    });
    return {
      isShowLayer,
      rawDataStructure,
      draggableChange,
      list,
    };
  },
};
</script>

<style scoped lang="scss">
.layer-box {
  width: 0; /* 初始宽度 */
  height: 100%;
  transition: width 0.5s ease; /* 定义宽度过渡效果 */
  display: flex;
  flex-direction: column;

  .layer-manager-head {
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    color: #bcc9d4;
    user-select: none;
    background: #2e343c;
  }
  .layer-manager-body {
    flex: 1;
    .layer-item {
      width: 200px;
      padding: 10px;
    }
  }
}

.full-width {
  width: 200px; /* 目标宽度 */
}
</style>
