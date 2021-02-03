import FileService from "../../services/file-service";

/* ------------------------- FILE STATE ------------------------- */
const state = () => ({});

/* ------------------------- FILE GETTERS ------------------------- */
const getters = {}

/* ------------------------- FILE ACTIONS ------------------------- */
const actions = {

    async create({ dispatch }, { projectid, filename, extension }) {
        console.log("STORE CREATE FILE : " + filename + extension + " IN PROJECT: " + projectid);
        await FileService.create(projectid, filename, extension)
            .then(() => {
                dispatch("project/fetchProjects", null, { root: true });
            })
    },

    async rename({ dispatch }, { fileid, newfilename }) {
        console.log("STORE RENAME FILE : " + fileid + " INTO : " + newfilename);
        await FileService.rename(fileid, newfilename)
            .then(() => {
                dispatch("tab/updateTabFileName", { fileid, newfilename }, { root: true });
                dispatch("project/fetchProjects", null, { root: true });
            })
    },

    async remove({ dispatch }, fileid) {
        console.log("STORE REMOVE FILE : " + fileid);
        FileService.remove(fileid).then(async () => {
            dispatch("tab/closeTab", { tabId: fileid, force: true }, { root: true });
            dispatch("project/fetchProjects", null, { root: true });
        })
    },
}

/* ------------------------- FILE MUTATIONS ------------------------- */
const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
