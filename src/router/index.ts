import { createRouter, createWebHistory } from "vue-router";
import AvatarView from "../views/AvatarView.vue";
import DashboardView from "../views/DashboardView.vue";
import GoalsView from "../views/GoalsView.vue";
import HabitsView from "../views/HabitsView.vue";

const routes = [
  { path: "/", redirect: "/habits" },
  { path: "/habits", component: HabitsView },
  { path: "/dashboard", component: DashboardView },
  { path: "/goals", component: GoalsView },
  { path: "/avatar", component: AvatarView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
