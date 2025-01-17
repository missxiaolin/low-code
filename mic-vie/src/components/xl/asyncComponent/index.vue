<template>
  <component :is="dynamicComponent" v-bind="attrs"></component>
</template>

<script>
import { ref, nextTick, onMounted, markRaw, useAttrs } from "vue";
export default {
  name: "micAsyncComponent",
  props: {
    componentUrl: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const attrs = useAttrs();
    const dynamicComponent = ref(null);

    const loadComponent = async () => {
      const module = await import(/* @vite-ignore */ props.componentUrl);
      dynamicComponent.value = markRaw(module.default);
    };

    onMounted(() => {
      nextTick(() => {
        loadComponent();
      });
    });

    return {
      dynamicComponent,
      attrs,
    };
  },
};
</script>
