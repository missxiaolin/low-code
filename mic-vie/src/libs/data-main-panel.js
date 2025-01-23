import * as Vue from "vue";
import { dataEditTem, getEditOptions } from "./mt";
import { cloneDeep } from "lodash-es";
import EventEmitter from "eventemitter3";
import { updateLinkTree } from "../components/vccEditor/utils/forCode";
import { createNewCodeGenerator } from "@/libs/code-generator-factory";

export class MainPanelProvider {
  constructor(options) {
    // 开启编辑模式
    this.editMode = true;
    this.eventEmitter = new EventEmitter();
    this.currentPointPositionAfterIndex = -1;

    // 存储所有的渲染记录, 保存副本
    this.renderStack = [];
    this.redoStack = [];

    this.externalJS = {};
    this.customCss = "";
    this.eventNode = {};
    this.customData = {};

    this.componentOptions = {};
    this.dropIninFunction =
      options && options.dropIninFunction ? options.dropIninFunction : "";
  }
  /**
   * 事件订阅
   * @param {*} event -> mounted:当新的根节点被挂载 | selected:选择了某个节点 | codeCreated:生成了代码 | codeStructureUpdated:代码结构更新
   * @param {*} listener
   */
  subscribeEventListener(event, listener) {
    this.eventEmitter.on(event, listener);
  }

  getComponentOptions() {
    return this.componentOptions;
  }

  /**
   * 选中某个一个元素时
   */
  onSelectElement(callback) {
    this.subscribeEventListener("selected", callback);
    return this;
  }

  /**
   * 当根节点挂载后
   * @param {*} callback
   */
  onRootElementMounted(callback) {
    this.subscribeEventListener("mounted", callback);
    return this;
  }

  /**
   * 当Vue代码生成后
   * @param {*} callback
   */
  onCodeCreated(callback) {
    this.subscribeEventListener("codeCreated", callback);
    return this;
  }

  /**
   * 当代码结构更新后
   * @param {*} callback
   */
  onCodeStructureUpdated(callback) {
    this.subscribeEventListener("codeStructureUpdated", callback);
    return this;
  }

  /**
   * 当代码合并完成后
   * @param {*} callback
   */
  onMerged(callback) {
    this.subscribeEventListener("onMerged", callback);
    return this;
  }

  /**
   * 当节点删除后
   * @param {*} callback
   */
  onNodeDeleted(callback) {
    this.subscribeEventListener("onNodeDeleted", callback);
    return this;
  }

  /**
   * 设置新组建要放入的位置与对象
   * @param {*} index
   */
  setDropInfo(dropInfo) {
    this.currentPointDropInfo = dropInfo;
  }

  saveCssCodeOnly(code) {
    this.customCss = code || "";
    return this;
  }

  saveJSCodeOnly(code) {
    this.externalJS = code || "";
    return this;
  }

  saveEventNode(obj) {
    this.eventNode = obj;
    return this;
  }

  saveJsData(data) {
    this.customData = data;
    return this;
  }

  setEditMode(editMode, mountedEle) {
    this.editMode = editMode;
    this.mountedEle = mountedEle;
    this.reRender();
  }

  /**
   * 重新渲染
   */
  reRender() {
    this._render(this._rawDataStructure);
    return this;
  }

  /**
   * 对外渲染函数：将一个指定的数据结构渲染出来，并会保存这次的渲染记录
   * @param {*} rawDataStructure
   */
  render(rawDataStructure) {
    this._render(rawDataStructure);
    return this;
  }

  /**
   * 对内渲染
   * @param {*} rawDataStructure
   */
  async _render(rawDataStructure) {
    this._rawDataStructure = rawDataStructure;
    // 对外只提供副本，防止外面污染内部
    const codeStructureCopy = cloneDeep(rawDataStructure);

    this.eventEmitter.emit("codeStructureUpdated", codeStructureCopy);
    this.initCodeGenerator();

    let code = await this.codeGenerator.outputVueCodeWithJsonObj(
      rawDataStructure
    );

    // 将xxx: () => {} 转换为xxx(){}
    // code = code.replace(/:\s*\(([\w\s]*)\)\s*=>/g, "($1)");
    code = code.replace(/:\s*\(([\w\s,]*)\)\s*=>/g, "($1)");

    // 生成展示代码
    let codeForShow = code.replace(/\s{1}lc_id=".+?"/g, "");
    codeForShow = codeForShow.replace(/\s{1}vccName=".+?"/g, "");
    codeForShow = codeForShow.replace(/\s{1}component_name=".+?"/g, "");
    codeForShow = codeForShow.replace(/\s{1}lc-mark/g, "");
    codeForShow = codeForShow.replace(/\s{1}div-lc-mark/g, "");
    this.eventEmitter.emit("codeCreated", codeForShow);

    if (this.editMode) {
      // 渲染当前代码
      const readyForMoutedElement = this.createMountedElement();
      this.appLoad(code, readyForMoutedElement);
      this.enableEditMode();
      // // 拍平数据结构
      this.flatDataStructure(rawDataStructure);
    } else {
      // 渲染当前代码
      this.appLoad(code, this.mountedEle);
    }

    return this;
  }

  enableEditMode() {}

  /**
   * 将数据拍平，以id: data 的方式联结
   * @param {*} rawDataStructure
   */
  flatDataStructure(rawDataStructure) {
    updateLinkTree(rawDataStructure);
  }

  /**
   * 初始化代码编译
   */
  initCodeGenerator() {
    this.codeGenerator = createNewCodeGenerator();
    this.codeGenerator.setExternalJS(this.externalJS);
    this.codeGenerator.setExternalCss(this.customCss);
    this.codeGenerator.setEventNode(this.eventNode);
    this.codeGenerator.setCustomData(this.customData);
  }

  /**
   * 生成一个新的待挂载容器
   */
  createMountedElement() {
    const renderControlPanel = this.getControlPanelRoot();

    if (this.styleNodeName) {
      renderControlPanel.setAttribute("class", this.styleNodeName);
    }
    return renderControlPanel;
  }

  getControlPanelRoot() {
    return document.getElementById("render-control-panel");
  }

  /**
   * 使用vue3-sfc-loader 渲染拖拽组件
   * @param {*} code
   */
  appLoad(code, readyForMoutedElement) {
    const codeString = dataEditTem(code, this._rawDataStructure);
    // 渲染当前代码
    const files = {
      "/main.vue": codeString,
      "/events.json": `${JSON.stringify(this.eventNode)}`,
    };

    const options = getEditOptions(files);
    const app = Vue.createApp(
      Vue.defineAsyncComponent(() =>
        window["vue3-sfc-loader"].loadModule("/main.vue", options)
      )
    );
    window.loadApp(app);
    app.mount(readyForMoutedElement);
  }
}
