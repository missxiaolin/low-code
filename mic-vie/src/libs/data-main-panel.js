import * as Vue from "vue";
import { dataEditTem, getEditOptions } from "./mt";
import { cloneDeep } from "lodash-es";
import EventEmitter from "eventemitter3";
import {
  updateLinkTree,
  getSplitTag,
  insertPresetAttribute,
  replaceRowID,
  findRawVueInfo,
  merge,
} from "../components/vccEditor/utils/forCode";
import { createNewCodeGenerator } from "@/libs/code-generator-factory";
import {
  isRawComponents,
  getRawComponentContent,
  getRawComponentKey,
  isObject,
} from "../components/vccEditor/utils/common";

export class MainPanelProvider {
  constructor(options) {
    this.isOnload = false;
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

  async asyncReRender() {
    await this._render(this._rawDataStructure);
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

  enableEditMode() {
    let elClone = "";
    const renderControlPanel = this.getControlPanelRoot();
    if (this.enableDelayTask) {
      clearTimeout(this.enableDelayTask);
    }
    this.enableDelayTask = setTimeout(() => {
      this.eventEmitter.emit("mounted", elClone || renderControlPanel);
      // 事件初始化
      this.initComonentsEvent();
    }, 500);
  }

  initComonentsEvent() {
    const renderControlPanel = this.getControlPanelRoot();
    // const elements = renderControlPanel.querySelectorAll("[lc_id]");
    // elements.forEach((element) => {
    // this.markElement(element);
    // });
    if (!this.isOnload) {
      this.initDropEvent();
      this.isOnload = true;
    }
  }

  /**
   * 高亮当前编辑元素等处理，并将当前编辑的元素指针指向这个节点
   */
  markElement(realNode) {
    // 处理之前的状态
    if (this.currentEditElement) {
      this.currentEditElement.classList.remove("mark-element");
    }
    const renderControlPanel = this.getControlPanelRoot();
    const elements = renderControlPanel.querySelectorAll("[lc_id]");
    elements.forEach((element) => {
      element.classList.remove("mark-element");
    });
    if (realNode) {
      this.currentEditElement = realNode;
      const rawVueInfo = this.markElementInner(realNode);
      // 对外只提供副本，防止外面污染内部
      const codeRawInfoCopy = cloneDeep(rawVueInfo);
      this.eventEmitter.emit("selected", codeRawInfoCopy);
    } else {
      this.eventEmitter.emit("selected", null);
    }
  }

  /**
   * 这个方法会返回节点所对应的代码结构
   * @param {*} realNode
   * @returns
   */
  markElementInner(realNode) {
    realNode.classList.add("mark-element");
    const rawVueInfo = findRawVueInfo(realNode);
    // 显示当前组件的名称
    let vccName = getRawComponentKey(rawVueInfo);
    if (rawVueInfo[Object.keys(rawVueInfo)[0]].vccName) {
      vccName = rawVueInfo[Object.keys(rawVueInfo)[0]].vccName;
    }
    realNode.setAttribute("lc-component-name", vccName);
    return rawVueInfo;
  }

  initDropEvent() {
    const renderControlPanel = this.getControlPanelRoot();
    renderControlPanel.addEventListener("dragenter", (event) => {
      event.preventDefault();
    });

    renderControlPanel.addEventListener("dragleave", (event) => {
      event.preventDefault();
    });

    renderControlPanel.addEventListener("dragover", (event) => {
      // Specifying Drop Targets
      event.preventDefault();
    });

    // 拖入预览容器释放时的处理
    renderControlPanel.addEventListener("drop", (event) => {
      const data = event.dataTransfer.getData("text/plain");
      let newData = data.split(getSplitTag());
      // const rawInfo = newData[1]; // 获取拖拽的组件信息
      const vccName = newData[2];
      const vccComponentName = newData[3];
      // let newDropObj = JSON.parse(rawInfo);
      const newDropObj = {
        "mic-shape": {
          vccComponentName,
          vccName,
          ":defaultStyle": `{'top':20,'left':20,'width':${Number(
            newData[4]
          )},'height':${Number(newData[5])}}`,
          lc_id: "micShape",

          __children: [],
        },
      };
      if (isRawComponents(newDropObj)) {
        this.initDropCode(newDropObj);
      }
      this.updateCodeStructure(newDropObj);
    });
  }

  /**
   * 插入
   * @param {*} newDropObj
   */
  initDropCode(newDropObj) {
    // 插入预设属性
    insertPresetAttribute(newDropObj);
    // 使新拖入的代码与原来的做脱离
    replaceRowID(newDropObj, "");
    // 更新到一个Map上面，维持引用，由于render中统一做了处理，所以这段代码是可以删除的 2021年02月04日11:59:10
    updateLinkTree(newDropObj);
  }

  /**
   * 更新
   * @param {*} newDropObj
   */
  updateCodeStructure(newDropObj) {
    // 更新代码结构关系
    const dom = this.getControlPanelRoot();
    const codeTargetElement = dom.childNodes[0];
    if (codeTargetElement) {
      let temp = findRawVueInfo(codeTargetElement);
      // 合并
      merge(getRawComponentContent(temp), newDropObj, -1, () => {
        this.eventEmitter.emit("onMerged");
      });
      this.render(this._rawDataStructure);
    }
  }

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

  /**
   * @param {*} data
   * @param {*} lc_id
   * @returns
   */
  setKeyValue(key, value, lc_id) {
    if (!key || !value) return;
    const object = getRawComponentContent(window.tree[lc_id]);
    object[key] = value;

    // 渲染当前的变更
    this.render(this._rawDataStructure);
    if (object.lc_id) {
      setTimeout(() => {
        this.selectElement(object.lc_id);
      }, 10);
    }
    return this;
  }

  /**
   * 保存属性
   * @param {*} resultList
   * @param {*} rawInfo
   */
  saveAttribute(resultList, lc_id) {
    const param = resultList;
    const object = getRawComponentContent(window.tree[lc_id]);

    // 这里是为了满足当有属性删除的情况，保留保留属性：__children lc-mark lc_id
    for (const key in object) {
      if (
        object.hasOwnProperty(key) &&
        key != "__children" &&
        key != "lc-mark" &&
        key != "lc_id" &&
        key != "div-lc-mark" &&
        !isObject(
          object[
            key
          ] /** 值为Object的情况目前已经没有了2021年02月04日11:56:28 */
        )
      ) {
        delete object[key];
      }
    }
    param.forEach((element) => {
      object[element.key] = element.value;
    });

    // 渲染当前的变更
    this.render(this._rawDataStructure);
    if (object.lc_id) {
      setTimeout(() => {
        this.selectElement(object.lc_id, object.vccName);
      }, 10);
    }
    return this;
  }

  selectElement(uuid) {
    const renderControlPanel = this.getControlPanelRoot();
    const element = renderControlPanel.querySelector(`[lc_id="${uuid}"]`);
    if (!element) return;

    setTimeout(() => {
      element.click();
    });
    // element.setAttribute("lc-component-name", vueRawTag);
  }
}
