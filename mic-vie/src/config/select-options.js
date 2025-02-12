export const fontFamilys = [
  { value: "Microsoft Yahei", label: "微软雅黑" },
  { value: "SimSun", label: "宋体" },
  { value: "SimHei", label: "黑体" },
  { value: "LiSu", label: "隶书" },
  { value: "YouYuan", label: "幼圆" },
  { value: "tahoma", label: "tahoma" },
  { value: "arial", label: "arial" },
  { value: "sans-serif", label: "sans-serif" },
];

export const fontWeights = [
  { value: "lighter", label: "细" },
  { value: "normal", label: "正常" },
  { value: "bolder", label: "粗" },
  { value: "100", label: "100" },
  { value: "200", label: "200" },
  { value: "300", label: "300" },
  { value: "400", label: "400" },
  { value: "500", label: "500" },
  { value: "600", label: "600" },
  { value: "700", label: "700" },
  { value: "800", label: "800" },
  { value: "900", label: "900" },
];

export const axisTypes = [
  { value: "category", label: "类目型" },
  { value: "value", label: "数值型" },
  { value: "time", label: "时间型" },
];

export const selectSuggests = [
  { value: "auto", label: "自适应" },
  { value: "dataMin", label: "数据最小值" },
  { value: "dataMax", label: "数据最大值" },
];

export const titleLocations = [
  { value: "start", label: "开头" },
  { value: "center", label: "中间" },
  { value: "end", label: "末尾" },
];

export const lineStyles = [
  { value: "solid", label: "实线" },
  { value: "dashed", label: "虚线" },
];

export const valueFormats = [
  { value: "auto", label: "默认" },
  { value: "d", label: "11(整数)" },
  { value: ".1f", label: "11.1(浮点数)" },
  { value: ".2f", label: "11.11(浮点数)" },
  { value: ".0%", label: "11%" },
  { value: ".1%", label: "11.1%" },
  { value: ".2%", label: "11.11%" },
  { value: "th", label: "1,111(千分位)" },
  { value: ".1t", label: "1,111.1(千分位)" },
  { value: ".2t", label: "1,111.11(千分位)" },
];

export const timeFormats = [
  {
    value: "YYYY-MM-DD HH:mm:ss",
    label: "2012-01-01 02:03:00(年-月-日 时:分:秒)",
  },
  { value: "YYYY-MM-DD", label: "2012-01-01(年-月-日)" },
  { value: "YYYY-MM", label: "2012-01(年-月)" },
  { value: "MM-DD", label: "01-01(月-日)" },
  { value: "YYYY", label: "2012(年)" },
  { value: "MM", label: "01(月)" },
  {
    value: "YYYY/MM/DD HH:mm:ss",
    label: "2012/01/01 02:03:00(年/月/日 时:分:秒)",
  },
  { value: "YYYY/MM/DD", label: "2012/01/01(年/月/日)" },
  { value: "YYYY/MM", label: "2012/01(年/月)" },
  { value: "MM/DD", label: "01/01(月/日)" },
];

export const hAligns = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中对齐" },
  { value: "right", label: "右对齐" },
];

export const legendLocations = [
  { value: "top-left", label: "顶部居左" },
  { value: "top-center", label: "顶部居中" },
  { value: "top-right", label: "顶部居右" },
  { value: "middle-left", label: "左侧居中" },
  { value: "middle-right", label: "右侧居中" },
  { value: "bottom-left", label: "底部居左" },
  { value: "bottom-center", label: "底部居中" },
  { value: "bottom-right", label: "底部居右" },
];

export const orients = [
  { value: "horizontal", label: "水平" },
  { value: "vertical", label: "垂直" },
];

export const echartIcons = [
  { value: "auto", label: "自适应", icon: "shape-auto" },
  { value: "circle", label: "圆形", icon: "shape-circle" },
  { value: "rect", label: "矩形", icon: "shape-rect" },
  { value: "roundRect", label: "圆角矩形", icon: "shape-round-rect" },
  { value: "triangle", label: "三矩形", icon: "shape-triangle" },
  { value: "diamond", label: "菱形", icon: "shape-diamond" },
  { value: "arrow", label: "箭头", icon: "shape-arrow" },
  { value: "emptyCircle", label: "空心圆形", icon: "shape-circle" },
  { value: "emptyRect", label: "空心矩形", icon: "shape-rect" },
  { value: "emptyRoundRect", label: "空心圆角矩形", icon: "shape-round-rect" },
  { value: "emptyTriangle", label: "空心三角形", icon: "shape-triangle" },
  { value: "emptyDiamond", label: "空心菱形", icon: "shape-diamond" },
  { value: "emptyArrow", label: "空心箭头", icon: "shape-arrow" },
];

export const animationEasings = [
  "linear",
  "quadraticIn",
  "quadraticOut",
  "quadraticInOut",
  "cubicIn",
  "cubicOut",
  "cubicInOut",
  "quarticIn",
  "quarticOut",
  "quarticInOut",
  "quinticIn",
  "quinticOut",
  "quinticInOut",
  "sinusoidalIn",
  "sinusoidalOut",
  "sinusoidalInOut",
  "exponentialIn",
  "exponentialOut",
  "exponentialInOut",
  "circularIn",
  "circularOut",
  "circularInOut",
  "elasticIn",
  "elasticOut",
  "elasticInOut",
  "backIn",
  "backOut",
  "backInOut",
  "bounceIn",
  "bounceOut",
  "bounceInOut",
].map((m) => ({ value: m, label: m }));
