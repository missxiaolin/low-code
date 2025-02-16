<template>
  <div
    :class="comJson.class"
    id="preview-container"
    :lc_id="comJson.lc_id"
    :style="comJson.style"
  >
    <template v-for="item in comJson.__children">
      <previewShape v-bind="getAttr(item)" :scale="scale"></previewShape>
    </template>
  </div>
</template>

<script>
import { nextTick, onMounted, ref } from "vue";
import { pageRouteDetail } from "../../api/dpPage";
import previewShape from "../../components/vccEditor/shape/preview.vue";
import { setStyle, on } from "../../components/vccEditor/utils/dom";
import { useRouter, useRoute } from "vue-router";
import {
  attrStringToObj,
  attrObjToString,
  objectToArray,
} from "../../components/vccEditor/utils/utils";

// 大屏方案 autofit.js

export default {
  components: {
    previewShape,
  },
  setup() {
    const comJson = ref({});
    const router = useRouter();
    const route = useRoute();

    // 全屏铺满
    const resizeAuto = (width, height) => {
      const cw = document.documentElement.clientWidth;
      const ch = document.documentElement.clientHeight;
      const ratioX = cw / width;
      const ratioY = ch / height;
      setStyle(document.getElementById("preview-container"), {
        transform: `scale(${ratioX}, ${ratioY})`,
        transformOrigin: "left top",
        backgroundSize: "100% 100%",
      });
    };
    // 等比缩放宽度铺满
    const resizeWidth = (width) => {
      const ratio = document.documentElement.clientWidth / width;
      setStyle(document.getElementById("preview-container"), {
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
      setStyle(document.getElementById("preview-container"), {
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
      setStyle(document.getElementById("preview-container"), {
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
      setStyle(document.getElementById("preview-container"), {
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

    const getWH = (str) => {
      const width = str.match(/width: (\d+)px;/)[1];
      const height = str.match(/height: (\d+)px;/)[1];
      return {
        width: Number(width),
        height: Number(height),
      };
    };

    const initPageInfo = async () => {
      const res = await pageRouteDetail({
        id: route.query.id,
        projectId: route.query.projectId,
      });
      if (!res.success) {
        return;
      }
      const json = JSON.parse(res.model.tem_json).template.__children[0].div;
      comJson.value = json;
      setTimeout(() => {
        resize({
          zoomMode: comJson.value.zoomMode,
          ...getWH(comJson.value.style),
        });
      }, 0);
    };

    const getAttr = (item) => {
      const share = JSON.parse(JSON.stringify(item["mic-shape"]));
      Object.keys(share).forEach((key) => {
        if (key.startsWith(":")) {
          share[key.substring(1)] = attrStringToObj(share[key]);
        }
      });

      return share;
    };

    onMounted(() => {
      nextTick(() => {
        initPageInfo();
      });
      on(window, "resize", () => {
        resize({
          zoomMode: comJson.value.zoomMode,
          ...getWH(comJson.value.style),
        });
      });
    });

    return {
      comJson,
      getAttr,
    };
  },
};
</script>
