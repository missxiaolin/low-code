import Split from "split.js";

export function splitInit() {
  let sizes = localStorage.getItem("split-sizes");
  let sizeCodes = localStorage.getItem("split-sizes-code");

  if (sizes) {
    sizes = JSON.parse(sizes);
  } else {
    sizes = [50, 50]; // default sizes
  }

  if (sizeCodes) {
    sizeCodes = JSON.parse(sizeCodes);
  } else {
    sizeCodes = [70, 30]; // default sizes
  }

  Split([".base-component-container", ".vcc-main-container"], {
    sizes: sizes,
    gutterSize: 4,
    minSize: [400, 375],
    gutter: (index, direction) => {
      const gutter = document.createElement("div");
      gutter.className = `gutter gutter-${direction}`;
      gutter.addEventListener("mousemove", () => {
        gutter.style.cursor = "col-resize";
      });
      return gutter;
    },
    onDragEnd: function (sizes) {
      localStorage.setItem("split-sizes", JSON.stringify(sizes));
    },
  });
}
