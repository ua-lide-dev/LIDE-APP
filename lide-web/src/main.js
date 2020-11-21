import Vue from "vue";
import vuex from "./store/store";
import App from "./App.vue";
import router from "./configs/router";
import vuetify from "./configs/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  vuex,
  render: (h) => h(App),



}).$mount("#app");
