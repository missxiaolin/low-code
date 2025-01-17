const { Button: p } = Antd;
const { resolveComponent: a, openBlock: l, createElementBlock: _, createTextVNode: r, toDisplayString: i, createVNode: u, withCtx: d } = Vue;
/*!
* xiaolin Fri Jan 17 2025 09:19:48 GMT+0800 (中国标准时间)
* (c) 2021 @Energy Monster All Right Reserved..
*/
const m = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, s] of o)
    e[n] = s;
  return e;
}, f = {
  props: ["title"],
  components: {
    Button: p
  },
  setup(t) {
  }
}, x = { class: "powderblue" };
function v(t, o, e, n, s, B) {
  const c = a("a-button");
  return l(), _("div", x, [
    r(i(e.title) + " ", 1),
    u(c, null, {
      default: d(() => o[0] || (o[0] = [
        r("sss")
      ])),
      _: 1
    })
  ]);
}
const $ = /* @__PURE__ */ m(f, [["render", v]]);
export {
  $ as default
};
