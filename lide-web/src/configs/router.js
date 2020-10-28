import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Ide from "../pages/Ide.vue";
import Page404 from "../pages/Page404.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/app/", name: "Ide", component: Ide },
  { path: "*", name: "Page404", component: Page404 },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
