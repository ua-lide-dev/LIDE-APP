import Vue from "vue";
import VueX from "vuex";
import persistedstate from "vuex-persistedstate";

Vue.use(VueX)

const store = new VueX.Store({

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

  export default store;