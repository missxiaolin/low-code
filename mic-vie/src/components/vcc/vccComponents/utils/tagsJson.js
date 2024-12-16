const style = [
  "class",
  "id",
  "width",
  "height",
  "margin",
  "padding",
  "line-height",
  "color",
  "background",
  "font-size",
  "text-align",
  "position",
  "z-index",
  "top",
  "left",
  "bottom",
  "right",
];

export default {
  div: {
    style: style,
    component: ["__text__"],
  },
  span: {
    style: style,
    component: ["__text__"],
  },
  a: {
    style: style,
    component: ["href", "target", "__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "提示",
            key: "title",
            placeholder: "鼠标悬停时显示工具提示",
            settingType: "input",
            value: "",
          },
        ],
      },
    },
  },
  "a-button": {
    style: style,
    component: ["href", "target", "size", "type", "__text__"],
  },
  "a-watermark": {
    style: style,
    component: [":rotate", ":zIndex", "image", "content"],
  },
  "a-divider": {
    style: style,
    component: ["dashed", "orientation", "__text__"],
  },
  "xl-flex": {
    style: style,
    component: [
      "__text__",
      "vertical",
      "wrap",
      "justify",
      "align",
      "flex",
      "gap",
    ],
  },
  "a-anchor": {
    style: style,
    component: ["wrapperClass", ":items", "direction"],
  },
  "a-page-header": {
    style: style,
    component: ["title", "sub-title"],
    customComponent: {
      event: {
        title: "事件",
        children: [
          {
            label: "返回按钮的点击事件",
            key: "@back",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
};
