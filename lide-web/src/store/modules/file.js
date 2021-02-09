import FileService from "../../services/file-service";

/* ------------------------- FILE STATE ------------------------- */
const state = () => ({});

/* ------------------------- FILE GETTERS ------------------------- */
const getters = {}

/* ------------------------- FILE ACTIONS ------------------------- */
const actions = {

    async create({ dispatch }, { projectid, filename, extension }) {
        const fileId = await FileService.create(projectid, filename, extension)
            .then((res) => {
                const file = res.data;
                dispatch("project/fetchProjects", null, { root: true });
                return file._id;
            })
        return fileId;
    },

    async rename({ dispatch }, { fileid, newfilename }) {
        await FileService.rename(fileid, newfilename)
            .then(() => {
                dispatch("tab/updateTabFileName", { tabId: fileid, newfilename: newfilename }, { root: true });
                dispatch("project/fetchProjects", null, { root: true });
            })
    },

    async remove({ dispatch }, fileid) {
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
