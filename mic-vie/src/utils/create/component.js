import { defineComponent } from "vue";
export function createComponent(name) {
  const componentName = "el" + name;
  const useGlobalConfig = () => {
    return {};
  };

  return {
    componentName,
    useGlobalConfig,
    create(_component) {
      _component.baseName = name;
      _component.name = componentName;
      _component.install = (vue) => {
        vue.component(_component.name, _component);
      };
      return defineComponent(_component);
    },
  };
}
