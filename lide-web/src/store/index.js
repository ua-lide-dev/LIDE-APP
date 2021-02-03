import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// Modules
import user from "./modules/user"
import project from "./modules/project"
import drawer from "./modules/drawer"
import execution from "./modules/execution"
import file from "./modules/file"
import tab from "./modules/tab"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        project,
        drawer,
        execution,
        file,
        tab,
    },
    plugins: [createPersistedState()],
})

export default store;