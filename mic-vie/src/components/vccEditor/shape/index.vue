<template>
  <div
    ref="shape"
    :class="{
      shape: true,
    }"
    @dblclick="(event) => dbselectCurComponent(event)"
    @click="(event) => selectCurComponent(event)"
    @mousedown="(event) => handleDragendShape(event)"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "vue";
import { throttle } from "lodash";
export default {
  props: {
    defaultStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    let canvasState = "";
    const shape = ref(null);
    const borderWidth = ref("0px");
    const borderColor = ref("#fff0");
    const borderStyle = ref("none");
    let top = 0,
      left = 0;

    // 双击事件
    const dbselectCurComponent = (event) => {
      e.preventDefault();
    };

    // 单击事件
    const selectCurComponent = (event) => {
      canvasState = event.target;
      let computedStyle = window.getComputedStyle(canvasState);
      left = parseInt(computedStyle.getPropertyValue("left"));
      top = parseInt(computedStyle.getPropertyValue("top"));
    };

    // 拖拽事件
    const handleDragendShape = (e) => {
      if (!canvasState) return;
      e.preventDefault();
      e.stopPropagation();
      const startY = e.clientY;
      const startX = e.clientX;
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = top;
      const startLeft = left;
      // 如果元素没有移动，则不保存快照
      const move = throttle((moveEvent) => {
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        top = curY - startY + startTop;
        left = curX - startX + startLeft;
        canvasState.style.left = left + "px";
        canvasState.style.top = top + "px";
      }, 0);
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    return {
      shape,
      borderWidth,
      borderColor,
      borderStyle,
      dbselectCurComponent,
      selectCurComponent,
      handleDragendShape,
    };
  },
};
</script>

<style scoped>
.shape {
  border-width: v-bind(borderWidth);
  border-color: v-bind(borderColor);
  border-style: v-bind(borderStyle);
  position: absolute;

  .error-info {
    color: red;
    font-size: 20px;
    white-space: nowrap;
  }
}

.active {
  outline: 1px solid #70c0ff;
}

.shape-point {
  margin-left: -4px;
  margin-top: -4px;
}

.rotation {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  height: 20px !important;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

div em {
  background-color: #f0f8ff52;
  border-radius: 3px;
  color: antiquewhite;
}

.shape-point.lt.rotate-0,
.shape-point.rb.rotate-0,
.shape-point.l.rotate-45,
.shape-point.r.rotate-45,
.shape-point.lb.rotate-90,
.shape-point.rt.rotate-90,
.shape-point.t.rotate-135,
.shape-point.b.rotate-135 {
  cursor: nwse-resize;
}

.shape-point.t.rotate-0,
.shape-point.b.rotate-0,
.shape-point.lt.rotate-45,
.shape-point.rb.rotate-45,
.shape-point.l.rotate-90,
.shape-point.r.rotate-90,
.shape-point.lb.rotate-135,
.shape-point.rt.rotate-135 {
  cursor: ns-resize;
}

.shape-point.lb.rotate-0,
.shape-point.rt.rotate-0,
.shape-point.t.rotate-45,
.shape-point.b.rotate-45,
.shape-point.lt.rotate-90,
.shape-point.rb.rotate-90,
.shape-point.l.rotate-135,
.shape-point.r.rotate-135 {
  cursor: nesw-resize;
}

.shape-point.l.rotate-0,
.shape-point.r.rotate-0,
.shape-point.lb.rotate-45,
.shape-point.rt.rotate-45,
.shape-point.t.rotate-90,
.shape-point.b.rotate-90,
.shape-point.lt.rotate-135,
.shape-point.rb.rotate-135 {
  cursor: ew-resize;
}
</style>
