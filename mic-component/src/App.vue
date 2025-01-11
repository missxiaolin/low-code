<template>
  <div>
    <Button />
  </div>
</template>

<script>
import { ref } from "vue";
import Button from "./components/Button.vue";
export default {
  components: {
    Button,
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc,
    };
  },
};
</script>
