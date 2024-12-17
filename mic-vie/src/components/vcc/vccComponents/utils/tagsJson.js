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
    component: ["__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "指定链接",
            key: "href",
            settingType: "input",
            value: "",
          },
          {
            label: "提示",
            key: "title",
            placeholder: "鼠标悬停时显示工具提示",
            settingType: "input",
            value: "",
          },
          {
            label: "打开方式",
            key: "target",
            options: [
              {
                label: "新窗口打开",
                value: "_blank",
              },
              {
                label: "当前窗口打开",
                value: "_self",
              },
              {
                label: "父框架打开",
                value: "_parent",
              },
              {
                label: "_top",
                value: "在整个浏览器打开",
              },
            ],
            settingType: "select",
            value: "",
          },
        ],
      },
    },
  },
  "a-button": {
    style: style,
    component: ["href", "target", "size", "__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "类型",
            key: "type",
            options: [
              {
                label: "primary",
                value: "primary",
              },
              {
                label: "ghost",
                value: "ghost",
              },
              {
                label: "dashed",
                value: "dashed",
              },
              {
                label: "link",
                value: "link",
              },
              {
                label: "text",
                value: "text",
              },
              {
                label: "default",
                value: "default",
              },
            ],
            settingType: "select",
            value: "",
          },
        ],
      },
    },
  },
  "a-watermark": {
    style: style,
    component: [":rotate", ":zIndex", "image", "content"],
  },
  "a-divider": {
    style: style,
    component: ["dashed", "__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "标题位置",
            key: "orientation",
            radioType: "button",
            options: [
              {
                label: "left",
                value: "left",
              },
              {
                label: "right",
                value: "right",
              },
              {
                label: "center",
                value: "center",
              },
            ],
            settingType: "radio",
            value: "center",
          },
        ],
      },
    },
  },
  "xl-flex": {
    style: style,
    component: ["__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "主轴的方向",
            key: "vertical",
            radioType: "button",
            options: [
              {
                label: "垂直",
                value: true,
              },
              {
                label: "横向",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "多行显示",
            key: "wrap",
            settingType: "input",
            value: "normal",
          },
          {
            label: "主轴对齐方式",
            tip: "设置元素在主轴方向上的对齐方式",
            key: "justify",
            settingType: "input",
            value: "normal",
          },
          {
            label: "交叉轴对齐方式",
            tip: "设置元素在交叉轴方向上的对齐方式",
            key: "align",
            settingType: "input",
            value: "normal",
          },
          {
            label: "简写属性",
            tip: "flex CSS 简写属性",
            key: "flex",
            settingType: "input",
            value: "normal",
          },
          {
            label: "简写属性",
            tip: "设置网格之间的间隙",
            key: "gap",
            settingType: "input",
            value: "",
          },
        ],
      },
    },
  },
  "a-anchor": {
    style: style,
    component: ["wrapperClass", ":items", "direction", "@change", "@click"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "导航方向",
            key: "direction",
            radioType: "button",
            options: [
              {
                label: "vertical",
                value: "vertical",
              },
              {
                label: "horizontal",
                value: "horizontal",
              },
            ],
            settingType: "radio",
            value: "vertical",
          },
        ],
      },
    },
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
      base: {
        title: "基础",
        children: [
          {
            label: "副标题",
            key: "sub-title",
            settingType: "input",
            value: "",
          },
        ],
      },
    },
  },
  "a-steps": {
    style: style,
    component: [":items"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "当前步骤",
            tip: "指定当前步骤，从 0 开始记数。在子 Step 元素中",
            key: "v-model:current",
            settingType: "input",
            value: "",
          },
          {
            label: "导航方向",
            key: "direction",
            radioType: "button",
            options: [
              {
                label: "vertical",
                value: "vertical",
              },
              {
                label: "horizontal",
                value: "horizontal",
              },
            ],
            settingType: "radio",
            value: "horizontal",
          },
          {
            label: "起始序号",
            tip: "起始序号，从 0 开始记数",
            key: "initial",
            settingType: "input",
            value: 0,
          },
          {
            label: "进度条进度",
            tip: "当前 process 步骤显示的进度条进度（只对基本类型的 Steps 生效）",
            key: "percent",
            settingType: "input",
            value: 0,
          },
          {
            label: "大小",
            key: "size",
            radioType: "button",
            options: [
              {
                label: "普通",
                value: "default",
              },
              {
                label: "迷你",
                value: "small",
              },
            ],
            settingType: "radio",
            value: "default",
          },
          {
            label: "状态",
            key: "status",
            radioType: "button",
            options: [
              {
                label: "process",
                value: "process",
              },
              {
                label: "wait",
                value: "wait",
              },
              {
                label: "finish",
                value: "finish",
              },
              {
                label: "error",
                value: "error",
              },
            ],
            settingType: "radio",
            value: "process",
          },
          {
            label: "步骤条类型",
            key: "type",
            radioType: "button",
            options: [
              {
                label: "default",
                value: "default",
              },
              {
                label: "navigation",
                value: "navigation",
              },
            ],
            settingType: "radio",
            value: "default",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "点击切换步骤时触发",
            key: "@change",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-card": {
    style: style,
    component: ["title"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "卡片类型",
            key: "type",
            settingType: "input",
            value: "",
          },
          {
            label: "大小",
            key: "size",
            radioType: "button",
            options: [
              {
                label: "default",
                value: "default",
              },
              {
                label: "small",
                value: "small",
              },
            ],
            settingType: "radio",
            value: "default",
          },
          {
            label: "loading",
            key: ":loading",
            radioType: "button",
            tip: "当卡片内容还在加载中时，可以用 loading 展示一个占位,需要绑定变量",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "hoverable",
            key: "hoverable",
            radioType: "button",
            tip: "鼠标移过时可浮起",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "是否有边框",
            key: "bordered",
            radioType: "button",
            tip: "鼠标移过时可浮起",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: true,
          },
        ],
      },
    },
  },
  "a-empty": {
    style: style,
    component: ["description", "image"],
    customComponent: {
      base: {
        title: "基础",
        children: [],
      },
    },
  },
  "xl-image": {
    style: style,
    component: ["description", "image"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "图片描述",
            key: "alt",
            settingType: "input",
            value: "",
          },
          {
            label: "加载失败容错地址",
            key: "fallback",
            settingType: "input",
            value: "",
          },
          {
            label: "图片地址",
            key: "src",
            settingType: "input",
            value: "",
          },
          {
            label: "是否可预览",
            key: ":preview",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: true,
          },
        ],
      },
    },
  },
  "xl-popconfirm": {
    style: style,
    component: ["title", "description"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "取消按钮文字",
            key: "cancelText",
            settingType: "input",
            value: "",
          },
          {
            label: "确认按钮文字",
            key: "okText",
            settingType: "input",
            value: "",
          },
          {
            label: "确认按钮类型",
            key: "okType",
            options: [
              {
                label: "default",
                value: "default",
              },
              {
                label: "primary",
                value: "primary",
              },
              {
                label: "link",
                value: "link",
              },
              {
                label: "ghost",
                value: "ghost",
              },
              {
                label: "dashed",
                value: "dashed",
              },
              {
                label: "text",
                value: "text",
              },
            ],
            settingType: "select",
            value: "primary",
          },
          {
            label: "是否显示取消按钮",
            key: ":showCancel",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: true,
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "点击取消的回调",
            key: "@cancel",
            settingType: "setting",
            value: "",
          },
          {
            label: "点击确认的回调",
            key: "@confirm",
            settingType: "setting",
            value: "",
          },
          {
            label: "显示隐藏的回调",
            key: "@openChange",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-progress": {
    style: style,
    component: ["title"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "未完成的分段的颜色",
            key: "trailColor",
            settingType: "input",
            value: "",
          },
          {
            label: "进度条的色彩",
            key: "strokeColor",
            settingType: "input",
            value: "",
          },
          {
            label: "百分比",
            key: "percent",
            settingType: "input",
            value: "",
          },
          {
            label: "类型",
            key: "type",
            radioType: "button",
            options: [
              {
                label: "line",
                value: "line",
              },
              {
                label: "circle",
                value: "circle",
              },
              {
                label: "dashboard",
                value: "dashboard",
              },
            ],
            settingType: "radio",
            value: "line",
          },
          {
            label: "进度条总共步数",
            tip: "进度条总共步数,type为line生效",
            key: "steps",
            settingType: "input",
            value: "",
          },
          {
            label: "条线的宽度",
            tip: "圆形进度条线的宽度，单位是进度条画布宽度的百分比,type为circle｜dashboard生效",
            key: "strokeWidth",
            settingType: "input",
            value: "",
          },
          {
            label: "缺口角度",
            tip: "仪表盘进度条缺口角度，可取值 0 ~ 295,type为dashboard生效",
            key: "gapDegree",
            settingType: "input",
            value: "",
          },
          {
            label: "缺口位置",
            tip: "仪表盘进度条缺口位置,type为dashboard生效",
            key: "gapPosition",
            radioType: "button",
            options: [
              {
                label: "top",
                value: "top",
              },
              {
                label: "bottom",
                value: "bottom",
              },
              {
                label: "left",
                value: "left",
              },
              {
                label: "right",
                value: "right",
              },
            ],
            settingType: "radio",
            value: "bottom",
          },
        ],
      },
    },
  },
  "a-skeleton": {
    style: style,
    component: [],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "动画效果",
            key: ":active",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "头像占位图",
            key: ":avatar",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "标题占位图",
            key: ":title",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
        ],
      },
    },
  },
  "a-spin": {
    style: style,
    component: ["wrapperClassName"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "大小",
            key: "size",
            radioType: "button",
            options: [
              {
                label: "small",
                value: "small",
              },
              {
                label: "default",
                value: "default",
              },
              {
                label: "large",
                value: "large",
              },
            ],
            settingType: "radio",
            value: "default",
          },
          {
            label: "是否为加载中",
            key: ":spinning",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: true,
          },
          {
            label: "自定义描述",
            key: "tip",
            settingType: "input",
            value: "",
          },
        ],
      },
    },
  },
  "xl-tooltip": {
    style: style,
    component: ["__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "提示文字",
            key: "title",
            settingType: "input",
            value: "",
          },
          {
            label: "气泡位置",
            key: "placement",
            options: [
              {
                label: "top",
                value: "top",
              },
              {
                label: "left",
                value: "left",
              },
              {
                label: "right",
                value: "right",
              },
              {
                label: "bottom",
                value: "bottom",
              },
              {
                label: "topLeft",
                value: "topLeft",
              },
              {
                label: "topRight",
                value: "topRight",
              },
              {
                label: "bottomLeft",
                value: "bottomLeft",
              },
              {
                label: "bottomRight",
                value: "bottomRight",
              },
              {
                label: "leftTop",
                value: "leftTop",
              },
              {
                label: "leftBottom",
                value: "leftBottom",
              },
              {
                label: "rightTop",
                value: "rightTop",
              },
              {
                label: "rightBottom",
                value: "rightBottom",
              },
            ],
            settingType: "select",
            value: "top",
          },
          {
            label: "出发行为",
            key: "trigger",
            options: [
              {
                label: "hover",
                value: "hover",
              },
              {
                label: "focus",
                value: "focus",
              },
              {
                label: "click",
                value: "click",
              },
              {
                label: "contextmenu",
                value: "contextmenu",
              },
            ],
            settingType: "select",
            value: "hover",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "显示隐藏的回调",
            key: "@openChange",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-tag": {
    style: style,
    component: ["__text__"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "是否可关闭",
            key: ":closable",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "是否有边框",
            key: ":bordered",
            radioType: "button",
            options: [
              {
                label: "是",
                value: true,
              },
              {
                label: "否",
                value: false,
              },
            ],
            settingType: "radio",
            value: true,
          },

          {
            label: "颜色",
            key: "color",
            settingType: "input",
            value: "",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "关闭时的回调",
            key: "@close",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
};
