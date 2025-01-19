export function getMtTem() {
  return `
        <template>
  <div class="mt-setting-container">
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in modalList"
            :key="item.lc_id"
            @click="(e) => handleModalClick(e, item)"
          >
            弹窗 - {{ item.lc_id }}
          </a-menu-item>
        </a-menu>
      </template>
      <a-badge :count="modalList.length" show-zero>
        <a-button :disabled="modalList.length == 0 ? true : false" type="text" danger>弹窗</a-button>
      </a-badge>
    </a-dropdown>
    <a-dropdown trigger="click">
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in drawerList"
            :key="item.lc_id"
            @click="(e) => handleDrawerClick(e, item)"
          >
            抽屉 - {{ item.lc_id }}
          </a-menu-item>
        </a-menu>
      </template>
      <a-badge :count="drawerList.length" show-zero>
        <a-button :disabled="drawerList.length == 0 ? true : false" type="text" danger>抽屉</a-button>
      </a-badge>
    </a-dropdown>
  </div>
</template>

<script>
import { ref, getCurrentInstance, inject } from "vue";
export default {
  props: ["rawDataStructure"],
  setup(props) {
    const instance = getCurrentInstance();
    const main = inject('main');
    let modalList = ref([]);
    let drawerList = ref([]);
    const rawDataStructure = props.rawDataStructure;
    let arr = [];
    try {
      arr = rawDataStructure.template.__children;
    } catch (error) {}

    const init = (rawArr) => {
      rawArr.forEach((item) => {
        if (
          Object.keys(item).length > 0 &&
          Object.keys(item)[0] == "mic-modal"
        ) {
          modalList.value.push(item[Object.keys(item)[0]]);
          if (item[Object.keys(item)[0]].lc_id == window.$mt) {
            main.proxy[item[Object.keys(item)[0]]["v-model:open"]] = true;
          }
        }
        if (
          Object.keys(item).length > 0 &&
          Object.keys(item)[0] == "mic-drawer"
        ) {
          drawerList.value.push(item[Object.keys(item)[0]]);
          if (item[Object.keys(item)[0]].lc_id == window.$mt) {
            main.proxy[item[Object.keys(item)[0]]["v-model:open"]] = true;
          }
        }
        if (
          item[Object.keys(item)[0]].__children &&
          item[Object.keys(item)[0]].__children.length > 0
        ) {
          init(item[Object.keys(item)[0]].__children);
        }
      });
    };
    init(arr);

    const handleModalClick = (e, row) => {
      e.stopPropagation();
      // 说明绑定了v-model:open
      if (Object.keys(row).includes("v-model:open")) {
        main.proxy[row["v-model:open"]] = true;
        window.$mt = row.lc_id;
      }
    };

    const handleDrawerClick = (e, row) => {
      e.stopPropagation();
      // 说明绑定了v-model:open
      if (Object.keys(row).includes("v-model:open")) {
        main.proxy[row["v-model:open"]] = true;
        window.$mt = row.lc_id;
      }
    };

    return {
      modalList,
      drawerList,
      handleModalClick,
      handleDrawerClick,
    };
  },
};
</script>

<style scoped>
.mt-setting-container {
  position: fixed;
  left: 10px;
  bottom: 15px;
  z-index: 999;
  border: 1px solid #303030;
  display: flex;
  flex-direction: column;
  background-color: var(--search-bg-color);
}
</style>

    `;
}
