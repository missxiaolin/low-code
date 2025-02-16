<template>
  <vccEditor
    v-if="isShowVcc"
    :asyncComponents="[]"
    :initCodeEntity="codeInfoEntity"
    @updateCodeEntity="updateCodeEntity"
    @save="save"
    @preview="preview"
  />
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { pageRouteDetail, pageRouteSave } from "../../api/dpPage";
import vccEditor from "../../components/vccEditor/index.vue";
import { useRouter, useRoute } from "vue-router";
const initCodeStr =
  '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","id": "vcc-container","style": "width: 1920px; height: 1080px;background-color: #142A41;position: relative;","lc_id":"container","__children":[]}}]}}';

export default {
  name: "vcc-editor-d",
  components: {
    vccEditor,
  },
  setup() {
    let isShowVcc = ref(false);
    const router = useRouter();
    const route = useRoute();
    let formData = ref({});
    let codeInfoEntity = ref({
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
    });

    const init = async () => {
      let res = await pageRouteDetail({
        id: route.query.id,
        projectId: route.query.projectId,
      });
      if (!res.success) {
        return;
      }
      const detail = res.model;
      formData.value = res.model;
      delete formData.value.create_time;
      delete formData.value.update_time;
      codeInfoEntity.value.JSCode = detail.script_json;
      codeInfoEntity.value.css = detail.css;
      codeInfoEntity.value.codeStructure = JSON.parse(detail.tem_json);
      codeInfoEntity.value.customData = JSON.parse(detail.customData);
      codeInfoEntity.value.eventNode = JSON.parse(detail.eventNode);
      isShowVcc.value = true;
    };

    const updateCodeEntity = (v) => {
      formData.value[v.key] = v.data;
    };

    const save = async () => {
      const res = await pageRouteSave(formData.value);
      if (!res.success) {
        return;
      }
      router.push({
        path: "/dp/list",
      });
    };

    const preview = async () => {
      const res = await pageRouteSave(formData.value);
      if (!res.success) {
        return;
      }
      // router.push({
      //   path: "/dp/preview",
      //   query: {
      //     id: route.query.id,
      //     projectId: route.query.projectId,
      //   },
      // });
      window.open(
        "/dp/preview?id=" +
          route.query.id +
          "&projectId=" +
          route.query.projectId
      );
    };

    onMounted(() => {
      init();
    });

    return {
      codeInfoEntity,
      isShowVcc,
      updateCodeEntity,
      save,
      preview,
    };
  },
};
</script>
