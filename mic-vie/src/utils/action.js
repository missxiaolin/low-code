import { get } from "lodash-es";
import router from "../router/index";
import { request } from "./fetch";
import { message } from "ant-design-vue";
import urlUtils from "./url";
const urlTool = new urlUtils();

const [messageApi, contextHolder] = message.useMessage();

/**
 * 获取变量
 * @param {*} key
 * @returns
 */
export function getData(instance, key) {
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
export function setData(instance, key, value) {
  instance.proxy[key] = value;
}

/**
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
  const route = urlTool.getQueryObject(window.location.href);
  try {
    let paramsValue = {};
    if (actionConfig.activeKey === "requestParams") {
      // 解析代码里的变量
      paramsValue = params.reduce((prev, cur) => {
        prev[cur.key] = cur.value.replace(/\{{(.+)\}}/g, (_, $2) => {
          return get(
            {
              eventData,
              initEventData,
              data: instance.proxy,
              route: route.query || {},
            },
            $2
          );
        });
        return prev;
      }, {});
    } else {
      paramsValue = execScript(
        instance,
        actionConfig.requestParamsScript,
        eventData,
        initEventData
      );
    }

    let param = {
      url,
      method,
    };
    if (method === "get") {
      param.params = paramsValue;
    } else if (method === "post") {
      param.data = paramsValue;
    }
    const res = await request(param);

    // 执行成功后，执行后续成功success事件
    const nodes = item.children?.filter((o) => o.eventKey === "success");
    nodes && execEventFlow(instance, nodes, res.data, initEventData);
  } catch (error) {
    // 执行失败后，执行后续失败error事件
    // console.log(error, "error");

    const nodes = item.children?.filter((o) => o.eventKey === "error");
    nodes && execEventFlow(instance, nodes, error);
  } finally {
    const nodes = item.children?.filter((o) => o.eventKey === "finally");
    nodes && execEventFlow(instance, nodes);
  }
};

/**
 * 执行脚本
 * @param {*} instance
 * @param {*} script
 * @param {*} eventData
 * @param {*} initEventData
 * @returns
 */
function execScript(instance, script, eventData, initEventData) {
  const func = new Function("ctx", `return ${script}`);
  const route = urlTool.getQueryObject(window.location.href);
  const ctx = {
    setData,
    getData,
    eventData,
    initEventData,
    route,
    instance,
    router,
  };
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
  const { functionScript } = actionConfig || {};

  if (functionScript) {
    try {
      // 执行脚本
      execScript(instance, functionScript, eventData, initEventData);

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o) => o.eventKey === "success");
      nodes && execEventFlow(instance, nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o) => o.eventKey === "error");
      nodes && execEventFlow(instance, nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o) => o.eventKey === "finally");
      nodes && execEventFlow(instance, nodes);
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
      nodes && execEventFlow(instance, nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o) => o.eventKey === "error");
      nodes && execEventFlow(instance, nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o) => o.eventKey === "finally");
      nodes && execEventFlow(instance, nodes);
    }
  }
}

/**
 * 路由
 * @param {*} instance
 * @param {*} item
 * @param {*} actionConfig
 * @param {*} eventData
 * @param {*} initEventData
 */
function routerHandle(instance, item, actionConfig, eventData, initEventData) {
  const { routeType, routeUrl, routeData } = actionConfig || {};
  const route = urlTool.getQueryObject(window.location.href);

  const query = routeData.reduce((prev, cur) => {
    prev[cur.key] = cur.value.replace(/\{{(.+)\}}/g, (_, $2) => {
      return get(
        {
          eventData,
          initEventData,
          data: instance.proxy,
          route: route.query || {},
        },
        $2
      );
    });
    return prev;
  }, {});
  if (routeType === "route") {
    router.push({ path: routeUrl, query });
  } else if (routeType === "a") {
    window.location.href = `${routeUrl}${urlTool.makeQuery(query)}`;
  }
}

const eventHandleMap = {
  request: requestHandle,
  function: execScriptHandle,
  showMessage: showMessageHandle,
  router: routerHandle,
};
/**
 * 事件流
 * @param {*} instance
 * @param {*} nodes
 * @param {*} eventData
 * @param {*} initEventData
 * @returns
 */
export function execEventFlow(
  instance,
  nodes,
  eventData = "",
  initEventData = ""
) {
  if (!nodes || nodes.length == 0) return;
  nodes.forEach(async (item) => {
    // 判断是否是动作节点，如果是动作节点并且条件结果不为false，则执行动作
    if (item.type === "action" && item.conditionResult !== false) {
      if (!item.config) {
        return;
      }
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
      // 如果是条件节点，执行条件脚本，把结果注入到子节点conditionResult属性中
      // const conditionResult = (item.config || []).reduce(
      //   (prev: any, cur: any) => {
      //     const result = execScript(cur.condition, eventData, initEventData);
      //     prev[cur.id] = result;
      //     return prev;
      //   },
      //   {}
      // );

      // (item.children || []).forEach((c: any) => {
      //   c.conditionResult = !!conditionResult[c.conditionId];
      // });
      // // 递归执行子节点事件流
      // execEventFlow(item.children, null, initEventData);
      // 递归执行子节点事件流
      execEventFlow(instance, item.children, null, initEventData);
    } else if (item.type === "event") {
      // 如果是事件节点，执行事件子节点事件流
      execEventFlow(instance, item.children, null, initEventData);
    }
  });
}
