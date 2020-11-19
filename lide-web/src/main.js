import Vue from "vue";
import App from "./App.vue";
import router from "./configs/router";
import vuetify from "./configs/vuetify";
import axios from "axios";
import store from "./store/store.js";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),

  compted:{
    message(){
        return store.state.message;
    }
}

}).$mount("#app");
