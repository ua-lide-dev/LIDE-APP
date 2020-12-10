import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import Ide from "../pages/Ide";
import Page404 from "../pages/Page404"
import Cas from "./cas";


Vue.use(VueRouter);

const routes = [
  {
    path: "/", name: "Home", component: Home, meta: {
      requiresAuth: false
    }
  },
  {
    path: "/app/", name: "Ide", component: Ide, meta: {
      requiresAuth: true
    }
  },
  {
    path: "/logout/", name: "Logout", meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login/", name: "Login", meta: {
      requiresAuth: false
    }
  },
  { path: "*", name: "Page404", component: Page404 },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

Vue.use(Cas, router);

export default router;