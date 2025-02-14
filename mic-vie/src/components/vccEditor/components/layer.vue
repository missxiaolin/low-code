<template>
  <transition name="width-transition">
    <div :class="['layer-box', { 'full-width': isFullWidth }]">
      <div class="layer-manager-head">图层</div>
      <div class="layer-manager-body">
        <draggable
          :list="list"
          @change="draggableChange"
          draggable=".draggable-item"
        >
          <div
            :class="{
              'layer-item': true,
              'draggable-item': true,
              'draggable-item-active':
                clickActiveLcId == item['mic-shape'].lc_id,
            }"
            v-for="item in list"
            :key="item"
            @click="selectItem(item['mic-shape'])"
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
// https://www.itxst.com/vue-draggable-next/tutorial.html
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
    let clickActiveLcId = ref("");
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

    const selectItem = (item) => {
      mainPanelProvider.selectElement(item.lc_id);
    };

    onMounted(() => {
      mainPanelProvider
        .onCodeStructureUpdated(() => {
          rawDataStructure.value = mainPanelProvider.getRawDataStructure();
          const data = rawDataStructure.value.template.__children[0].div
            .__children
            ? JSON.parse(
                JSON.stringify(
                  rawDataStructure.value.template.__children[0].div.__children
                )
              )
            : [];

          if (JSON.stringify(data) == JSON.stringify(list.value)) return;
          list.value = data;
        })
        .onSelectElement((rawInfo) => {
          if (!rawInfo) {
            clickActiveLcId.value = "";
            return;
          }

          clickActiveLcId.value = rawInfo["mic-shape"].lc_id;
        });
    });
    return {
      clickActiveLcId,
      rawDataStructure,
      draggableChange,
      list,
      selectItem,
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
    padding-top: 10px;
    .layer-item {
      width: 200px;
      padding: 10px;
      margin-bottom: 5px;
      &.draggable-item-active {
        background: #2681ff;
      }
    }
  }
}

.full-width {
  width: 200px; /* 目标宽度 */
}
</style>
