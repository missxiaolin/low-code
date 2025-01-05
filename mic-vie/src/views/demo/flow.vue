<template>
  <div>
    <div class="ceshi" id="ceshi">
      <a-modal
        v-model:open="ceshiOpen"
        :getContainer="getContainer"
        ref="ceshiRef"
      >
        <div>ceshi</div>
      </a-modal>
      <!-- <a-modal v-model:open="ceshiOpen" :getContainer="getContainer">
        <div>ceshi</div>
      </a-modal> -->
    </div>
    <a-button type="primary" @click="modelOpen = true">打开</a-button>
    <formulaModal
      v-model:open="modelOpen"
      :customData="customData"
      :title="'公式编辑'"
      :footer="null"
      width="50%"
    />
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
import { evaluate } from "../../utils/formula-main/index";
import formulaModal from "../../components/formula/formula-modal.vue";
const defaultContext = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

function evalFormual(expression, data = defaultContext) {
  return evaluate(expression, data, {
    evalMode: true,
  });
}
import { execEventFlow } from "../../utils/action";
export default {
  components: {
    flowNode,
    vueCode,
    formulaModal,
  },
  setup() {
    const ceshiRef = ref(null);
    const ceshiOpen = ref({
      a: 1,
    });
    const modelOpen = ref(false);
    console.log(evalFormual("IF(true, 2, 3)"));
    let ceshi = ref("ceshi");
    const customData = ref([]);
    const open = ref(false);
    const flowNodeRef = ref(null);
    // data
    const flowData = ref(data);

    const instance = getCurrentInstance();
    // console.log(instance.proxy.$execEventFlow);

    const save = () => {
      flowNodeRef.value.flowSave();
      console.log("保存", flowNodeRef.value.flowSave());
    };

    onMounted(() => {
      console.log(ceshiRef.value);
      console.log(ceshiRef.value.appContext);
      // ceshiRef.value.appContext;
      // console.log(instance.proxy);
      // instance.proxy.ceshiOpen = true;
      // ceshiRef.value.open = true;
      // execEventFlow(instance, data.children);
    });

    const getContainer = (e) => {
      return document.getElementById("ceshi");
    };

    return {
      ceshiRef,
      getContainer,
      ceshiOpen,
      open,
      save,
      flowNodeRef,
      flowData,
      ceshi,
      customData,
      modelOpen,
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
.ceshi {
  width: 1000px;
  height: 500px;
  background: #d3adff;
  position: relative;
  transform: translate(50px, 50px);
}
</style>
