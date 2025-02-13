import { inject, watch, ref } from "vue";
import { merge } from "lodash-es";
import {
  objectToArray,
  attrObjToString,
} from "../components/vccEditor/utils/utils.js";

export function rowVueInfo(c, pageInfoKey = ":com") {
  const mainPanelProvider = inject("mainPanelProvider");
  const rawVueInfo = mainPanelProvider.getRawVueInfo();
  let pageInfo = {};
  try {
    pageInfo = rawVueInfo[Object.keys(rawVueInfo)];
  } catch (error) {}
  if (!pageInfo) {
    return;
  }
  let com = merge(JSON.parse(JSON.stringify(c)), pageInfo[pageInfoKey] || {});

  const config = ref(com);

  const getOptions = (data, filters) => {
    const list = [];
    if (filters && filters.length > 0) {
      filters.forEach((m) => {
        const dto = data.find((n) => n.value == m);
        if (dto) {
          list.push(dto);
        } else {
          list.push({ value: m, label: m });
        }
      });
    }
    return list;
  };

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
    getOptions,
  };
}
