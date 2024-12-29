<template>
  <a-modal v-bind="attrs">
    <div class="flex flex-column mt20">
      <div class="formula-box flex flex-row">
        <div
          :class="{
            'formula-left-box': true,
          }"
        >
          <a-collapse ghost class="formula-collapse-box">
            <a-collapse-panel
              v-for="(item, index) in collapseList"
              :key="index"
              :header="item.title"
            >
              <template v-if="item.children.length > 0">
                <div
                  v-for="(v, i) in item.children"
                  :key="i"
                  class="formula-item"
                  @mouseenter="(e) => handleMouseEnter(e, v)"
                  @dblclick="formulaItemClick(v)"
                >
                  {{ v.title }}
                </div>
              </template>
              <template v-else>
                <div>敬请期待</div>
              </template>
            </a-collapse-panel>
          </a-collapse>
          <div v-if="Object.keys(itemDetail).length > 0" class="tip-box">
            <div class="title">{{ itemDetail.title }}</div>
            <div class="doc">
              <a-dropdown :placement="'top'" :trigger="['hover', 'click']">
                <div>{{ itemDetail.doc }}</div>
                <template #overlay>
                  <a-table
                    :columns="collapseColumns"
                    :data-source="itemDetail.children"
                    :pagination="false"
                  >
                  </a-table>
                </template>
              </a-dropdown>
            </div>
            <div class="desc">{{ itemDetail.desc }}</div>
          </div>
        </div>
        <formula
          v-model:value="editorValue"
          ref="formulaEditorRef"
          style="height: 400px; padding-top: 10px"
        />
        <div class="formula-right-box">
          <ul class="data-ul" v-if="customData.length > 0">
            <li v-for="(item, index) in customData" :key="index">
              <div class="data-key">
                <a-tooltip>
                  <template #title>{{ item.keyDesc }}</template>
                  <div @dblclick="customDataLiClick(item.key)">
                    {{ item.key }}
                  </div>
                </a-tooltip>
              </div>
            </li>
          </ul>
          <div class="mt10" v-else>暂无变量</div>
        </div>
      </div>
      <div class="form-bottom-box mt10">
        <a-button type="primary" @click="handleOk">保存</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { ref } from "vue";
import Formula from "./index.vue";
import { collapseList, collapseColumns } from "./config";
import { useAttrs } from "vue";
export default {
  name: "micFormulaModal",
  components: {
    Formula,
  },
  props: {
    customData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    let editorValue = ref("");
    const formulaEditorRef = ref(null);
    let itemDetail = ref({});
    const attrs = useAttrs();

    const handleOk = () => {
      //   console.log(formulaEditorRef.value);
      console.log(editorValue.value);
    };

    const formulaItemClick = (item) => {
      formulaEditorRef.value.setEditorCode(`${item.title}()`);
    };

    const handleMouseEnter = (e, v) => {
      itemDetail.value = v;
      document.querySelectorAll(".formula-item").forEach((item) => {
        item.classList.remove("formula-item-active");
      });
      e.target.classList.add("formula-item-active");
    };

    const customDataLiClick = (key) => {
      formulaEditorRef.value.setEditorCode(key);
    };

    return {
      attrs,
      handleOk,
      collapseList,
      handleMouseEnter,
      itemDetail,
      collapseColumns,
      formulaEditorRef,
      editorValue,
      formulaItemClick,
      customDataLiClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.formula-box {
  width: 100%;
  height: 400px;
  border: solid 1px var(--ve-header-animat);
  border-radius: 10px;
  padding: 10px 0 10 0px;
  overflow: hidden;
}
.formula-left-box {
  width: 35%;
  border-right: solid 1px var(--ve-header-animat);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transform: translateX(0);
  .formula-collapse-box {
    height: 300px;
    overflow: auto;
  }
  .tip-box {
    width: 100%;
    height: 190px;
    padding: 10px;
    background-color: #303030;
    .desc {
      max-height: 80px;
      overflow: auto;
      margin-top: 10px;
    }
    .desc::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
}
.formula-right-box {
  width: 35%;
  border-left: solid 1px var(--ve-header-animat);
  padding-left: 10px;
  overflow: auto;
}
.formula-item {
  width: 100%;
  padding-left: 10px;
  &:hover {
    background-color: var(--ve-header-animat);
  }
  &.formula-item-active {
    background-color: var(--ve-header-animat);
  }
}
.data-ul {
  padding: 0 10px 0 10px;
  margin-top: 20px;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    .data-key {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
      display: flex;
      flex-direction: column;
      div {
        &:nth-child(2) {
          color: #ccc;
        }
      }
    }
    .data-right {
      width: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
