(function () {
  "use strict";
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.appendChild(
        document.createTextNode(".powderblue[data-v-470a576f]{color:red}")
      ),
        document.head.appendChild(e);
    }
  } catch (d) {
    console.error("vite-plugin-css-injected-by-js", d);
  }
})();
const { Button: p } = Antd;
const {
  resolveComponent: c,
  openBlock: a,
  createElementBlock: u,
  createTextVNode: r,
  createVNode: d,
  withCtx: l,
} = Vue;
/*!
 * xiaolin Wed Jan 15 2025 20:27:23 GMT+0800 (中国标准时间)
 * (c) 2021 @Energy Monster All Right Reserved..
 */
const f = (o, t) => {
    const e = o.__vccOpts || o;
    for (const [n, s] of t) e[n] = s;
    return e;
  },
  i = {
    components: {
      Button: p,
    },
    setup(o) {},
  },
  m = { class: "powderblue" };
function v(o, t, e, n, s, x) {
  const _ = c("a-button");
  return (
    a(),
    u("div", m, [
      t[1] || (t[1] = r(" ceshi ")),
      d(_, null, {
        default: l(() => t[0] || (t[0] = [r("sssa")])),
        _: 1,
      }),
    ])
  );
}
const k = /* @__PURE__ */ f(i, [
  ["render", v],
  ["__scopeId", "data-v-470a576f"],
]);
export { k as default };
