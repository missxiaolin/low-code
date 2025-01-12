const { openBlock: n, createElementBlock: r } = Vue;
const p = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [c, s] of e)
    o[c] = s;
  return o;
}, _ = {
  components: {},
  setup(t) {
  }
}, a = { class: "powderblue" };
function u(t, e, o, c, s, d) {
  return n(), r("div", a, "ceshi");
}
const i = /* @__PURE__ */ p(_, [["render", u]]);
export {
  i as default
};
