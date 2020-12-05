import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Ide from "../pages/Ide.vue";
import Page404 from "../pages/Page404.vue";
import FakeLogin from "../pages/login.vue";
import Cas from "./cas";
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/app/", name: "Ide", component: Ide },
  { path: "/cas/", name : "Login", component: FakeLogin},
  { path: "*", name: "Page404", component: Page404 },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

Vue.use(Cas,router);

export default router;