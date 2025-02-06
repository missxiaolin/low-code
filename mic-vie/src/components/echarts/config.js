export const barConfig = {
  global: {
    fontFamily: "Microsoft Yahei",
    margin: {
      top: 40,
      bottom: 50,
      left: 50,
      right: 10,
    },
    innerPadding: 20,
    outerPadding: 30,
    barWidth: "auto",
    background: {
      show: true,
      color: "rgba(255, 255, 255, 0.1)",
    },
  },
  label: {
    show: false,
    position: "top",
    textStyle: {
      fontSize: 12,
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: "normal",
    },
    offsetX: 0,
    offsetY: 0,
  },
  xAxis: {
    show: true,
    type: "category",
    boundaryGap: true,
    title: {
      show: true,
      name: "X轴",
      location: "center",
      display: {
        rotate: 0,
        offset: 20,
      },
      textStyle: {
        fontSize: 12,
        color: "#90a0ae",
        fontWeight: "normal",
      },
    },
    axisLine: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisTick: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisLabel: {
      show: true,
      valueFormat: "d",
      timeFormat: "MM/DD",
      interval: "auto",
      display: {
        rotate: 0,
        margin: 10,
      },
      align: "center",
      textStyle: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.6)",
        fontWeight: "normal",
      },
    },
    grid: {
      show: true,
      line: {
        type: "dashed",
        width: 1,
        color: "rgba(233, 228, 228, 0.1)",
        dashedLength: 4,
        dashedSpace: 4,
      },
    },
  },
  yAxis: {
    show: true,
    extent: {
      min: "auto",
      max: "auto",
    },
    splitNumber: 0,
    title: {
      show: false,
      name: "Y轴",
      location: "center",
      display: {
        rotate: 90,
        offset: 20,
      },
      textStyle: {
        fontSize: 12,
        color: "#90a0ae",
        fontWeight: "normal",
      },
    },
    axisLine: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisTick: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisLabel: {
      show: true,
      valueFormat: "auto",
      boundaryGap: 0,
      display: {
        rotate: 0,
        margin: 8,
      },
      align: "right",
      textStyle: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.6)",
        fontWeight: "normal",
      },
    },
    grid: {
      show: true,
      line: {
        type: "dashed",
        width: 1,
        color: "rgba(233, 228, 228, 0.1)",
        dashedLength: 4,
        dashedSpace: 4,
      },
    },
  },
  tooltip: {
    show: true,
    textStyle: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "normal",
    },
    background: {
      padding: {
        h: 5,
        v: 5,
      },
      color: "rgba(0, 0, 0, 0.65)",
    },
    pointer: {
      show: true,
      line: {
        type: "dashed",
        width: 1,
        color: "#f5dc69",
        dashedLength: 4,
        dashedSpace: 4,
      },
    },
  },
  legend: {
    show: true,
    position: "top-center",
    orient: "horizontal",
    textStyle: {
      fontSize: 12,
      color: "#90a0ae",
      fontWeight: "normal",
    },
    symbol: {
      show: true,
      icon: "auto",
      width: 25,
      height: 14,
      gap: 10,
    },
    page: {
      enabled: false,
      size: {
        width: 100,
        height: 100,
      },
      button: {
        size: 15,
        color: "#000",
        inactiveColor: "#000",
      },
      pageNumColor: "#90a0ae",
    },
  },
  series: [
    {
      type: "bar",
      id: "系列1_d4Xfnk-GdL",
      name: "系列1",
      color: {
        type: "solid",
        value: "#00baff",
        from: "#fff",
        to: "#000",
      },
    },
  ],
  animation: {
    enabled: true,
    duration: 1000,
    easing: "cubicOut",
    delay: 0,
  },
  dvField: {
    x: "x",
    y: "y",
  },
};

export const wordCloudConfig = {
  global: {
    fontFamily: "Microsoft Yahei",
    max: 35,
    min: 14,
    rotationRange: {
      min: -90,
      max: 90,
    },
    rotate: 45,
    drawType: "preset",
    shape: "circle",
    image: "/static/images/echarts-logo.png",
  },
  series: [
    {
      type: "wordCloud",
      id: "0_rKQw6lotfKH",
      name: "0",
      color: "#0a73ff",
    },
    {
      type: "wordCloud",
      id: "1_DiXifxaQ8qU",
      name: "1",
      color: "#3dabff",
    },
    {
      type: "wordCloud",
      id: "2_soPxdtvQpdE",
      name: "2",
      color: "#79daff",
    },
  ],
  tooltip: {
    show: false,
    textStyle: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "normal",
    },
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  animation: {
    enabled: true,
  },
  dvField: {
    name: "name",
    type: "type",
    value: "value",
  },
};

export const lineConfig = {
  global: {
    fontFamily: "Microsoft Yahei",
    margin: {
      top: 40,
      bottom: 50,
      left: 60,
      right: 30,
    },
    connectNulls: false,
  },
  xAxis: {
    show: true,
    type: "category",
    extent: {
      min: "auto",
      max: "auto",
    },
    boundaryGap: true,
    title: {
      show: true,
      name: "X轴",
      location: "center",
      display: {
        rotate: 0,
        offset: 20,
      },
      textStyle: {
        fontSize: 12,
        color: "#90a0ae",
        fontWeight: "normal",
      },
    },
    axisLine: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisTick: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisLabel: {
      show: true,
      valueFormat: "d",
      timeFormat: "MM/DD",
      interval: "auto",
      display: {
        rotate: 0,
        margin: 10,
      },
      align: "center",
      textStyle: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.6)",
        fontWeight: "normal",
      },
    },
    grid: {
      show: true,
      line: {
        type: "dashed",
        width: 1,
        color: "rgba(233, 228, 228, 0.1)",
        dashedLength: 4,
        dashedSpace: 4,
      },
    },
  },
  yAxis: {
    show: true,
    type: "value",
    extent: {
      min: "auto",
      max: "auto",
    },
    title: {
      show: false,
      name: "Y轴",
      location: "center",
      display: {
        rotate: 90,
        offset: 20,
      },
      textStyle: {
        fontSize: 12,
        color: "#90a0ae",
        fontWeight: "normal",
      },
    },
    axisLine: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisTick: {
      show: true,
      type: "solid",
      width: 1,
      color: "rgba(255, 255, 255, 0.5)",
    },
    axisLabel: {
      show: true,
      valueFormat: "auto",
      timeFormat: "MM/DD",
      boundaryGap: 0,
      display: {
        rotate: 0,
        margin: 8,
      },
      align: "right",
      textStyle: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.6)",
        fontWeight: "normal",
      },
    },
    grid: {
      show: true,
      line: {
        type: "dashed",
        width: 1,
        color: "rgba(233, 228, 228, 0.1)",
        dashedLength: 4,
        dashedSpace: 4,
      },
    },
  },
  tooltip: {
    show: true,
    triggerOn: "mousemove",
    textStyle: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "normal",
    },
    background: {
      padding: {
        h: 5,
        v: 5,
      },
      color: "rgba(0, 0, 0, 0.65)",
      borderColor: "rgba(0, 0, 0, 0.25)",
      borderWidth: 1,
    },
    pointer: {
      show: true,
      line: {
        type: "dashed",
        width: 1,
        color: "#f5dc69",
        dashedLength: 4,
        dashedSpace: 4,
      },
    },
  },
  legend: {
    show: true,
    position: "top-center",
    orient: "horizontal",
    textStyle: {
      fontSize: 12,
      color: "#90a0ae",
      fontWeight: "normal",
    },
    symbol: {
      show: true,
      icon: "auto",
      width: 25,
      height: 14,
      gap: 10,
    },
    page: {
      enabled: false,
      size: {
        width: 100,
        height: 100,
      },
      button: {
        size: 15,
        color: "#000",
        inactiveColor: "#000",
      },
      pageNumColor: "#90a0ae",
    },
  },
  series: [
    {
      type: "line",
      id: "P8qFfsDCzP",
      name: "",
      line: {
        color: "#34FFF5",
        style: "solid",
        width: 1,
        opacity: 1,
        smooth: 0.5,
      },
      point: {
        icon: "roundRect",
        color: "#34FFF5",
        borderColor: "rgba(0, 0, 0, 0.44)",
        borderWidth: 1,
        borderType: "solid",
        opacity: 1,
      },
      label: {
        show: false,
        field: "y",
        valueFormat: "auto",
        describe: {
          prefix: "",
          suffix: "",
        },
        offset: {
          x: 0,
          y: 0,
        },
        rotate: 0,
        textStyle: {
          fontSize: 12,
          color: "#ddd",
          fontWeight: "normal",
        },
        stroke: {
          color: "#000",
          width: 0,
        },
      },
    },
    {
      type: "line",
      id: "53vQXz47dQ",
      name: "",
      line: {
        color: "#30D9F1",
        style: "solid",
        width: 1,
        opacity: 1,
        smooth: 0.5,
      },
      point: {
        icon: "roundRect",
        color: "#30D9F1",
        borderColor: "rgba(0, 0, 0, 0.44)",
        borderWidth: 1,
        borderType: "solid",
        opacity: 1,
      },
      label: {
        show: false,
        field: "y",
        valueFormat: "auto",
        describe: {
          prefix: "",
          suffix: "",
        },
        offset: {
          x: 0,
          y: 0,
        },
        rotate: 0,
        textStyle: {
          fontSize: 12,
          color: "#ddd",
          fontWeight: "normal",
        },
        stroke: {
          color: "#000",
          width: 0,
        },
      },
    },
    {
      type: "line",
      id: "_OlruTuNYx",
      name: "",
      line: {
        color: "#2CB4ED",
        style: "solid",
        width: 1,
        opacity: 1,
        smooth: 0.5,
      },
      point: {
        icon: "roundRect",
        color: "#2CB4ED",
        borderColor: "rgba(0, 0, 0, 0.44)",
        borderWidth: 1,
        borderType: "solid",
        opacity: 1,
      },
      label: {
        show: false,
        field: "y",
        valueFormat: "auto",
        describe: {
          prefix: "",
          suffix: "",
        },
        offset: {
          x: 0,
          y: 0,
        },
        rotate: 0,
        textStyle: {
          fontSize: 12,
          color: "#ddd",
          fontWeight: "normal",
        },
        stroke: {
          color: "#000",
          width: 0,
        },
      },
    },
    {
      type: "line",
      id: "AIUuYH3-65",
      name: "",
      line: {
        color: "#288EE8",
        style: "solid",
        width: 1,
        opacity: 1,
        smooth: 0.5,
      },
      point: {
        icon: "roundRect",
        color: "#288EE8",
        borderColor: "rgba(0, 0, 0, 0.44)",
        borderWidth: 1,
        borderType: "solid",
        opacity: 1,
      },
      label: {
        show: false,
        field: "y",
        valueFormat: "auto",
        describe: {
          prefix: "",
          suffix: "",
        },
        offset: {
          x: 0,
          y: 0,
        },
        rotate: 0,
        textStyle: {
          fontSize: 12,
          color: "#ddd",
          fontWeight: "normal",
        },
        stroke: {
          color: "#000",
          width: 0,
        },
      },
    },
    {
      type: "line",
      id: "E1Nm_wv3Tv",
      name: "",
      line: {
        color: "#2469E4",
        style: "solid",
        width: 1,
        opacity: 1,
        smooth: 0.5,
      },
      point: {
        icon: "roundRect",
        color: "#2469E4",
        borderColor: "rgba(0, 0, 0, 0.44)",
        borderWidth: 1,
        borderType: "solid",
        opacity: 1,
      },
      label: {
        show: false,
        field: "y",
        valueFormat: "auto",
        describe: {
          prefix: "",
          suffix: "",
        },
        offset: {
          x: 0,
          y: 0,
        },
        rotate: 0,
        textStyle: {
          fontSize: 12,
          color: "#ddd",
          fontWeight: "normal",
        },
        stroke: {
          color: "#000",
          width: 0,
        },
      },
    },
  ],
  animation: {
    enabled: true,
    duration: 1000,
    easing: "cubicOut",
    delay: 0,
  },
  dvField: {
    s: "s",
    x: "x",
    y: "y",
  },
};
