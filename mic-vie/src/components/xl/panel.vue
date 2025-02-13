<template>
  <div
    :class="{
      'mic-panel': true,
      'mic-panel-disabled': !isDisabled,
      'mic-panel-body-show': isShowBody,
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
      <div class="panel-title" @click="showSlot" v-if="!slots.header">
        {{ title }}
      </div>
      <div class="panel-title" v-else @click="showSlot">
        <slot name="header"></slot>
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
  setup(props, { emit, slots }) {
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
      slots,
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
      padding-left: 10px;
      font-size: 14px;
    }
    .mic-panel-icon {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .mic-switch-hidden {
      display: none;
    }
  }
  .mic-panel-body {
    padding-right: 10px;
    padding-top: 10px;
    background-color: hsl(215deg 15% 8%);
  }
}
</style>

<style lang="scss">
.mic-panel-body {
  .mic-panel {
    .mic-panel-icon {
      right: 0px !important;
    }
  }
}
</style>
