import { generateRawInfo, getSplitTag } from "./forCode";

// 遍历DOM树，初始化lc-mark标记的元素
export function deepLCEle(rootElement, onCountIncrease = () => {}) {
  // 对dragParent下所有含有lc-mark属性的Element实现可拖拽能力
  function deep(ele) {
    if (ele.attributes["lc-mark"]) {
      // 统计标记组件数量
      onCountIncrease();
      initElement(ele);
    }

    if (ele.children.length > 0) {
      const length = ele.children.length;
      for (let i = 0; i < length; i++) {
        deep(ele.children.item(i));
      }
    }
  }

  deep(rootElement);
}

export function initElement(element) {
  element.draggable = true;
  // 给每个组件添加拖拽事件
  element.addEventListener("dragstart", function (event) {
    event.dataTransfer.effectAllowed = "copy";
    const raw = generateRawInfo(element); // 获取组件的原始信息
    let title = "";
    if (element.querySelector(".title")) {
      title = element.querySelector(".title").innerText;
    }
    let component_name = "";
    if (element.querySelector(".title")) {
      component_name =
        element.querySelector(".title").getAttribute("component_name") || "";
    }
    const str = `${element.localName}${getSplitTag()}${JSON.stringify(
      raw
    )}${getSplitTag()}${title}${getSplitTag()}${component_name}`;
    console.log(str);
    event.dataTransfer.setData("text/plain", str);
    event.stopPropagation();
  });

  // 处理组件标记
  element.addEventListener("mouseenter", (event) => {
    const parentClassList = element.parentElement.classList;
    if (parentClassList && parentClassList.contains("mark-element-unit")) {
      parentClassList.remove("mark-element-unit");
      element.isRemoveParentStyle = true;
    }

    element.classList.add("mark-element-unit");
    event.stopPropagation();
  });

  element.addEventListener("mouseleave", (event) => {
    element.classList.remove("mark-element-unit");
    if (element.isRemoveParentStyle) {
      element.parentElement.classList.add("mark-element-unit");
    }

    event.stopPropagation();
  });
}
