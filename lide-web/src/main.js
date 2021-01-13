import Vue from "vue";
import Vuetify from "./configs/vuetify";
import Router from "./configs/router";
import Store from "./store/index"
import App from "./App.vue";

Vue.config.productionTip = false;

const router = Router;
const vuetify = Vuetify;
const store = Store;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
