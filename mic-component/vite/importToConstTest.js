import importToConst from "../index";

test("importToConst", async () => {
  const sourceCode = `
import { computed, reactive, ref } from 'vue'
import * as Vuex from 'vuex'
import VueRouter from 'vue-router'
import { ElInput } from 'element-plus'
`;

  const targetCode = `
const { computed: computed, reactive: reactive, ref: ref } = Vue;
const Vuex = Vuex;
const VueRouter = VueRouter;
const { ElInput: ElInput } = ElementPlus;
`;
  const bundleOptions = {
    test: { code: sourceCode },
  };

  const outputOptions = {
    globals: {
      vue: "Vue",
      "element-plus": "ElementPlus",
      vuex: "Vuex",
      "vue-router": "VueRouter",
    },
  };

  await importToConst().generateBundle(outputOptions, bundleOptions);
  expect(bundleOptions.test.code).toBe(targetCode);
});
