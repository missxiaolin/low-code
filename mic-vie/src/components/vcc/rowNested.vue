<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="data"
    @start="onStartDrag"
    @choose="onClick"
    :group="{ name: 'g1' }"
    v-bind="dragOptions"
    :item-key="getItemKey"
    @end="onEndDrag"
  >
    <template #item="{ element }">
      <li class="itemArea">
        <div class="content">
          <HolderOutlined class="icon" />
          <span>{{ getRawComponentKey(element) }}</span>
        </div>
        <nested-draggable :data="getChild(element)" />
      </li>
    </template>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import { getRawComponentKey, getRawComponentContent } from "@/utils/common";

import { store as _store } from "@/libs/store.js";

export default {
  name: "nested-draggable",
  props: {
    data: {
      required: true,
      type: Array,
    },
  },
  components: {
    draggable,
  },
  data() {
    return {};
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    getItemKey(item) {
      return getRawComponentContent(item).lc_id;
    },
    getChild(item) {
      const content = getRawComponentContent(item);
      // 适用于没有子节点的节点，例如div，通过这样的操作后可以往一个空的div中拖入内容
      if (!content.__children) {
        content.__children = [];
      }
      return content.__children;
    },

    getRawComponentKey,
    getRawComponentContent,
    onStartDrag(event) {
      event.item.classList.add("is-dragging");
    },
    onClick(event) {
      if (_store.state.currentEditComp) {
        _store.state.currentEditComp.item.classList.remove("is-dragging");
      }

      event.item.classList.add("is-dragging");

      event.vccData = getRawComponentContent(this.data[event.oldIndex]);
      _store.commit("storeCurrentEditComp", event);
    },
    onEndDrag(event) {
      event.item.classList.remove("is-dragging");

      _store.commit("onDragEnd");
    },
  },
};
</script>
<style scoped lang="scss">
.dragArea {
  display: flex;
  flex-direction: column;
  padding-inline-start: 30px;
  padding-right: 2px;
  padding-bottom: 2px;
}

.ghost {
  opacity: 0.5;
  background: #1e2430;
}

p {
  margin: 10px 0;
}

.itemArea {
  display: flex;
  flex-direction: column;
  position: relative;
  .content {
    display: flex;
    flex-direction: row;
  }
  .icon {
    margin-right: 5px;
  }
}

.is-dragging {
  background-color: #1e2430;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
</style>
