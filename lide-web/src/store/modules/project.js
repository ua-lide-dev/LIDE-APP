import UserService from "../../services/user-service";
import ProjectService from "../../services/project-service";

/* ------------------------- PROJECT STATE ------------------------- */
const state = () => ({
    projects: [],
    currentProjectId: "",
});

/* ------------------------- PROJECT GETTERS ------------------------- */
const getters = {
    projects(state) {
        return state.projects;
    },
    currentProjectId(state) {
        return state.currentProjectId;
    },
};

/* ------------------------- PROJECT ACTIONS ------------------------- */
const actions = {
    async fetchProjects({ commit }) {
        await UserService.getUserProjects()
            .then((res) => {
                commit("SET_PROJECTS", res.data);
            })
    },

    async create({ dispatch }, projectname) {
        await ProjectService.create(projectname)
            .then(() => {
                dispatch('fetchProjects');
            })
    },

    async remove({ dispatch }, projectid) {
        await ProjectService.remove(projectid)
            .then(() => {
                dispatch('fetchProjects');
            })
    },

    async rename({ dispatch }, { projectid, newprojectname }) {
        await ProjectService.rename(projectid, newprojectname)
            .then(() => {
                dispatch('fetchProjects');
            })
    },

    async setCurrentProjectId({ commit }, projectid) {
        commit("SET_CURRENT_PROJECT_ID", projectid);
    },
};

/* ------------------------- PROJECT MUTATIONS ------------------------- */
const mutations = {
    SET_PROJECTS(state, projects) {
        state.projects = projects;
    },
    SET_CURRENT_PROJECT_ID(state, projectid) {
        state.currentProjectId = projectid;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
