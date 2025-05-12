import { createMemoryHistory, createRouter } from "vue-router";
import HabitsView from "../views/HabitsView.vue";

const routes = [
  { path: "/", redirect: "/habits" },
  { path: "/habits", component: HabitsView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
