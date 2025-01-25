<template>
  <div class="canvas-ruler-wp">
    <div
      ref="hRulerWpRef"
      class="ruler-wrapper h-container"
      :style="`transform: translateX(-${hScroll}px);`"
    ></div>
    <div
      ref="vRulerWpRef"
      class="ruler-wrapper v-container"
      :style="`transform: rotate(90deg) translateX(-${vScroll}px);`"
    ></div>
    <div title="切换参考线" class="ruler-corner" @click="toggleGuides">
      <n-icon v-if="visible">
        <EyeOutlined />
      </n-icon>
      <n-icon v-else>
        <EyeInvisibleOutlined />
      </n-icon>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from "vue";
import { RulerBuilder } from "./ruleIndex.js";

export default {
  setup(props, { expose }) {
    const hRulerWpRef = ref(null);
    const vRulerWpRef = ref(null);
    const hRuler = ref(null);
    const vRuler = ref(null);
    const visible = ref(true);
    const hScroll = ref(0);
    const vScroll = ref(0);

    const cw = document.documentElement.clientWidth;
    let guideLine = {
      h: [],
      v: [],
    };

    const setHRule = (hWidth, canvas) => {
      if (hRuler.value) {
        hRuler.value.setSize(hWidth, 20, canvas.scale);
      } else {
        hRuler.value = new RulerBuilder(hRulerWpRef.value, {
          direction: "TB",
          width: hWidth,
          scale: canvas.scale,
          coorChange: (action, nCoor, oCoor) => {
            if (action === "add") {
              guideLine.h.push(nCoor);
            } else if (action === "update" && nCoor !== oCoor) {
              guideLine.h = guideLine.h.filter((m) => m !== oCoor);
              guideLine.h.push(nCoor);
            } else if (action === "delete") {
              guideLine.h = guideLine.h.filter((m) => m !== nCoor);
            }
          },
        });
        hRuler.value.setGuideLines(guideLine.h);
      }
    };

    const setVRule = (canvas) => {
      if (vRuler.value) {
        vRuler.value.setSize(canvas.height, 20, canvas.scale);
      } else {
        vRuler.value = new RulerBuilder(vRulerWpRef.value, {
          direction: "LR",
          width: canvas.height,
          scale: canvas.scale,
          coorChange: (action, nCoor, oCoor) => {
            if (action === "add") {
              guideLine.v.push(nCoor);
            } else if (action === "update" && nCoor !== oCoor) {
              guideLine.v = guideLine.v.filter((m) => m !== oCoor);
              guideLine.v.push(nCoor);
            } else if (action === "delete") {
              guideLine.v = guideLine.v.filter((m) => m !== nCoor);
            }
          },
        });

        vRuler.value.setGuideLines(guideLine.v);
      }
    };

    watchEffect(() => {
      if (!hRulerWpRef.value || !vRulerWpRef.value) {
        return;
      }

      const canvas = {
        width: 1920,
        height: 1080,
        scale: 1,
      };
      const hWidth = Math.max(canvas.width, cw);
      setHRule(hWidth, canvas);

      setVRule(canvas);
    });

    const onScroll = (ev) => {
      const dom = ev.target;
      hScroll.value = dom.scrollLeft;
      vScroll.value = dom.scrollTop;
    };
    const toggleGuides = () => {
      if (hRuler.value && vRuler.value) {
        visible.value = !visible.value;
        hRuler.value.toggleGuide(visible.value);
        vRuler.value.toggleGuide(visible.value);
      }
    };

    onMounted(() => {
      nextTick(() => {
        const canvasWp = document.getElementById("editor");
        canvasWp?.addEventListener("scroll", onScroll);
      });
    });

    onUnmounted(() => {
      const canvasWp = document.getElementById("editor");
      canvasWp?.removeEventListener("scroll", onScroll);
    });

    expose({
      setHRule,
      setVRule,
    });

    return {
      toggleGuides,
      hRulerWpRef,
      vRulerWpRef,
      hRuler,
      vRuler,
      visible,
      hScroll,
      vScroll,
    };
  },
};
</script>

<style lang="scss">
$line-border-1: 1px solid rgb(0 173 255 / 84%);
$line-border-2: 1px dashed rgb(0 173 255 / 84%);
$line-border-3: 1px solid rgb(161 174 179 / 80%);

.canvas-ruler-wp {
  position: fixed;
  z-index: 1;

  .ruler-wrapper {
    position: absolute;
    height: 20px;
  }

  .ruler-line {
    position: absolute;

    .line-action {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      color: #fff;
      padding: 0 4px;
      border-radius: 1px;
      box-shadow: 0 0 5px -3px #000;
      background: rgb(64 116 180 / 100%);

      .line-value {
        pointer-events: none;
      }
    }
  }

  .ruler-indicator {
    position: absolute;
    pointer-events: none;

    .indicator-value {
      position: absolute;
      background: rgb(64 116 180 / 100%);
      color: #fff;
      border-radius: 1px;
      padding: 0 4px;
    }
  }

  .h-container {
    left: 20px;
    cursor: ew-resize;
    transform: translateX(0);

    .ruler-line {
      top: 0;
      height: 100vh;
      padding-left: 5px;
      border-left: $line-border-1;

      .line-action {
        top: 5px;
      }
    }

    .ruler-indicator {
      border-left: $line-border-2;
      top: 0;
      height: 100vw;

      .indicator-value {
        left: 10px;
        top: 5px;
      }
    }
  }

  .v-container {
    cursor: ns-resize;
    transform: rotate(90deg) translateX(0);
    transform-origin: 0 100% 0;

    .lines-wrapper {
      transform: rotate(-90deg);
      transform-origin: 0 100% 0;
    }

    .ruler-line {
      left: 3px;
      width: 100vw;
      border-top: $line-border-1;

      .line-action {
        top: 10px;
        left: 5px;
        transform: rotate(90deg);
      }
    }

    .ruler-indicator {
      border-bottom: $line-border-2;
      width: 100vw;
      bottom: 1px;
      transform: rotate(-90deg);
      transform-origin: 1px 100% 0;

      .indicator-value {
        transform-origin: 0 0;
        transform: rotate(90deg);
        top: 10px;
        left: 25px;
      }
    }
  }

  .ruler-corner {
    position: fixed;
    z-index: 999;
    display: flex;
    width: 20px;
    height: 20px;
    font-size: 16px;
    color: #424447;
    cursor: pointer;
    background: #0e1013;
    border-right: $line-border-3;
    border-bottom: $line-border-3;
    /**
    border-left: $line-border-3;
    border-top: $line-border-3;
    **/
    align-items: center;
    justify-content: center;

    &:hover {
      color: #fff;
    }
  }
}
</style>
