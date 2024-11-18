import { createRouter, createWebHistory } from "vue-router";

export const defaultRoute = [
  {
    path: "/",
    component: () => import("@/views/vcc/form.vue"),
  },
  {
    path: "/flow/node",
    component: () => import("@/views/demo/flow.vue"),
  },
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
