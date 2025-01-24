<template>
  <vccEditor :asyncComponents="[]" :initCodeEntity="codeInfoEntity" />
</template>

<script>
import vccEditor from "../../components/vccEditor/index.vue";
const initCodeStr =
  '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","id": "vcc-container","style": "width: 1920px; height: 1080px;background-color: #142A41;position: relative;","lc_id":"container","__children":[]}}]}}';

export default {
  name: "vcc-editor-d",
  components: {
    vccEditor,
  },
  setup() {
    return {
      codeInfoEntity: {
        codeStructure: JSON.parse(initCodeStr),
        JSCode: `export default {
  setup() {

    return {};
  },
};
`,
        mode: 1,
        css: ``,
        eventNode: {},
        customData: [],
      },
    };
  },
};
</script>
