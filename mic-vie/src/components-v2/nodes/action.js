import { COLLAPSE_ICON, EXPAND_ICON } from "./icons";

export const actionNode = {
  options: {
    style: {
      fill: "#F9F0FF",
      stroke: "#B37FEB",
      radius: 8,
      lineWidth: 1,
    },
    stateStyles: {
      hover: {},
      selected: {},
    },
    labelCfg: {
      style: {
        fill: "#000000",
        fontSize: 14,
        fontWeight: 400,
        fillOpacity: "0.7",
      },
    },
    size: [120, 40],
  },
  drawShape(cfg, group) {
    const styles = this.getShapeStyle(cfg);
    const [w, h] = this.getSize(cfg);

    const keyShape = group.addShape("rect", {
      attrs: {
        ...styles,
        x: -60,
        y: -20,
        width: w,
        height: h,
      },
    });

    group.addShape("marker", {
      attrs: {
        x: w / 2 - 20,
        y: 0,
        r: 6,
        stroke: "#ff4d4f",
        cursor: "pointer",
        symbol: COLLAPSE_ICON,
      },
      name: "remove-item",
    });

    if (cfg.menus?.length) {
      group.addShape("marker", {
        attrs: {
          x: 0,
          y: h / 2 + 27,
          r: 6,
          stroke: "#73d13d",
          cursor: "pointer",
          symbol: EXPAND_ICON,
        },
        name: "add-item",
      });
    }
    return keyShape;
  },
  update(cfg, node) {
    const styles = this.getShapeStyle(cfg);
    const [w, h] = this.getSize(cfg);
    const group = node.getContainer();

    const child = group.find((item) => {
      return item.get("name") === "add-item";
    });

    const text = group.find((item) => {
      return item.get("name") === "text-shape";
    });

    if (text) {
      text.attr({ text: cfg.label });
    }

    if (!child && cfg.menus?.length) {
      group.addShape("marker", {
        attrs: {
          x: 0,
          y: h / 2 + 7,
          r: 6,
          stroke: "#73d13d",
          cursor: "pointer",
          symbol: EXPAND_ICON,
        },
        name: "add-item",
      });
    }
  },
};
