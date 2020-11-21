import Vue from "vue";
import VueX from "vuex";
import persistedstate from "vuex-persistedstate";
import axios from "axios";

Vue.use(VueX)

const store = new VueX.Store({

    plugins: [persistedstate()],
  
    state: {
        username: String,
        projects: Array,
        currentFile: Object,
        tabs: Array,
    },
    
    mutations: {
      username(state, payload){
        state.username = payload;
      },
      projects(state, payload){
        state.project = payload;
      },
      currentFile(state, payload){
        state.currentFile = payload;
      },
      tabs(state, payload){
        state.tabs = payload;
      }
    },
    
    actions: {
      loadProjects({
        commit
      }) {
        axios.get("/user/123/project").then((res) => {
          commit('projects', res.data)
        })
      }
    },
    
    getters: {
      username(state){
        return state.username;
      },
      projects(state){
        return state.project;
      },
      currentFile(state){
        return state.currentFile;
      },
      tabs(state){
        return state.tabs;
      }
    }
  
  });

  export default store;