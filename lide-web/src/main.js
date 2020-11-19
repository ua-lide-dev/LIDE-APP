import Vue from "vue";
import vuex from "vuex";
import persistedstate from "vuex-persistedstate";
import App from "./App.vue";
import router from "./configs/router";
import vuetify from "./configs/vuetify";
import axios from "axios";
//import store from "./store/store.js";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(vuex);

const store = new vuex.Store({

  plugins: [persistedstate()],

  state: {
      username: String,
      project: Array,
      currentFile: Object,
      tabs: Array,
  },
  
  mutations: {
    setUsername(state, payload){
      state.username = payload;
    },
    setProject(state, payload){
      state.project = payload;
    },
    setCurrentFile(state, payload){
      state.currentFile = payload;
    },
    setTabs(state, payload){
      state.tabs = payload;
    }
  },
  
  actions: {

  },
  
  getters: {
    getUsername(state){
      return state.username;
    },
    getProject(state){
      return state.project;
    },
    getCurrentFile(state){
      return state.currentFile;
    },
    getTabs(state){
      return state.tabs;
    }
  }

});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),



}).$mount("#app");

console.log(store);
