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
        state.projects = payload;
      },
      SET_CURRENTFILE(state, payload){
        state.currentFile = payload;
      },
      SET_TABS(state, payload){
        state.tabs = payload;
      }
    },
    
    actions: {

//-------------------------------------USERS-------------------------------------//

      //creation de l'user en bdd
      createUser(context){
        console.log("user du createUser du store " + context.getters.username);
        service.createUser(context.getters.username);
      },

//-------------------------------------PROJECTS-------------------------------------//

      //set les projects courants de USER
      getProjects({commit, state}) {
        console.log("user du getProjects du store " + state.username);
        service.getProjects(state.username).then((res) => {
          commit('SET_PROJECTS', res.data);
          });
      },

      //avec un projectname recupé depuis de compo modalnewproject.vue et l'username du store
      createProject({state},title) {
         service.createProject(title,state.username);
      },

  /*    
      A FAIRE 
  //rename le project a l adr projectpath en data
      renameProject(username, projectpath ,data) {
        service.renameProject(username,projectpath,data);
      },

      //delet le project et met a jour les projects courant
      deleteProject({commit}, username, projectpath) {
        service.deleteProject(username,projectpath).then((res) => {
          commit('SET_PROJECTS', res.data)
          })
      }, */

//-------------------------------------FILES-------------------------------------//
      

  //creation d'un fichier et le met en fichier courant
      createFile({state}, obj) {
        console.log("projectname : " + obj.projectname);
        console.log("content : " + obj.content);
        console.log("filename : " + obj.filename);
        console.log("userame : " + state.username);
        service.createFile(state.username,obj.projectname, obj.content, obj.filename);
      },

      getFile({state, commit}, obj) {
        console.log("on update le file avec =>");
        console.log(obj);
        service.get("/getFile",state.username, obj.projectname, obj.filename ).then( (res) => {
          commit('SET_CURRENTFILE', res.data);
          }
        );
      }

      /*  
      A FAIRE


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
      },*/
    },


    getters: {
      username(state){
        return state.username;
      },
      projects(state){
        return state.projects;
      },
      currentFile(state){
        return state.currentFile;
      },
      tabs(state){
        return state.tabs;
      },
      projectname(state){
        return state.projects.projectname;
      }
    },
  
  });

  export default store;