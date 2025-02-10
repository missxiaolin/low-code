<template>
  <div
    class="shape"
    ref="shapeRef"
    :lc_id="lc_id"
    :style="{
      top: `${defaultStyle.top}px`,
      left: `${defaultStyle.left}px`,
      width: `${defaultStyle.width}px`,
      height: `${defaultStyle.height}px`,
    }"
    @dblclick="(event) => dbselectCurComponent(event)"
    @click="(event) => selectCurComponent(event)"
    @mousedown="(event) => handleDragendShape(event)"
  >
    <referLine
      v-if="selectLcId && selectLcId == lc_id"
      :scale="scale"
      :pos="referPos"
    />
    <div
      v-for="item in pointRenderData"
      :key="item.direction"
      :class="{
        'shape-point': true,
        [item.direction]: true,
      }"
      :style="{
        top: item.top,
        left: item.left,
      }"
      @mousedown="(event) => handleStretchedShape(item.direction, event)"
    ></div>
    <component :is="vccComponentName" v-bind="attrs"></component>
  </div>
</template>

<script>
import { ref, toRefs, toRef, useAttrs, watch, onMounted } from "vue";
import { throttle } from "lodash";
import { pointRenderData } from "./config";
import { stretchedComponents } from "../utils/component";
import referLine from "./refer-line.vue";
export default {
  name: "micShape",
  components: {
    referLine,
  },
  props: {
    defaultStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    vccComponentName: {
      type: String,
      default: "",
    },
    lc_id: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    console.log(props);
    const selectLcId = ref("");
    const scale = ref(window.vccScale);
    const attrs = useAttrs();
    let canvasState = ref("");
    const shapeRef = ref(null);
    let locked = false;
    let componentProps = ref({
      width: props.defaultStyle.width,
      height: props.defaultStyle.height,
    });

    watch(props, (newProps) => {
      componentProps.value = {
        width: newProps.defaultStyle.width,
        height: newProps.defaultStyle.height,
      };
    });

    const toProps = toRef(props);
    const referPos = ref({
      x: toProps.value.defaultStyle.left,
      y: toProps.value.defaultStyle.top,
    });

    // 双击事件
    const dbselectCurComponent = (event) => {
      event.preventDefault();
    };

    const handleSelectShape = (dom) => {
      if (!dom) return "";
      if (dom.classList.toString().indexOf("shape") > -1) {
        return dom;
      }
      return handleSelectShape(dom.parentNode);
    };

    // 单击事件
    const selectCurComponent = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!event.target || locked) return;

      const dom = handleSelectShape(event.target);
      if (!dom) return;
      canvasState.value = dom;

      window.vccMainPanelProvider.markElement(dom);
    };

    // 拖拽事件
    const handleDragendShape = (e) => {
      if (locked) return;
      if (!canvasState.value) return;
      e.preventDefault();
      e.stopPropagation();
      const startY = e.clientY;
      const startX = e.clientX;
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = toProps.value.defaultStyle.top;
      const startLeft = toProps.value.defaultStyle.left;
      // 如果元素没有移动，则不保存快照
      const move = throttle((moveEvent) => {
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        toProps.value.defaultStyle.top =
          (curY - startY) / scale.value + startTop;
        toProps.value.defaultStyle.left =
          (curX - startX) / scale.value + startLeft;
        canvasState.value.style.left = toProps.value.defaultStyle.left + "px";
        canvasState.value.style.top = toProps.value.defaultStyle.top + "px";
        referPos.value = {
          x: toProps.value.defaultStyle.left,
          y: toProps.value.defaultStyle.top,
        };
      }, 0);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);

        window.vccMainPanelProvider.setKeyValue(
          ":defaultStyle",
          `{'top':${Number(toProps.value.defaultStyle.top)},'left':${Number(
            toProps.value.defaultStyle.left
          )},'width':${Number(
            toProps.value.defaultStyle.width
          )},'height':${Number(toProps.value.defaultStyle.height)}}`,
          props.lc_id
        );
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    // 拉伸组件
    const handleStretchedShape = (point, e) => {
      if (!canvasState.value) return;
      if (e.button !== 0) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      locked = true;
      let position;
      // 获取画布位移信息
      const editorRectInfo = document
        .getElementById("editor")
        .getBoundingClientRect();

      // 获取 point 与实际拖动基准点的差值 @justJokee
      // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285

      const move = (moveEvent) => {
        // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
        // 因此第一次点击时不触发 move 事件
        const curPositon = {
          x: (moveEvent.clientX - editorRectInfo.left) / scale.value,
          y: (moveEvent.clientY - editorRectInfo.top) / scale.value,
        };
        const data = stretchedComponents(
          point,
          {
            top: toProps.value.defaultStyle.top,
            left: toProps.value.defaultStyle.left,
            height: toProps.value.defaultStyle.height,
            width: toProps.value.defaultStyle.width,
          },
          curPositon
        );
        position = data;

        canvasState.value.style.top = data.top + "px";
        canvasState.value.style.left = data.left + "px";
        canvasState.value.style.width = data.width + "px";
        canvasState.value.style.height = data.height + "px";
      };

      const up = () => {
        // console.log("position", position);
        window.vccMainPanelProvider.setKeyValue(
          ":defaultStyle",
          `{'top':${Number(position.top)},'left':${Number(
            position.left
          )},'width':${Number(position.width)},'height':${Number(
            position.height
          )}}`,
          props.lc_id
        );
        // emit("change", position);
        locked = false;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    onMounted(() => {
      window.vccMainPanelProvider &&
        window.vccMainPanelProvider.onSelectElement((rawInfo) => {
          if (!rawInfo) {
            selectLcId.value = "";
            return;
          }
          selectLcId.value = rawInfo[Object.keys(rawInfo)[0]].lc_id;
        });
    });

    return {
      componentProps,
      shapeRef,
      dbselectCurComponent,
      selectCurComponent,
      handleDragendShape,
      pointRenderData,
      canvasState,
      handleStretchedShape,
      attrs,
      scale,
      toProps,
      referPos,
      selectLcId,
    };
  },
};
</script>

<style scoped lang="scss">
.shape {
  position: absolute;
  left: 0;
  top: 0;
}

.mark-element {
  .shape-point {
    position: absolute;
    z-index: 10;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 9999px;
    border-width: 1px;
    border-style: solid;
    --tw-border-opacity: 1;
    border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
    margin-left: -4px;
    margin-top: -4px;
  }

  .shape-point.lt,
  .shape-point.t,
  .shape-point.rt,
  .shape-point.r,
  .shape-point.rb,
  .shape-point.b,
  .shape-point.lb,
  .shape-point.l {
    cursor: nwse-resize;
  }

  .shape-point.t,
  .shape-point.b {
    cursor: ns-resize;
  }

  .shape-point.l,
  .shape-point.r {
    cursor: ew-resize;
  }

  .shape-point.lb,
  .shape-point.rt {
    cursor: nesw-resize;
  }
}
</style>

<style>
.mark-element {
  outline: 1px solid #70c0ff !important;
}
</style>
