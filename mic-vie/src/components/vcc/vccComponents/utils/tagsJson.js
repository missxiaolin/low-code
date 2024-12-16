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
    // component: ["@click"],
  },
  span: {
    style: style,
    // component: ["@click"],
  },
  a: {
    style: style,
    component: ["href", "target", "title"],
  },
  "a-button": {
    style: style,
    component: ["href", "target", "size", "type"],
  },
  "a-watermark": {
    style: style,
    component: [":rotate", ":zIndex", "image", "content"],
  },
};
