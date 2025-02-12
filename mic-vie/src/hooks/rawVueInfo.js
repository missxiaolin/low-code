import { inject, watch, ref } from "vue";
import { merge } from "lodash-es";
import {
  objectToArray,
  attrObjToString,
} from "../components/vccEditor/utils/utils.js";

export function rowVueInfo(c) {
  const mainPanelProvider = inject("mainPanelProvider");
  const rawVueInfo = mainPanelProvider.getRawVueInfo();
  let pageInfo = {};
  try {
    pageInfo = rawVueInfo[Object.keys(rawVueInfo)];
  } catch (error) {}
  if (!pageInfo) {
    return;
  }
  let com = merge(JSON.parse(JSON.stringify(c)), pageInfo.com || {});

  const config = ref(com);

  watch(config.value, (newVal) => {
    pageInfo[":com"] = attrObjToString(JSON.parse(JSON.stringify(newVal)));
    mainPanelProvider.saveAttribute(
      objectToArray(pageInfo),
      pageInfo.lc_id,
      false
    );
  });

  return {
    config,
    pageInfo,
    mainPanelProvider,
    rawVueInfo,
  };
}
