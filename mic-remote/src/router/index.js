import { createRouter, createWebHistory } from "vue-router";

export const defaultRoute = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
  },
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
