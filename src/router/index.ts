import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "learn",
      component: () => import("../views/learn/index.vue"),
    },
  ],
});

export default router;
