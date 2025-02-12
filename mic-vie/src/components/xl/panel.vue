<template>
  <div
    :class="{
      'mic-panel': true,
      'mic-panel-disabled': !isDisabled,
    }"
  >
    <div class="mic-panel-header">
      <a-switch
        :class="{
          mt8: true,
          'mic-switch-hidden': isHideSwitch,
        }"
        v-bind="attrs"
        size="small"
        @change="switchChange"
      />
      <div class="panel-title" @click="showSlot">
        {{ title }}
      </div>
      <RightOutlined
        class="mic-panel-icon"
        v-if="!isShowBody"
        @click="showSlot"
      />
      <DownOutlined class="mic-panel-icon" v-else @click="showSlot" />
    </div>
    <div class="mic-panel-body" v-if="isShowBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useAttrs, ref, watch } from "vue";
export default {
  name: "micPanel",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const attrs = useAttrs();
    let isHideSwitch = ref(attrs.checked == undefined ? true : false);

    const isShowBody = ref(false);
    const isDisabled = ref(attrs.checked == undefined ? true : attrs.checked);

    const switchChange = (v) => {
      isDisabled.value = v;
      isShowBody.value = false;
    };

    const showSlot = () => {
      if (isDisabled.value == false) return;
      isShowBody.value = !isShowBody.value;
    };

    return {
      isHideSwitch,
      attrs,
      isDisabled,
      isShowBody,
      switchChange,
      showSlot,
    };
  },
};
</script>

<style lang="scss" scoped>
.mic-panel {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #141210;
  border-bottom-color: rgb(52 52 52 / 50%);
  color: #fff;
  &.mic-panel-disabled {
    color: #c3d3d9;
    opacity: 0.7;
  }
  .mic-panel-header {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    line-height: 30px;
    position: relative;
    .panel-title {
      margin-left: 5px;
      flex: 1;
    }
    .mic-panel-icon {
      position: absolute;
      right: 0;
      top: 10px;
    }
    .mic-switch-hidden {
      display: none;
    }
  }
}
</style>
