import { get } from "lodash-es";
import { request } from "./fetch";
import { message } from "ant-design-vue";
const [messageApi, contextHolder] = message.useMessage();

/**
 * 设置变量
 * @param {*} instance
 * @param {*} key
 * @param {*} value
 */
function setData(instance, key, value) {
  instance.proxy.$data[key] = value;
}

/**
 * @param {*} instance
 * @param {*} item
 * @param {*} config
 * @param {*} eventData
 * @param {*} initEventData
 */
export const requestHandle = async (
  instance,
  item,
  actionConfig,
  eventData,
  initEventData
) => {
  const url = actionConfig.requestUrl || "";
  const method = actionConfig.requestMethod || "";
  const params = actionConfig.requestParams || [];
  const body = actionConfig.requestBody || [];
  //   const { url, method, params = [], body = [] } = actionConfig || {};
  try {
    // 解析代码里的变量
    const paramsValue = params.reduce((prev, cur) => {
      prev[cur.key] = cur.value.replace(/\{(.+)\}/g, (_, $2) => {
        return get(
          {
            eventData,
            initEventData,
            data: usePageDataStore.getState().data,
          },
          $2
        );
      });
      return prev;
    }, {});

    let bodyValue;

    if (body && body.type === "script" && body.script) {
      bodyValue = execScript(body.script, eventData, initEventData);
    } else if (body && body.type === "json" && body.json) {
      bodyValue = JSON.parse(body.json);
    }
    const res = await request({
      url,
      method,
      params: paramsValue,
      data: bodyValue,
    });

    // 执行成功后，执行后续成功success事件
    const nodes = item.children?.filter((o) => o.eventKey === "success");
    execEventFlow(nodes, instance, res.data, initEventData);
  } catch (error) {
    // 执行失败后，执行后续失败error事件
    // console.log(error, "error");

    const nodes = item.children?.filter((o) => o.eventKey === "error");
    execEventFlow(nodes, instance, error);
  } finally {
    const nodes = item.children?.filter((o) => o.eventKey === "finally");
    execEventFlow(nodes, instance);
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

  const ctx = { setData, getComponentRef, getData, eventData, initEventData };
  return func(ctx);
}

/**
 * 执行脚本
 * @param {*} instance
 * @param {*} item
 * @param {*} actionConfig
 * @param {*} eventData
 * @param {*} initEventData
 */
async function execScriptHandle(
  instance,
  item,
  actionConfig,
  eventData,
  initEventData
) {
  const { script } = actionConfig || {};

  if (script) {
    try {
      // 执行脚本
      execScript(script, eventData, initEventData);

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o) => o.eventKey === "success");
      execEventFlow(nodes, instance);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o) => o.eventKey === "error");
      execEventFlow(nodes, instance);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o) => o.eventKey === "finally");
      execEventFlow(nodes, instance);
    }
  }
}

/**
 * 显示提示
 * @param {*} instance
 * @param {*} item
 * @param {*} actionConfig
 */
function showMessageHandle(instance, item, actionConfig) {
  if (actionConfig?.type && actionConfig?.text) {
    try {
      if (actionConfig.type === "success") {
        messageApi.success(actionConfig.text);
      } else if (actionConfig.type === "error") {
        messageApi.error(actionConfig.text);
      }

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o) => o.eventKey === "success");
      execEventFlow(nodes, instance);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o) => o.eventKey === "error");
      execEventFlow(nodes, instance);
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
 * @param {*} instance
 * @param {*} eventData
 * @param {*} initEventData
 * @returns
 */
export function execEventFlow(
  nodes,
  instance,
  eventData = "",
  initEventData = ""
) {
  if (!nodes.length) return;
  nodes.forEach(async (item) => {
    // 判断是否是动作节点，如果是动作节点并且条件结果不为false，则执行动作
    if (item.type === "action" && item.conditionResult !== false) {
      // 根据不同动作类型执行不同动作
      await eventHandleMap[item.config.type](
        instance,
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
