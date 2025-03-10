<template>
  <div
    :style="wrapperStyle"
    class="vue-ruler-wrapper"
    ref="vueRulerWrapper"
    onselectstart="return false;"
  >
    <session v-show="rulerToggle">
      <div
        ref="horizontalRuler"
        class="vue-ruler-h"
        @mousedown.stop="horizontalDragRuler"
      >
        <span
          v-for="(item, index) in xScale"
          :key="index"
          :style="{ left: index * 50 + 2 + 'px' }"
          class="n"
          >{{ item.id }}</span
        >
      </div>
      <div
        ref="verticalRuler"
        class="vue-ruler-v"
        @mousedown.stop="verticalDragRuler"
      >
        <span
          v-for="(item, index) in yScale"
          :key="index"
          :style="{ top: index * 50 + 2 + 'px' }"
          class="n"
          >{{ item.id }}</span
        >
      </div>
      <div
        :style="{ top: verticalDottedTop + 'px' }"
        class="vue-ruler-ref-dot-h"
      />
      <div
        :style="{ left: horizontalDottedLeft + 'px' }"
        class="vue-ruler-ref-dot-v"
      />
      <div
        v-for="item in lineList"
        :title="item.title"
        :style="getLineStyle(item)"
        :key="item.id"
        :class="`vue-ruler-ref-line-${item.type}`"
        @mousedown="handleDragLine(item)"
      ></div>
    </session>
    <div ref="content" class="vue-ruler-content" :style="contentStyle">
      <slot />
    </div>
    <div v-show="isDrag" class="vue-ruler-content-mask"></div>
  </div>
</template>

<script>
import { on, off } from "./event.js";
export default {
  name: "editRule",
  components: {},
  props: {
    width: {
      type: [String],
      default: "",
    },
    height: {
      type: [String],
      default: "",
    },
    position: {
      type: String,
      default: "relative",
      validator: function (val) {
        return (
          ["absolute", "fixed", "relative", "static", "inherit"].indexOf(
            val
          ) !== -1
        );
      },
    }, // 规定元素的定位类型
    isHotKey: {
      type: Boolean,
      default: true,
    }, // 热键开关
    isScaleRevise: {
      type: Boolean,
      default: false,
    }, // 刻度修正(根据content进行刻度重置)
    value: {
      type: Array,
      default: () => {
        return []; // { type: 'h', site: 50 }, { type: 'v', site: 180 }
      },
    }, // 预置参考线
    contentLayout: {
      type: Object,
      default: () => {
        return { top: 0, left: 0 };
      },
    }, // 内容部分布局
    parent: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    stepLength: {
      type: Number,
      default: 50,
      validator: (val) => val % 10 === 0,
    }, // 步长
  },
  data() {
    return {
      size: 17,
      left_top: 18, // 内容左上填充
      windowWidth: 0, // 窗口宽度
      windowHeight: 0, // 窗口高度
      xScale: [], // 水平刻度
      yScale: [], // 垂直刻度
      topSpacing: 0, // 标尺与窗口上间距
      leftSpacing: 0, //  标尺与窗口左间距
      isDrag: false,
      dragFlag: "", // 拖动开始标记，可能值x(从水平标尺开始拖动),y(从垂直标尺开始拖动)
      horizontalDottedLeft: -999, // 水平虚线位置
      verticalDottedTop: -999, // 垂直虚线位置
      rulerWidth: 0, // 垂直标尺的宽度
      rulerHeight: 0, // 水平标尺的高度
      dragLineId: "", // 被移动线的ID
      keyCode: {
        r: 82,
      }, // 快捷键参数
      rulerToggle: true, // 标尺辅助线显示开关
      time: null,
    };
  },
  computed: {
    wrapperStyle() {
      return {
        width: this.width ? this.width : this.windowWidth + "px",
        height: this.height ? this.height : this.windowHeight + "px",
        position: this.position,
      };
    },
    contentStyle() {
      return {
        width: this.width ? this.width : this.windowWidth + "px",
        height: this.height ? this.height : this.windowHeight + "px",
        left: this.contentLayout.left + "px",
        top: this.contentLayout.top + "px",
        padding: this.left_top + "px 0px 0px " + this.left_top + "px",
      };
    },
    lineList() {
      let hCount = 0;
      let vCount = 0;
      return this.value.map((item) => {
        const isH = item.type === "h";
        return {
          id: `${item.type}_${isH ? hCount++ : vCount++}`,
          type: item.type,
          title: item.site.toFixed(2) + "px",
          [isH ? "top" : "left"]:
            item.site / (this.stepLength / 50) + this.size,
        };
      });
    },
  },
  watch: {
    visible: {
      handler(visible) {
        this.rulerToggle = visible;
      },
      immediate: true,
    },
  },
  mounted() {
    on(document, "mousemove", this.dottedLineMove);
    on(document, "mouseup", this.dottedLineUp);
    on(document, "keyup", this.keyboard);
    this.init();
    on(window, "resize", this.windowResize);
  },
  beforeDestroy() {
    off(document, "mousemove", this.dottedLineMove);
    off(document, "mouseup", this.dottedLineUp);
    off(document, "keyup", this.keyboard);
    off(window, "resize", this.windowResize);
  },
  methods: {
    init() {
      this.box();
      this.scaleCalc();
    },
    windowResize() {
      this.xScale = [];
      this.yScale = [];
      this.init();
    },
    getLineStyle({ type, top, left }) {
      return type === "h" ? { top: top + "px" } : { left: left + "px" };
    },
    handleDragLine({ type, id }) {
      return type === "h"
        ? this.dragHorizontalLine(id)
        : this.dragVerticalLine(id);
    },
    regenerateScale() {
      this.time && clearTimeout(this.time);
      this.time = setTimeout(() => {
        // 根据内容部分进行刻度修正
        let content = this.$refs.vueRulerWrapper;
        this.xScale = [];
        this.yScale = [];
        if (this.$refs.verticalRuler) {
          this.$refs.verticalRuler.style.height = "100%";
        }
        this.getCalc(this.xScale, content.scrollWidth);
        this.getCalc(this.yScale, content.scrollHeight);
        this.$refs.horizontalRuler.style.width = content.scrollWidth + "px";
        if (this.$refs.verticalRuler) {
          this.$refs.verticalRuler.style.height = content.scrollHeight + "px";
        }
      }, 200);
    },
    box() {
      if (this.isScaleRevise) {
        // 根据内容部分进行刻度修正
        const content = this.$refs.content;
        const contentLeft = content.offsetLeft;
        const contentTop = content.offsetTop;

        this.getCalcRevise(this.xScale, contentLeft);
        this.getCalcRevise(this.yScale, contentTop);
      }
      if (this.parent) {
        const style = window.getComputedStyle(this.$el.parentNode, null);
        this.windowWidth = parseInt(style.getPropertyValue("width"), 10);
        this.windowHeight = parseInt(style.getPropertyValue("height"), 10);
      } else {
        this.windowWidth =
          document.documentElement.clientWidth - this.leftSpacing;
        this.windowHeight =
          document.documentElement.clientHeight - this.topSpacing;
      }
      this.rulerWidth = this.$refs.verticalRuler.clientWidth;
      this.rulerHeight = this.$refs.horizontalRuler
        ? this.$refs.horizontalRuler.clientHeight
        : 0;
      this.setSpacing();
    }, // 获取窗口宽与高
    setSpacing() {
      this.topSpacing = this.$refs.horizontalRuler
        ? this.$refs.horizontalRuler.getBoundingClientRect().y
        : 0; //.offsetParent.offsetTop
      this.leftSpacing = this.$refs.verticalRuler
        ? this.$refs.verticalRuler.getBoundingClientRect().x
        : 0; // .offsetParent.offsetLeft
    },
    scaleCalc() {
      this.getCalc(this.xScale, this.windowWidth);
      this.getCalc(this.yScale, this.windowHeight);
    }, // 计算刻度
    getCalc(array, length) {
      for (
        let i = 0;
        i < (length * this.stepLength) / 50;
        i += this.stepLength
      ) {
        if (i % this.stepLength === 0) {
          array.push({ id: i });
        }
      }
    }, // 获取刻度方法
    getCalcRevise(array, length) {
      for (let i = 0; i < length; i += 1) {
        if (i % this.stepLength === 0 && i + this.stepLength <= length) {
          array.push({ id: i });
        }
      }
    }, // 获取矫正刻度方法
    newLine(val) {
      this.isDrag = true;
      this.dragFlag = val;
    }, // 生成一个参考线
    dottedLineMove($event) {
      this.setSpacing();
      switch (this.dragFlag) {
        case "x":
          if (this.isDrag) {
            this.verticalDottedTop = $event.pageY - this.topSpacing;
          }
          break;
        case "y":
          if (this.isDrag) {
            this.horizontalDottedLeft = $event.pageX - this.leftSpacing;
          }
          break;
        case "h":
          if (this.isDrag) {
            this.verticalDottedTop = $event.pageY - this.topSpacing;
          }
          break;
        case "v":
          if (this.isDrag) {
            this.horizontalDottedLeft = $event.pageX - this.leftSpacing;
          }
          break;
        default:
          break;
      }
    }, // 虚线移动
    dottedLineUp($event) {
      this.setSpacing();
      if (this.isDrag) {
        this.isDrag = false;
        const cloneList = JSON.parse(JSON.stringify(this.value));
        switch (this.dragFlag) {
          case "x":
            cloneList.push({
              type: "h",
              site:
                ($event.pageY - this.topSpacing - this.size) *
                (this.stepLength / 50),
            });
            this.$emit("input", cloneList);
            break;
          case "y":
            cloneList.push({
              type: "v",
              site:
                ($event.pageX - this.leftSpacing - this.size) *
                (this.stepLength / 50),
            });
            this.$emit("input", cloneList);
            break;
          case "h":
            this.dragCalc(
              cloneList,
              $event.pageY,
              this.topSpacing,
              this.rulerHeight,
              "h"
            );
            this.$emit("input", cloneList);
            break;
          case "v":
            this.dragCalc(
              cloneList,
              $event.pageX,
              this.leftSpacing,
              this.rulerWidth,
              "v"
            );
            this.$emit("input", cloneList);
            break;
          default:
            break;
        }
        this.verticalDottedTop = this.horizontalDottedLeft = -10;
      }
    }, // 虚线松开
    dragCalc(list, page, spacing, ruler, type) {
      if (page - spacing < ruler) {
        let Index, id;
        this.lineList.forEach((item, index) => {
          if (item.id === this.dragLineId) {
            Index = index;
            id = item.id;
          }
        });
        list.splice(Index, 1, {
          type: type,
          site: -600,
        });
      } else {
        let Index, id;
        this.lineList.forEach((item, index) => {
          if (item.id === this.dragLineId) {
            Index = index;
            id = item.id;
          }
        });
        list.splice(Index, 1, {
          type: type,
          site: (page - spacing - this.size) * (this.stepLength / 50),
        });
      }
    },
    horizontalDragRuler() {
      this.newLine("x");
    }, // 水平标尺处按下鼠标
    verticalDragRuler() {
      this.newLine("y");
    }, // 垂直标尺处按下鼠标
    dragHorizontalLine(id) {
      this.isDrag = true;
      this.dragFlag = "h";
      this.dragLineId = id;
    }, // 水平线处按下鼠标
    dragVerticalLine(id) {
      this.isDrag = true;
      this.dragFlag = "v";
      this.dragLineId = id;
    }, // 垂直线处按下鼠标
    keyboard($event) {
      if (this.isHotKey) {
        switch ($event.keyCode) {
          case this.keyCode.r:
            this.rulerToggle = !this.rulerToggle;
            this.$emit("update:visible", this.rulerToggle);
            if (this.rulerToggle) {
              this.left_top = 18;
            } else {
              this.left_top = 0;
            }
            break;
        }
      }
    }, // 键盘事件
  },
};
</script>

<style lang="scss">
.vue-ruler {
  &-wrapper {
    left: 0;
    top: 0;
    z-index: 20;
    overflow: hidden;
    user-select: none;
  }
  &-h,
  &-v,
  &-ref-line-v,
  &-ref-line-h,
  &-ref-dot-h,
  &-ref-dot-v {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 20;
  }
  &-h,
  &-v,
  &-ref-line-v,
  &-ref-line-h,
  &-ref-dot-h,
  &-ref-dot-v {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 999;
  }

  &-h {
    width: 100%;
    height: 18px;
    left: 18px;
    opacity: 0.6;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC)
      repeat-x; /*./image/ruler_h.png*/
  }

  &-v {
    width: 18px;
    height: 100%;
    top: 18px;
    opacity: 0.6;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC)
      repeat-y; /*./image/ruler_v.png*/
  }

  &-v .n,
  &-h .n {
    position: absolute;
    font: 10px/1 Arial, sans-serif;
    color: #333;
    cursor: default;
  }

  &-v .n {
    width: 8px;
    left: 3px;
    word-wrap: break-word;
  }

  &-h .n {
    top: 1px;
  }

  &-ref-line-v,
  &-ref-line-h,
  &-ref-dot-h,
  &-ref-dot-v {
    z-index: 998;
  }

  &-ref-line-h {
    width: 100%;
    height: 3px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFSv//AAAAH8VRuAAAAA5JREFUeNpiYIACgAADAAAJAAE0lmO3AAAAAElFTkSuQmCC)
      repeat-x left center; /*./image/line_h.png*/
    cursor: n-resize; /*url(./image/cur_move_h.cur), move*/
  }

  &-ref-line-v {
    width: 3px;
    height: 100%;
    _height: 9999px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAMAAAAPxGVzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFSv//AAAAH8VRuAAAAA5JREFUeNpiYEAFAAEGAAAQAAGePof9AAAAAElFTkSuQmCC)
      repeat-y center top; /*./image/line_v.png*/
    cursor: w-resize; /*url(./image/cur_move_v.cur), move*/
  }

  &-ref-dot-h {
    width: 100%;
    height: 3px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==)
      repeat-x left 1px; /*./image/line_dot.png*/
    cursor: n-resize; /*url(./image/cur_move_h.cur), move*/
    top: -10px;
  }

  &-ref-dot-v {
    width: 3px;
    height: 100%;
    _height: 9999px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==)
      repeat-y 1px top; /*./image/line_dot.png*/
    cursor: w-resize; /*url(./image/cur_move_v.cur), move*/
    left: -10px;
  }
  &-content {
    position: absolute;
    z-index: 20;
  }
  &-content-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 30;
  }
}
.vue-ruler-wrapper {
  overflow: auto;
  overflow-x: hidden;
  z-index: 1;
}
</style>
