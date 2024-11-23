import { ref, watch } from "vue";
import {
  getAttrJson,
  getAttrKeys,
  stringToObj,
} from "../components/vcc/vccComponents/utils/index";

export function saveAttr(props, instance, tagAttr, emitEvent = "childSave") {
  let list = ref([]);
  let localAttr = ref(props.localAttributes);
  let vueRawTag = ref(props.vueRawTag);

  const init = () => {
    const attrObj = getAttrKeys(localAttributes);
    list.value = getAttrJson(attrObj, vueRawTag, tagAttr);
  };

  watch(
    props,
    (newValue) => {
      vueRawTag.value = newValue.vueRawTag;
      localAttr.value = newValue.localAttributes;
      init(newValue.localAttributes, newValue.vueRawTag);
    },
    { deep: true }
  );

  const handleBlur = (e, key) => {
    instance.emit(emitEvent, key, `${e.srcElement.value}`);
  };

  return {
    list,
    localAttr,
    vueRawTag,
    handleBlur,
    init,
  };
}
