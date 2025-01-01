<template>
  <component v-if="component" :is="component"></component>
</template>

<script>
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";
import { getRemoteEntry } from "../../api/project";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGeneralStore } from "../../store/modules/project";

export default {
  setup(props) {
    const generalStore = useGeneralStore();
    const component = ref("");
    const route = useRoute();
    const router = useRouter();
    let projectId = generalStore.currentProjectId;
    const load = () => {
      // 第三种方案
      __federation_method_setRemote("lowCode", {
        url: async () => {
          // let res = await getRemoteEntry({ id: projectId });
          // console.log(res.model.url);
          // res.model.url
          // http://www.missxiaolin.com/lowcode/chr/1.0.0/assets/remoteEntry.js
          // "http://localhost:8092/assets/remoteEntry.js"
          // "http://www.missxiaolin.com/lowcode/chr/1.0.0/assets/remoteEntry.js"
          return Promise.resolve(
            "http://remote.missxiaolin.com/assets/remoteEntry.js"
          ).catch((e) => {
            console.log(e);
          });
        },
        format: "esm",
        from: "vite",
      });
    };

    generalStore.$subscribe((mutation, state) => {
      if (state.currentProjectId == projectId || !state.currentProjectId)
        return;
      projectId = state.currentProjectId;
      load();
    });

    const init = async () => {
      try {
        const moduleWraped = await __federation_method_getRemote(
          "lowCode",
          `${route.path}`
        );
        component.value = __federation_method_unwrapDefault(moduleWraped);
      } catch (error) {
        console.log(error);
        // TODO: 找不到模块跳转到404
        if (
          error.toString() &&
          error.toString().indexOf("Can not find remote module") > -1
        ) {
          router.push("/404");
          return;
        }
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

    watch(route, () => {
      init();
    });

    onMounted(() => {
      load();
      init();
    });

    return {
      component,
    };
  },
};
</script>
