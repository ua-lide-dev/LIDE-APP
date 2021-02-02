import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// Modules
import user from "./modules/user"
import project from "./modules/project"
import file from "./modules/file"
import drawer from "./modules/drawer"
import execution from "./modules/execution"
import notification from "./modules/notification"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        project,
        file,
        drawer,
        execution,
        notification,
    },
    plugins: [createPersistedState()],
})

export default store;