import {
  h,
  renderSlot,
  resolveComponent,
  watch,
  computed,
  getCurrentInstance,
} from "vue";
import createComponent from "../../utils/create";
import { deepClone, extUrl } from "../../utils/utils";
const { create } = createComponent("Overlay");
import { isString } from "@vue/shared";
import fcs from "./util";

export default create({
  props: ["content", "modelValue", "parentThis", "isEscapeFn"],
  setup(props, { slots, emit }) {
    const instance = getCurrentInstance();
    const { type, propsData, options } = props.content;
    const { customValue = "value", customLabel = "label" } = propsData || {};
    const isEscapeFn = props.isEscapeFn

    // select 监听options变化，同步更新视图
    const contentComputed = computed(() => {
      return deepClone(props.content?.options || "");
    });

    watch(
      () => contentComputed,
      (n, o) => {
        emit("updateOptions");
      },
      { deep: true }
    );

    const custom = resolveComponent(`el-${type}`);

    // !注意：select组件在渲染options时只接受function  [Non-function value encountered for default slot. Prefer function slots for b]
    // !注意：cascader组件渲染时无默认插槽
    let children = "";
    if (type == "select") {
      children = () => {
        let _options = renderSlot(slots, "default");

        if (type === "select" && options && options.length) {
          const Option = resolveComponent(`el-option`);
          _options = options.map((ele, index) => {
            const targetLabel = ele[customLabel];
            const extedLabel = extUrl(customLabel, ele);
            return h(Option, {
              key: index,
              label: extedLabel || targetLabel,
              value: ele[customValue],
            });
          });
        }

        return _options;
      };
    } else if (type == "checkbox-group") {
      children = () => {
        let _options = renderSlot(slots, "default");

        if (type === "checkbox-group" && options && options.length) {
          const Option = resolveComponent(`el-checkbox`);
          _options = options.map((ele, index) => {
            const targetLabel = ele[customLabel];
            const extedLabel = extUrl(customLabel, ele);
            return h(
              Option,
              {
                key: index,
                label: ele[customValue],
              },
              extedLabel || targetLabel
            );
          });
        }

        return _options;
      };
    } else if (type === "radio-group") {
      children = () => {
        let _options = renderSlot(slots, "default");

        if (type === "radio-group" && options && options.length) {
          const Option = resolveComponent(`el-radio`);
          _options = options.map((ele, index) => {
            const targetLabel = ele[customLabel];
            const extedLabel = extUrl(customLabel, ele);
            return h(
              Option,
              {
                key: index,
                label: ele[customValue],
              },
              extedLabel || targetLabel
            );
          });
        }

        return _options;
      };
    }

    return () => {
      if (!custom) return "";
      // 兼容代码生成器
      for (let key in propsData) {
        if (
          propsData[key] &&
          fcs.indexOf(key) !== -1 &&
          isString(propsData[key]) &&
          isEscapeFn
        ) {
          propsData[key] = new Function(propsData[key]).call({
            vue: props.parentThis ? props.parentThis.$parent : {},
          }); // 将当前vue实例挂载到函数的作用域上
        }
      }
      return h(
        custom,
        {
          ...propsData,
          modelValue: props.modelValue,
          "onUpdate:modelValue": (value) => emit("update:modelValue", value),
        },
        children
      );
    };
  },
});
