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
//toutes les actions on le mm noms que dans task services pour plus de lisibilité

//-------------------------------------PROJECTS-------------------------------------//
      //set les projects courants grace a un user et met a jour les projects courant
      getProjects({commit}, username) {
        service.getProjects(username).then((res) => {
        commit('SET_PROJECTS', res.data)
        })
      },

      //cree un projet pour un user garce a un json de project et met a jour les projects courant
      createProject({commit}, username, data) {
        service.createProject(username,data).then((res) => {
          commit('SET_PROJECTS', res.data)
          })
      },

      //rename le project a l adr projectpath en data et met a jour les projects courant
      renameProject({commit}, username, projectpath,data) {
        service.renameProject(username,projectpath,data).then((res) => {
          commit('SET_PROJECTS', res.data)
          })
      },

      //delet le project et met a jour les projects courant
      deleteProject({commit}, username, projectpath) {
        service.deleteProject(username,projectpath).then((res) => {
          commit('SET_PROJECTS', res.data)
          })
      },

//-------------------------------------FILES-------------------------------------//
      
      //creation d'un fichier et le met en fichier courant
      createFile({commit}, username, projectpath, data) {
        service.createFile(username,projectpath, data).then((res) => {
          commit('SET_CURRENTFILE', res.data)
          })
      },

      //on ajoute du contenu au file et le remet en current file
      updateFile({commit}, username, projectpath, filename, data) {
        service.updateFile(username,projectpath, filename, data).then((res) => {
          commit('SET_CURRENTFILE', res.data)
          })
      },

      //on delet un file !!! on met quoi en current file ducoup
      deleteFile({commit}, username, projectpath, filename) {
        service.deleteFile(username,projectpath, filename).then((res) => {
          commit('SET_CURRENTFILE', res.data)
          })
      },


      //on save notre file dans la base de données il est tjrs en current 
      saveFile({commit}, username, projectpath, filename, data) {
        service.saveFile(username,projectpath, filename, data).then((res) => {
          commit('SET_CURRENTFILE', res.data)
          })
      },
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