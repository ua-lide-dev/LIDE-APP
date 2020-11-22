import Vue from "vue";
import VueX from "vuex";
import persistedstate from "vuex-persistedstate";
import service from "../services/task-service";

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
      SET_USERNANE(state, payload){
        state.username = payload;
      },
      SET_PROJECTS(state, payload){
        state.project = payload;
      },
      SET_CURRENTFILE(state, payload){
        state.currentFile = payload;
      },
      SET_TABS(state, payload){
        state.tabs = payload;
      }
    },
    
    actions: {
      loadProjects({commit}, username) {
        service.getProjects(username).then((res) => {
        commit('SET_PROJECTS', res.data)
        })
      }
      //tous les services ont une actions les faires
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