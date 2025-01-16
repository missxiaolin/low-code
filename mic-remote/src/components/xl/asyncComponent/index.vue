<template>
  <component :is="dynamicComponent"></component>
</template>

<script>
import { ref, nextTick, onMounted, markRaw } from "vue";
export default {
  name: "micAsyncComponent",
  props: {
    componentUrl: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const dynamicComponent = ref(null);

    const loadComponent = async () => {
      const module = await import(props.componentUrl);
      console.log(module.default.components);
      dynamicComponent.value = markRaw(module.default);
    };

    onMounted(() => {
      nextTick(() => {
        loadComponent();
      });
    });

    return {
      dynamicComponent,
    };
  },
};
</script>
