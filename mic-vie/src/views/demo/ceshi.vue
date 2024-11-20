<template>
  <div></div>
</template>

<script>
export default {
  setup(props) {
    const data = toRefs({
      a: 1,
    });
    const ceshi = function () {
      console.log("ceshi");
    };

    return {
      ...data,
      ceshi,
    };
  },
};
</script>
