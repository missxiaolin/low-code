<template>
  <div>
    <!-- {{ ceshi }} -->
    <!-- <vueCode v-model:vueDialogVisible="open" /> -->
    <a-drawer
      v-model:open="open"
      :contentWrapperStyle="{ transform: 'translateX(0)' }"
      :mask="false"
      title="事件流配置"
      placement="right"
      width="100%"
    >
      <template #extra>
        <a-button type="primary" @click="save">保存</a-button>
      </template>
      <div class="node-viewer">
        <flowNode
          :customData="customData"
          :nodeData="flowData"
          ref="flowNodeRef"
        ></flowNode>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref, toRefs, reactive } from "vue";
import vueCode from "../../components/vcc/vueCodeEditorDialog.vue";
import flowNode from "../../components/flow-node/flowNode.vue";
import data from "./flow.json";
import { execEventFlow } from "../../utils/action";
export default {
  components: {
    flowNode,
    vueCode,
  },
  setup() {
    let ceshi = ref("ceshi");
    const customData = ref([
      {
        key: "ceshi",
        keyDesc: "ceshi",
      },
    ]);
    const open = ref(true);
    const flowNodeRef = ref(null);
    // data
    const flowData = ref({});

    const instance = getCurrentInstance();
    // console.log(instance.proxy.$execEventFlow);

    const save = () => {
      flowNodeRef.value.flowSave();
      console.log("保存", flowNodeRef.value.flowSave());
    };

    onMounted(() => {
      // console.log((instance.proxy.ceshi.ceshi = 22));
      // execEventFlow(instance, data.children);

      setTimeout(() => {
        // $data.value.ceshi = "ceshi2";
        // console.log($data);
        // instance.proxy.ceshi.ceshi = 2;
        // console.log(instance.proxy);
        // let a = instance.proxy;
        // let path = "ceshi.ceshi";
        // eval(`a.${path} = 2`);
        // console.log(a); // 输出: { ceshi: { ceshi: "2" } }
        // console.log(instance.proxy);
      }, 3000);
      // instance.proxy
    });

    return {
      open,
      save,
      flowNodeRef,
      flowData,
      ceshi,
      customData,
    };
  },
};
</script>

<style lang="scss" scoped>
.node-viewer {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      circle,
      rgba(185, 185, 185, 0.5) 1px,
      transparent 1px
    ),
    radial-gradient(circle, rgba(0, 0, 0, 0.5) 1px, transparent 1px);
  background-size: 20px 20px;
  background-repeat: repeat;
  position: relative;
  .flow-desc {
    position: absolute;
    top: 50px;
    left: 30px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 12px;
    background: #f8f0ff;
    border: solid 2px #d3adff;
    padding: 20px 24px;
    border-radius: 10px;
  }
}
</style>
