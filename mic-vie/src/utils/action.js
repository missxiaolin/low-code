import { get } from "lodash-es";
import { request } from "./fetch";
import { message } from "ant-design-vue";
import { getCurrentInstance } from "vue";

const [messageApi, contextHolder] = message.useMessage();

/**
 * 获取变量
 * @param {*} key
 * @returns
 */
export function getData(key) {
  const instance = getCurrentInstance();
  if (instance) {
    return instance.proxy[key];
  }
  return null;
}

/**
 * 设置变量
 * @param {*} instance
 * @param {*} key
 * @param {*} value
 */
export function setData(key, value) {
  const instance = getCurrentInstance();
  instance.proxy[key] = value;
}

/**
 * @param {*} instance
 * @param {*} item
 * @param {*} config
 * @param {*} eventData
 * @param {*} initEventData
 */
export const requestHandle = async (
  item,
  actionConfig,
  eventData,
  initEventData
) => {
  const instance = getCurrentInstance();
  const url = actionConfig.requestUrl || "";
  const method = actionConfig.requestMethod || "";
  const params = actionConfig.requestParams || [];
  try {
    // 解析代码里的变量
    const paramsValue = params.reduce((prev, cur) => {
      prev[cur.key] = cur.value.replace(/\{(.+)\}/g, (_, $2) => {
        return get(
          {
            eventData,
            initEventData,
            data: instance.proxy,
          },
          $2
        );
      });
      return prev;
    }, {});

    let param = {
      url,
      method,
    };
    if (method === "get") {
      param.params = paramsValue;
    } else {
      param.data = paramsValue;
    }
    const res = await request(param);

    // 执行成功后，执行后续成功success事件
    const nodes = item.children?.filter((o) => o.eventKey === "success");
    execEventFlow(nodes, res.data, initEventData);
  } catch (error) {
    // 执行失败后，执行后续失败error事件
    // console.log(error, "error");

    const nodes = item.children?.filter((o) => o.eventKey === "error");
    execEventFlow(nodes, error);
  } finally {
    const nodes = item.children?.filter((o) => o.eventKey === "finally");
    execEventFlow(nodes);
  }
};

/**
 * 执行脚本
 * @param {*} script
 * @param {*} eventData
 * @param {*} initEventData
 * @returns
 */
function execScript(script, eventData, initEventData) {
  const func = new Function("ctx", `return ${script}`);

  const ctx = { setData, getData, eventData, initEventData };
  return func(ctx);
}

/**
 * 执行脚本
 * @param {*} item
 * @param {*} actionConfig
 * @param {*} eventData
 * @param {*} initEventData
 */
async function execScriptHandle(item, actionConfig, eventData, initEventData) {
  const { functionScript } = actionConfig || {};

  if (functionScript) {
    try {
      // 执行脚本
      execScript(functionScript, eventData, initEventData);

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o) => o.eventKey === "success");
      execEventFlow(nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o) => o.eventKey === "error");
      execEventFlow(nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o) => o.eventKey === "finally");
      execEventFlow(nodes);
    }
  }
}

/**
 * 显示提示
 * @param {*} item
 * @param {*} actionConfig
 */
function showMessageHandle(item, actionConfig) {
  if (actionConfig?.type && actionConfig?.text) {
    try {
      if (actionConfig.type === "success") {
        messageApi.success(actionConfig.text);
      } else if (actionConfig.type === "error") {
        messageApi.error(actionConfig.text);
      }

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o) => o.eventKey === "success");
      execEventFlow(nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o) => o.eventKey === "error");
      execEventFlow(nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o) => o.eventKey === "finally");
      execEventFlow(nodes);
    }
  }
}

const eventHandleMap = {
  request: requestHandle,
  function: execScriptHandle,
  showMessage: showMessageHandle,
};
/**
 * 事件流
 * @param {*} nodes
 * @param {*} eventData
 * @param {*} initEventData
 * @returns
 */
export function execEventFlow(nodes, eventData = "", initEventData = "") {
  if (!nodes.length) return;
  nodes.forEach(async (item) => {
    // 判断是否是动作节点，如果是动作节点并且条件结果不为false，则执行动作
    if (item.type === "action" && item.conditionResult !== false) {
      // 根据不同动作类型执行不同动作
      await eventHandleMap[item.config.type](
        item,
        item.config.config,
        eventData,
        initEventData
      );
    } else if (item.type === "condition") {
      // TODO: 判断条件
      // 递归执行子节点事件流
      execEventFlow(item.children, null, initEventData);
    } else if (item.type === "event") {
      // 如果是事件节点，执行事件子节点事件流
      execEventFlow(item.children, null, initEventData);
    }
  });
}
