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
        tabs: [],
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
      },
      SET_AND_ADD_CURRENTFILE(state, payload){
        
        state.currentFile = payload;
        var tab = state.tabs;
        var exist = false
        for(var i of tab){
          console.log("object i :");
          console.log(i);
          console.log("payload : ");
          console.log(payload);
          if(i.filename == payload.filename && i.extension == payload.extension)
            exist = true;
        }
        console.log("le fichier exist deja dans les tabs : " + exist);
        if(!exist)
          state.tabs.push(payload);

      },
      ADD_TABS(state, payload){
        state.tabs.push(payload);
      },
      SUPP_FILE_IN_TABS(state, payload){
        state.tabs = state.tabs.splice(payload,1);
        console.log("le fichier dans tabs qui va etre supp est : ");
        console.log(state.tabs[payload]);
      },  
      CLEAR_TABS(state){
        state.tabs = [];
      },
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
        service.createFile(state.username,obj);
      },

      getFile({state, commit}, obj) {
        console.log("on getfile sur =>");
        console.log(obj);
        //username + projectname + filename
        service.getFile(state.username, obj.projectname, obj.filename, obj.extension ).then((res)=> {
          //commit du res de l'apelle au back de la route getfile dans current file et dans le tabs
          commit('SET_AND_ADD_CURRENTFILE', res.data);
        }); 
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
    },
  
  });

  export default store;