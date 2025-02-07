<template>
  <div>大屏预览</div>
</template>

<script>
import { nextTick, onMounted } from "vue";
import { setStyle, on } from "../../components/vccEditor/utils/dom";
// 大屏方案 autofit.js

export default {
  setup() {
    // 全屏铺满
    const resizeAuto = (width, height) => {
      const cw = document.documentElement.clientWidth;
      const ch = document.documentElement.clientHeight;
      const ratioX = cw / width;
      const ratioY = ch / height;
      setStyle(document.body, {
        transform: `scale(${ratioX}, ${ratioY})`,
        transformOrigin: "left top",
        backgroundSize: "100% 100%",
      });
    };
    // 等比缩放宽度铺满
    const resizeWidth = (width) => {
      const ratio = document.documentElement.clientWidth / width;
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: "left top",
        backgroundSize: "100%",
      });
    };
    // 等比缩放高度铺满
    const resizeHeight = (height) => {
      const cw = document.documentElement.clientWidth;
      const ch = document.documentElement.clientHeight;
      const ratio = ch / height;
      const gap = (cw - width * ratio) / 2;
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: "left top",
        backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
        backgroundPosition: `${gap.toFixed(3)}px top`,
        marginLeft: `${gap.toFixed(3)}px`,
      });
    };
    // 不缩放
    const resizeFull = (width, height) => {
      const cw = document.documentElement.clientWidth;
      const ch = document.documentElement.clientHeight;
      const ratio = ch / height;
      const gap = (cw - width * ratio) / 2;
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: "left top",
        backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
        backgroundPosition: `${gap.toFixed(3)}px top`,
        // marginLeft: `${gap.toFixed(3)}px`,
      });

      document.documentElement.style.overflowX = "scroll";
    };
    // 默认
    const resizeNone = () => {
      setStyle(document.body, {
        overflow: "hidden",
        position: "relative",
      });
    };

    const resize = (config = {}) => {
      switch (config.zoomMode) {
        case "auto": // 全屏铺满
          resizeAuto(config.width, config.height);
          break;
        case "width": // 等比缩放宽度铺满
          resizeWidth(config.width);
          break;
        case "height": // 等比缩放高度铺满
          resizeHeight(config.width, config.height);
          break;
        case "full": // 不缩放
          resizeFull(config.width, config.height);
          break;
        default:
          resizeNone();
          break;
      }
    };

    const initPageInfo = () => {
      resize();
    };
    onMounted(() => {
      nextTick(() => {
        initPageInfo();
      });
      on(window, "resize", () => {
        resize();
      });
    });
  },
};
</script>
