const { Button: c } = Antd;
const { resolveComponent: u, openBlock: _, createElementBlock: a, createTextVNode: r, createVNode: l, withCtx: d } = Vue;
const f = (o, t) => {
  const e = o.__vccOpts || o;
  for (const [n, s] of t)
    e[n] = s;
  return e;
}, i = {
  components: {
    Button: c
  },
  setup(o) {
  }
}, m = { class: "powderblue" };
function x(o, t, e, n, s, b) {
  const p = u("a-button");
  return _(), a("div", m, [
    t[1] || (t[1] = r(" ceshi ")),
    l(p, null, {
      default: d(() => t[0] || (t[0] = [
        r("sss")
      ])),
      _: 1
    })
  ]);
}
const k = /* @__PURE__ */ f(i, [["render", x]]);
export {
  k as default
};
