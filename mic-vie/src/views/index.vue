<template>
  <div
    class="container"
    @click="
      (e) => {
        eventFun('8DD88287-8C91-4C51-B7C6-552027C51317', e);
      }
    "
  ></div>
</template>

<script>
import { toRefs, getCurrentInstance } from "vue";
export default {
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const $data = toRefs({});
    const $events = {
      "8DD88287-8C91-4C51-B7C6-552027C51317": {
        id: "root",
        label: "开始",
        type: "start",
        menus: [
          {
            key: "action",
            label: "动作",
            nodeType: "action",
            nodeName: "动作",
          },
        ],
        x: -148,
        y: -88,
        depth: 0,
        style: {
          hover: {},
          selected: {},
        },
        children: [
          {
            type: "action",
            id: "n-0.49135499084288115",
            label: "请求接口",
            key: "action",
            menus: [
              {
                label: "成功",
                key: "success",
                nodeType: "event",
                nodeName: "成功",
                eventKey: "success",
              },
              {
                label: "失败",
                key: "error",
                nodeType: "event",
                nodeName: "失败",
                eventKey: "error",
              },
              {
                label: "成功或失败",
                key: "finally",
                nodeType: "event",
                nodeName: "成功或失败",
                eventKey: "finally",
              },
            ],
            conditionId: undefined,
            eventKey: undefined,
            x: -148,
            y: 8,
            depth: 1,
            style: {
              hover: {},
              selected: {},
            },
            config: {
              type: "request",
              config: {
                requestUrl: "",
                requestMethod: "",
                activeKey: "requestParams",
                requestParams: [],
                requestParamsScript:
                  "(function (ctx) {\n  // TODO\n                    \n})(ctx)",
              },
            },
            children: [
              {
                type: "event",
                id: "n-0.9451357437571963",
                label: "成功",
                key: "success",
                menus: [
                  {
                    key: "action",
                    label: "动作",
                    nodeType: "action",
                    nodeName: "动作",
                    eventKey: "success",
                  },
                  {
                    key: "condition",
                    label: "条件",
                    nodeType: "condition",
                    nodeName: "条件",
                    eventKey: "success",
                  },
                ],
                conditionId: undefined,
                eventKey: "success",
                x: -148,
                y: 104,
                depth: 2,
                style: {
                  hover: {},
                  selected: {},
                },
                children: [
                  {
                    type: "action",
                    id: "n-0.6027026429970399",
                    label: "执行脚本",
                    key: "action",
                    menus: [
                      {
                        label: "成功",
                        key: "success",
                        nodeType: "event",
                        nodeName: "成功",
                        eventKey: "success",
                      },
                      {
                        label: "失败",
                        key: "error",
                        nodeType: "event",
                        nodeName: "失败",
                        eventKey: "error",
                      },
                      {
                        label: "成功或失败",
                        key: "finally",
                        nodeType: "event",
                        nodeName: "成功或失败",
                        eventKey: "finally",
                      },
                    ],
                    conditionId: undefined,
                    eventKey: "success",
                    x: -148,
                    y: 200,
                    depth: 3,
                    style: {
                      hover: {},
                      selected: {},
                    },
                    config: {
                      type: "function",
                      config: {
                        functionScript:
                          "(function (ctx) {\n  // TODO\n                    \n})(ctx)",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    // 执行事件流
    const eventFun = (eventKey, e) => {
      if (!$events[eventKey]) {
        return;
      }
      instance.proxy.$execEventFlow(instance, $events[eventKey], e);
    };

    return {
      ...$data,
      eventFun,
    };
  },
};
</script>

<style scoped>
.container {
}
</style>
