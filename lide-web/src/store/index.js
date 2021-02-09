import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// Modules
import user from "./modules/user"
import project from "./modules/project"
import drawer from "./modules/drawer"
import execution from "./modules/execution"
import notification from "./modules/notification"
import file from "./modules/file"
import tab from "./modules/tab"
import settings from "./modules/settings"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        project,
        drawer,
        execution,
        notification,
        file,
        tab,
        settings,
    },
    plugins: [createPersistedState()],
})

export default store;