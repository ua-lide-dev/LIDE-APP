import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
//import axios from "axios";

Vue.use(VueRouter);

import Home from './pages/Home.vue';
import Ide from './pages/Ide.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/ide', component: Ide },
    {
      path: '*',
      component: {
        render (h) { return h('div', '404 - Not Found.') }
      }
    }
  ]
});

Vue.config.productionTip = false;
//Vue.prototype.$http = axios;
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
