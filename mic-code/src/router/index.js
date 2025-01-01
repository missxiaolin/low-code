import { createRouter, createWebHistory } from "vue-router";

export const defaultRoute = [
  {
    path: "/",
    component: () => import("@/views/main/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/user/login.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
  },
  {
    path: "/:catchAll(.*)", // 表单代码执行
    component: () => import("@/views/main/index.vue"),
  },
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
