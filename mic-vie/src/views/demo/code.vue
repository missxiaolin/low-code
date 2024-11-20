<template>
  <div id="my-component"></div>
</template>

<script>
import { nextTick, onMounted, ref, getCurrentInstance } from "vue";
import * as Vue from "vue";
import Antd from "ant-design-vue";
import { loadPlugins } from "../../plugins/index";
// 假设有一个 Vue 文件的内容
const config = {
  files: {
    "/main.vue": `
        <template>
            <div class="content">
                <a-button type="primary">Primary Button</a-button>
                <EyeOutlined />
                {{ message }}
            </div>
        </template>

        <script>
            import { ref, getCurrentInstance } from "vue";
            export default {
                setup() {
                    const message = ref("Hello, Vue 3!");
                    console.log(getCurrentInstance())
                    return {
                        message,
                    }
                },
            };
        <\/script>
        
        <style>
            .content {
                color: red;
            }
        </style>
        
        `,
  },
};

export default {
  setup() {
    onMounted(() => {
      nextTick(() => {
        const options = {
          moduleCache: {
            vue: Vue,
          },
          getFile: (url) => {
            return config.files[url];
          },
          addStyle(textContent) {
            const style = Object.assign(document.createElement("style"), {
              textContent,
            });
            const ref = document.head.getElementsByTagName("style")[0] || null;
            document.head.insertBefore(style, ref);
          },
          handleModule: async function (type, getContentData, path, options) {
            switch (type) {
              case ".svg":
                return getContentData(false);
            }
          },
          log(type, ...args) {
            console[type](...args);
          },
        };
        const app = Vue.createApp(
          Vue.defineAsyncComponent(() =>
            window["vue3-sfc-loader"].loadModule("/main.vue", options)
          )
        );
        loadPlugins(app);
        app.mount(document.getElementById("my-component"));
      });
    });
  },
};
</script>
