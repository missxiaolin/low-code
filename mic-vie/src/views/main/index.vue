<template>
  <component v-if="component" :is="component"></component>
</template>

<script>
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup(props) {
    const component = ref("");
    const route = useRoute();

    // 第三种方案
    __federation_method_setRemote("lowCode", {
      url: () => Promise.resolve("http://localhost:8092/assets/remoteEntry.js"),
      format: "esm",
      from: "vite",
    });

    const init = async () => {
      try {
        const moduleWraped = await __federation_method_getRemote(
          "lowCode",
          `.${route.path}`
        );
        component.value = __federation_method_unwrapDefault(moduleWraped);
      } catch (error) {
        // TODO: 找不到模块跳转到404
        console.log("error", error);
      }
      // for await (let value of dynamicComponents) {
      //   const moduleWraped = await __federation_method_getRemote(
      //     "lowCode",
      //     `./${value}`
      //   );
      //   res.push({
      //     name: `lowCode${value.toLowerCase()}`,
      //     component: __federation_method_unwrapDefault(moduleWraped),
      //   });
      // }
      // component.value = res[0].component;
    };

    init();

    return {
      component,
    };
  },
};
</script>
