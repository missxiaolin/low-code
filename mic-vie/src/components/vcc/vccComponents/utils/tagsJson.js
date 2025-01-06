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
    component: ["__text__", "@click"],
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
  component: {
    style: style,
    component: ["__text__"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "组件",
            key: "is",
            settingType: "input",
            value: "",
          },
        ],
      },
    },
  },
  "a-button": {
    style: style,
    component: ["href", "target", "size", "__text__", "@click"],
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
  "mic-flex": {
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
    component: ["wrapperClass", "direction", "@change", "@click"],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "数据源",
            key: ":items",
            settingType: "dataSelect",
            value: [],
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
    component: [],
    customComponent: {
      base: {
        title: "基础",
        children: [
          {
            label: "数据源",
            key: ":items",
            settingType: "dataSelect",
            value: [],
          },
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
            key: ":bordered",
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
  "mic-image": {
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
  "mic-popconfirm": {
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
  "mic-tooltip": {
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
  "a-form": {
    style: style,
    component: [":disabled"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "数据对象",
            tip: "使用变量！",
            key: ":model",
            settingType: "input",
            value: "",
          },
          {
            label: "验证规则",
            tip: "使用变量！",
            key: ":rules",
            settingType: "input",
            value: "",
          },
          {
            label: "表单名称",
            tip: "表单名称，会作为表单字段 id 前缀使用",
            key: "name",
            settingType: "input",
            value: "",
          },
          {
            label: "必选标记隐藏",
            key: ":hideRequiredMark",
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
            label: "必选标记隐藏",
            key: "labelAlign",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: false,
              },
              {
                label: "隐藏",
                value: true,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "错误滚动",
            tip: "提交失败自动滚动到第一个错误字段",
            key: "scrollToFirstError",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: false,
              },
              {
                label: "隐藏",
                value: true,
              },
            ],
            settingType: "radio",
            value: false,
          },

          {
            label: "label是否换行",
            key: "labelAlign",
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
            label: "布局方式",
            key: "layout",
            radioType: "button",
            options: [
              {
                label: "horizontal",
                value: "horizontal",
              },
              {
                label: "vertical",
                value: "vertical",
              },
              {
                label: "inline",
                value: "inline",
              },
            ],
            settingType: "select",
            value: "horizontal",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "表单数据验证成功事件",
            key: "@finish",
            settingType: "setting",
            value: "",
          },
          {
            label: "表单数据验证失败事件",
            key: "@finishFailed",
            settingType: "setting",
            value: "",
          },
          {
            label: "数据验证成功后回调事件",
            key: "@submit",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-form-item": {
    style: style,
    component: [],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "标签的文本",
            key: "label",
            settingType: "input",
            value: "",
          },
          {
            label: "文本对齐方式",
            key: "labelAlign",
            options: [
              {
                label: "left",
                value: "left",
              },
              {
                label: "right",
                value: "right",
              },
            ],
            settingType: "select",
            value: "right",
          },
          {
            label: "是否必填",
            key: ":required",
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
            settingType: "select",
            value: false,
          },

          {
            label: "表单名称",
            tip: "表单名称，会作为表单字段 id 前缀使用",
            key: "name",
            settingType: "input",
            value: "",
          },

          {
            label: "是否显示冒号",
            key: ":colon",
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
  "a-auto-complete": {
    style: style,
    component: [
      "v-model:value",
      "placeholder",
      ":disabled",
      "@blur",
      "@change",
      "@focus",
    ],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "清除按钮",
            tip: "支持清除, 单选模式有效",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "下拉菜单",
            key: ":open",
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
      event: {
        title: "事件",
        children: [
          {
            label: "展开下拉菜单的回调",
            key: "@dropdownVisibleChange",
            settingType: "setting",
            value: "",
          },
          {
            label: "搜索补全项的时候调用",
            key: "@search",
            settingType: "setting",
            value: "",
          },
          {
            label: "被选中时调用",
            key: "@select",
            settingType: "setting",
            value: "",
          },
          {
            label: "清除内容时回调",
            key: "@clear",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-cascader": {
    style: style,
    component: [
      "v-model:value",
      "placeholder",
      ":disabled",
      "@blur",
      "@change",
      "@focus",
    ],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "数据源",
            tip: "绑定变量",
            key: ":options",
            settingType: "dataSelect",
            value: "",
          },

          {
            label: "清除按钮",
            tip: "支持清除, 单选模式有效",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "支持多选节点",
            key: ":multiple",
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
            label: "展开方式",
            key: ":expandTrigger",
            radioType: "button",
            options: [
              {
                label: "click",
                value: "click",
              },
              {
                label: "hover",
                value: "hover",
              },
            ],
            settingType: "radio",
            value: "click",
          },
          {
            label: "max展示",
            tip: "最多显示多少个 tag，响应式模式会对性能产生损耗",
            key: ":maxTagCount",
            settingType: "input",
            value: "",
          },
          {
            label: "大小",
            key: "size",
            options: [
              {
                label: "large",
                value: "large",
              },
              {
                label: "default",
                value: "default",
              },
              {
                label: "small",
                value: "small",
              },
            ],
            settingType: "select",
            value: "default",
          },
        ],
      },
    },
    event: {
      title: "事件",
      children: [],
    },
  },
  "a-checkbox-group": {
    style: style,
    component: ["v-model:value", "disabled", "@change"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "name 属性",
            tip: 'CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性',
            key: "name",
            settingType: "input",
            value: "",
          },
          {
            label: "数据源",
            tip: "绑定变量",
            key: ":options",
            settingType: "dataSelect",
            value: "",
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
      event: {
        title: "事件",
        children: [],
      },
    },
  },
  "mic-date-picker": {
    style: style,
    component: [
      "v-model:value",
      "placeholder",
      ":disabled",
      "@change",
      "@blur",
      "@focus",
    ],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "日历class",
            key: "popupClassName",
            settingType: "input",
            value: "",
          },
          {
            label: "清除按钮",
            tip: "支持清除, 单选模式有效",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "日期格式",
            key: "format",
            options: [
              {
                label: "年-月-日",
                value: "YYYY-MM-DD",
              },
              {
                label: "年-月-日 时-分-秒",
                value: "YYYY-MM-DD HH:mm:ss",
              },
            ],
            settingType: "select",
            value: "",
          },
          {
            label: "日期面板的状态",
            key: "mode",
            options: [
              {
                label: "time",
                value: "time",
              },
              {
                label: "date",
                value: "date",
              },
              {
                label: "month",
                value: "month",
              },
              {
                label: "year",
                value: "year",
              },
              {
                label: "decade",
                value: "decade",
              },
            ],
            settingType: "select",
            value: "",
          },
          {
            label: "选择器类型",
            key: "picker",
            options: [
              {
                label: "date",
                value: "date",
              },
              {
                label: "week",
                value: "week",
              },
              {
                label: "month",
                value: "month",
              },
              {
                label: "quarter",
                value: "quarter",
              },
              {
                label: "year",
                value: "year",
              },
            ],
            settingType: "select",
            value: "date",
          },
          {
            label: "弹出的位置",
            key: "placement",
            options: [
              {
                label: "bottomLeft",
                value: "bottomLeft",
              },
              {
                label: "bottomRight",
                value: "bottomRight",
              },
              {
                label: "topLeft",
                value: "topLeft",
              },
              {
                label: "topRight",
                value: "topRight",
              },
            ],
            settingType: "select",
            value: "bottomLeft",
          },
          {
            label: "大小",
            key: "size",
            options: [
              {
                label: "large",
                value: "large",
              },
              {
                label: "middle",
                value: "middle",
              },
              {
                label: "small",
                value: "small",
              },
            ],
            settingType: "radio",
            value: "",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "确定按钮的回调",
            key: "@ok",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-input": {
    style: style,
    component: ["v-model:value", ":disabled", "@change"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "清除按钮",
            tip: "支持清除, 单选模式有效",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
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
            label: "最大长度",
            key: ":maxlength",
            settingType: "input",
            value: "",
          },
          {
            label: "控件大小",
            key: "size",
            settingType: "input",
            value: "",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "回车回调",
            key: "@pressEnter",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-input-number": {
    style: style,
    component: ["v-model:value", ":disabled", "@change"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "增减按钮",
            key: ":controls",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: true,
          },
          {
            label: "小数点",
            key: "decimalSeparator",
            settingType: "input",
            value: "",
          },
        ],
      },
      event: {
        title: "事件",
        children: [],
      },
    },
  },
  "a-radio-group": {
    style: style,
    component: ["v-model:value", ":disabled", "@change"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "数据源",
            tip: "绑定变量",
            key: ":options",
            settingType: "dataSelect",
            value: "",
          },
          {
            label: "name属性",
            tip: 'RadioGroup 下所有 input[type="radio"] 的 name 属性',
            key: "name",
            settingType: "input",
            value: "",
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "类型",
            key: "optionType",
            radioType: "button",
            options: [
              {
                label: "default",
                value: "default",
              },
              {
                label: "button",
                value: "button",
              },
            ],
            settingType: "radio",
            value: "default",
          },
          {
            label: "大小",
            key: "size",
            radioType: "button",
            options: [
              {
                label: "large",
                value: "large",
              },
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
        ],
      },
      event: {
        title: "事件",
        children: [],
      },
    },
  },

  "a-rate": {
    style: style,
    component: [
      "v-model:value",
      ":disabled",
      "@blur",
      "@change",
      "@focus",
      "@keydown",
    ],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "自定义字符",
            key: "character",
            settingType: "input",
            value: "",
          },
          {
            label: "总数",
            tip: "star 总数",
            key: ":count",
            settingType: "input",
            value: "",
          },
          {
            label: "提示信息",
            tip: "自定义每项的提示信息 string[]",
            key: ":tooltips",
            settingType: "input",
            value: "",
          },
          {
            label: "清除按钮",
            tip: "是否允许再次点击后清除",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "是否半选",
            tip: "是否允许半选",
            key: ":allowHalf",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
      event: {
        title: "事件",
        children: [
          {
            label: "鼠标经过回调",
            tip: "鼠标经过时数值变化的回调",
            key: "@hoverChange",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-select": {
    style: style,
    component: [
      "v-model:value",
      ":disabled",
      "placeholder",
      "@blur",
      "@focus",
      "@change",
      "@mouseenter",
      "@mouseleave",
    ],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "class",
            tip: "下拉菜单的 className 属性",
            key: "popupClassName",
            settingType: "input",
            value: "",
          },
          {
            label: "数据源",
            tip: "绑定变量",
            key: ":options",
            settingType: "dataSelect",
            value: "",
          },
          {
            label: "弹窗高度",
            tip: "设置弹窗滚动高度",
            key: ":listHeight",
            settingType: "input",
            value: "",
          },
          {
            label: "max tag",
            tip: "最多显示多少个 tag",
            key: ":maxTagCount",
            settingType: "input",
            value: "",
          },
          {
            label: "tag 宽度",
            tip: "最大显示的 tag 文本长度",
            key: ":maxTagTextLength",
            settingType: "input",
            value: "",
          },
          {
            label: "模式",
            key: "mode",
            radioType: "button",
            options: [
              {
                label: "multiple",
                value: "multiple",
              },
              {
                label: "tags",
                value: "tags",
              },
              {
                label: "combobox",
                value: "combobox",
              },
            ],
            settingType: "radio",
            value: "",
          },
          {
            label: "是否展开下拉菜单",
            key: ":open",
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
            label: "清除按钮",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "高亮第一个选项",
            tip: "是否默认高亮第一个选项。",
            key: "defaultActiveFirstOption",
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
          {
            label: "下拉菜单",
            tip: "是否默认展开下拉菜单",
            key: "defaultOpen",
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
            label: "选择框弹出的位置",
            key: "placement",
            tip: "鼠标移过时可浮起",
            options: [
              {
                label: "bottomLeft",
                value: "bottomLeft",
              },
              {
                label: "bottomRight",
                value: "bottomRight",
              },
              {
                label: "topLeft",
                value: "topLeft",
              },
              {
                label: "topRight",
                value: "topRight",
              },
            ],
            settingType: "select",
            value: "bottomLeft",
          },
          {
            label: "搜索文本",
            key: "searchValue",
            settingType: "input",
            value: "",
          },
          {
            label: "下拉小箭头",
            tip: "单选为 true,多选为 false",
            key: ":showArrow",
            radioType: "button",
            options: [
              {
                label: "单选",
                value: true,
              },
              {
                label: "多选",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "是否可搜索",
            tip: "单选为 false,多选为 true",
            key: ":showSearch",
            radioType: "button",
            options: [
              {
                label: "单选",
                value: true,
              },
              {
                label: "多选",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "虚拟滚动",
            tip: "设置 false 时关闭虚拟滚动",
            key: ":virtual",
            radioType: "button",
            options: [
              {
                label: "单选",
                value: true,
              },
              {
                label: "多选",
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
            label: "取消选中时调用",
            tip: "取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效",
            key: "@deselect",
            settingType: "setting",
            value: "",
          },
          {
            label: "展开下拉菜单的回调",
            key: "@dropdownVisibleChange",
            settingType: "setting",
            value: "",
          },
          {
            label: "键盘按下时回调",
            key: "@inputKeyDown",
            settingType: "setting",
            value: "",
          },
          {
            label: "下拉列表滚动回调",
            key: "@popupScroll",
            settingType: "setting",
            value: "",
          },
          {
            label: "文本框值变化时回调",
            key: "@search",
            settingType: "setting",
            value: "",
          },
          {
            label: "被选中时调用",
            tip: "被选中时调用，参数为选中项的 value (或 key) 值",
            key: "@select",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "a-switch": {
    style: style,
    component: [":disabled", "@blur", "@focus", "@change", "@click"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "数据绑定",
            key: "v-model:checked",
            settingType: "input",
            value: "",
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "开关大小",
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
        ],
      },
      event: {
        title: "事件",
        children: [],
      },
    },
  },
  "mic-time-picker": {
    style: style,
    component: ["v-model:value", ":disabled", "@blur", "@focus", "@change"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "小时选项间隔",
            key: ":hourStep",
            settingType: "input",
            value: "",
          },
          {
            label: "分钟选项间隔",
            key: ":minuteStep",
            settingType: "input",
            value: "",
          },
          {
            label: "分钟选项间隔",
            key: ":secondStep",
            settingType: "input",
            value: "",
          },

          {
            label: "弹出层类名",
            key: "popupClassName",
            settingType: "input",
            value: "",
          },
          {
            label: "选择框弹出的位置",
            key: "placement",
            tip: "鼠标移过时可浮起",
            options: [
              {
                label: "bottomLeft",
                value: "bottomLeft",
              },
              {
                label: "bottomRight",
                value: "bottomRight",
              },
              {
                label: "topLeft",
                value: "topLeft",
              },
              {
                label: "topRight",
                value: "topRight",
              },
            ],
            settingType: "select",
            value: "bottomLeft",
          },
          {
            label: "清除按钮",
            key: ":allowClear",
            radioType: "button",
            options: [
              {
                label: "显示",
                value: true,
              },
              {
                label: "隐藏",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },
          {
            label: "自动获取焦点",
            key: ":autofocus",
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
            label: "隐藏禁止选项",
            key: ":hideDisabledOptions",
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
            label: "日期格式",
            key: "format",
            options: [
              {
                label: "时",
                value: "HH",
              },
              {
                label: "分",
                value: "HH:mm",
              },
              {
                label: "时-分-秒",
                value: "HH:mm:ss",
              },
            ],
            settingType: "select",
            value: "",
          },
        ],
      },
      event: {
        title: "事件",
        children: [],
      },
    },
  },
  "a-upload": {
    style: style,
    component: [":disabled", "@change"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "数据绑定",
            key: "v-model:file-list",
            settingType: "input",
            value: "",
          },
          {
            label: "上传类型",
            key: "accept",
            settingType: "input",
            value: "",
          },
          {
            label: "上传地址",
            key: "action",
            settingType: "input",
            value: "",
          },
          {
            label: "上传数量",
            tip: "限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件",
            key: ":maxCount",
            settingType: "input",
            value: "",
          },
          {
            label: "请求方式",
            key: "method",
            settingType: "input",
            value: "",
          },
          {
            label: "参数名",
            tip: "发到后台的文件参数名",
            key: "name",
            settingType: "input",
            value: "",
          },

          {
            label: "是否支持多选文件",
            tip: "是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。",
            key: ":multiple",
            radioType: "button",
            options: [
              {
                label: "单选",
                value: true,
              },
              {
                label: "多选",
                value: false,
              },
            ],
            settingType: "radio",
            value: false,
          },

          {
            label: "日期格式",
            tip: "上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card",
            key: "listType",
            options: [
              {
                label: "text",
                value: "text",
              },
              {
                label: "picture",
                value: "picture",
              },
              {
                label: "picture-card",
                value: "picture-card",
              },
            ],
            settingType: "select",
            value: "text",
          },
        ],
      },
      event: {
        title: "事件",
        children: [],
      },
    },
  },
  "mic-modal": {
    style: ["class", "id", "width"],
    component: [":zIndex"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "对话框是否可见",
            key: "v-model:open",
            settingType: "dataSelect",
            value: [],
          },
          {
            label: "标题",
            key: "title",
            settingType: "input",
            value: "",
          },
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
            label: "外层容器的类名",
            key: "wrapClassName",
            settingType: "input",
            value: "",
          },
          {
            label: "是否垂直居中",
            key: ":centered",
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
            label: "右上角的关闭按钮",
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
            value: true,
          },
          {
            label: "是否展示遮罩",
            key: ":mask",
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
            label: "点击蒙层是否关闭",
            key: ":maskClosable",
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
            label: "关闭回调",
            key: "@cancel",
            settingType: "setting",
            value: "",
          },
          {
            label: "确认按钮回调",
            key: "@ok",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
  "mic-drawer": {
    style: ["class", "id", "width"],
    component: [":zIndex"],
    customComponent: {
      base: {
        title: "基础属性",
        children: [
          {
            label: "抽屉是否可见",
            key: "v-model:open",
            settingType: "dataSelect",
            value: [],
          },
          {
            label: "标题",
            key: "title",
            settingType: "input",
            value: "",
          },
          {
            label: "外层容器的类名",
            key: "rootClassName",
            settingType: "input",
            value: "",
          },
          {
            label: "是否展示遮罩",
            key: ":mask",
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
            label: "预设抽屉宽度",
            tip: "预设抽屉宽度（或高度），default 378px 和 large 736px",
            key: "size",
            radioType: "button",
            options: [
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
            label: "右上角的关闭按钮",
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
            value: true,
          },
          {
            label: "弹出的位置",
            key: "placement",
            options: [
              {
                label: "right",
                value: "right",
              },
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
            ],
            settingType: "select",
            value: "right",
          },
        ],
      },
      event: {
        title: "事件",
        children: [
          {
            label: "切换抽屉时动画结束后的回调",
            key: "@afterOpenChange",
            settingType: "setting",
            value: "",
          },
          {
            label: "关闭回调",
            key: "@close",
            settingType: "setting",
            value: "",
          },
        ],
      },
    },
  },
};
