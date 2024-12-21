import { createRouter, createWebHistory } from "vue-router";

const demoRoute = [
  // 下面都是测试代码
  {
    path: "/form/code",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/flow/node",
    component: () => import("@/views/demo/flow.vue"),
  },
  {
    path: "/flow/node1",
    component: () => import("@/views/demo/flow1/flow1.vue"),
  },
  {
    path: "/script/code",
    component: () => import("@/views/demo/code.vue"),
  },
];

export const defaultRoute = [
  {
    path: "/",
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/user/login.vue"),
  },
  {
    path: "/project/list",
    component: () => import("@/views/project/list.vue"),
  },
  {
    path: "/project/page",
    component: () => import("@/views/project/page.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
  },
  {
    path: "/form", // 拖拽表单
    component: () => import("@/views/vcc/form.vue"),
  },
  {
    path: "/:catchAll(.*)", // 表单代码执行
    component: () => import("@/views/main/index.vue"),
  },
];

let prdRoutesList = [...defaultRoute, ...demoRoute];

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
