const { Button: p } = Antd;
const { resolveComponent: u, openBlock: _, createElementBlock: a, createTextVNode: r, createVNode: l, withCtx: d } = Vue;
/*!
* xiaolin Thu Jan 16 2025 10:19:13 GMT+0800 (中国标准时间)
* (c) 2021 @Energy Monster All Right Reserved..
*/
const i = (o, t) => {
  const e = o.__vccOpts || o;
  for (const [n, s] of t)
    e[n] = s;
  return e;
}, m = {
  components: {
    Button: p
  },
  setup(o) {
  }
}, f = { class: "powderblue" };
function x(o, t, e, n, s, v) {
  const c = u("a-button");
  return _(), a("div", f, [
    t[1] || (t[1] = r(" ceshi ")),
    l(c, null, {
      default: d(() => t[0] || (t[0] = [
        r("sss")
      ])),
      _: 1
    })
  ]);
}
const b = /* @__PURE__ */ i(m, [["render", x]]);
export {
  b as default
};
