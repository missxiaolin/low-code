<template>
  <div class="editor-container" :id="uuid" :style="style"></div>
</template>

<script>
import { loadScript } from "../../utils/loadScript";
import { uuid } from '../../utils/utils'
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100vh",
    },
    language: {
      type: String,
      default: "javascript",
    },
    options: {
      type: Object,
      default: () => {
        return {
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        };
      },
    },
  },
  data() {
    return {
      style: "",
      uuid: uuid(10),
    };
  },
  mounted() {
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/loader.js",
      "monaco-editor",
      async () => {
        let url = `${window.location.origin}/vie/edit.js`
        if (process.env.NODE_ENV === 'development') {
          url = '/edit.js'
        }
        loadScript(url, "monaco-editor-config", async () => {
          const fn = () => {
            if (!window.monaco) {
              setTimeout(() => {
                fn();
              }, 50);
              return;
            }
            this.editor = monaco.editor.create(document.getElementById(`${this.uuid}`), {
              ...this.options,
              value: this.value,
              language: this.language
            });
            this.style = `width: ${this.width};height: ${this.height};`;
          };
          setTimeout(() => {
            fn();
          }, 20);
        });
      }
    );
  },
  methods: {
    getEditorCode() {
      let code = this.editor.getValue()
      const excludeUnuseal = code.replace("export default ", "");
      return excludeUnuseal
    }
  }
};
</script>
