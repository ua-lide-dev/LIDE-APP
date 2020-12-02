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
      SET_CURRENTFILE_FROM_INDEX(state, payload){
        state.currentFile = state.tabs[payload];
      },
      SET_TABS(state, payload){
        state.tabs = payload;
      },
      ADD_CURRENTFILE_TO_TABS(state, payload){
        
        if(state.tabs.length == 0) state.currentFile = payload;
        var tab = state.tabs;
        var exist = false
        for(var i of tab){
          console.log(payload);
          if(i.filename == payload.filename && i.extension == payload.extension && i.projectname == payload.projectname)
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
        state.tabs.splice(payload,1);
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
      async createProject({state},title) {
         await service.createProject(title,state.username);
      },

  /*    
      A FAIRE 
  //rename le project a l adr projectpath en data
      renameProject(username, projectpath ,data) {
        service.renameProject(username,projectpath,data);
      },*/

      //delet le project
      async deleteProject({state}, projectname) {
        await service.deleteProject(state.username,projectname);
      },

//-------------------------------------FILES-------------------------------------//
      

    //creation d'un fichier et le met en fichier courant
      async createFile({state}, obj) {
        console.log("projectname : " + obj.projectname);
        console.log("content : " + obj.content);
        console.log("filename : " + obj.filename);
        console.log("userame : " + state.username);
        await service.createFile(state.username,obj);
      },

      async getFile({state, commit}, obj) {
        console.log("on getfile sur =>");
        console.log(obj);
        var p = obj.projectname;
        //username + projectname + filename
        await service.getFile(state.username, obj.projectname, obj.filename, obj.extension).then((res)=> {
          //commit du res de l'apelle au back de la route getfile dans current file et dans le tabs
          var obj = {
            "body" : res.data.body,
            "date" : res.data.date,
            "extension" : res.data.extension,
            "filename" : res.data.filename,
            "projectname" : p,
          }
          console.log("test ========");
          console.log(res.data);
          commit('ADD_CURRENTFILE_TO_TABS', obj);
        }); 
      },

      //on delet un file
      async deleteFile({state}, obj) {
        await service.deleteFile(state.username, obj.projectname,obj.filename/*, obj.extension*/);
      },

      //on save notre file dans la base de données il est tjrs en current 
      async saveFile({state}, obj) {
        await service.saveFile(state.username,obj);
      },   

      async execute({state}, obj) {
        await service.execute(state.username, obj);
      }
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