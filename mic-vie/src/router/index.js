import { createRouter, createWebHistory } from "vue-router";

export const defaultRoute = [
  {
    path: "/vcc/project/list",
    component: () => import("@/views/bba/list.vue"),
  },
  {
    path: "/vcc/index",
    component: () => import("@/views/vcc/index.vue"),
  },
  {
    path: "/vcc/detail",
    component: () => import("@/views/vcc/detail.vue"),
  },
  {
    path: '/vcc/form',
    component: () => import("@/views/vcc/form.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/vcc/form.vue"),
  }
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
