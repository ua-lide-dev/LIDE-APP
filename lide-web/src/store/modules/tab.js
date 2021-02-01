import FileService from "@/services/file-service";

const state = {
    tabs: [],
    currentTab: null,
};

const getters = {
    tabs(state) {
        return state.tabs;
    },
    currentTab(state) {
        return state.currentTab;
    },
    currentTabIndex(state) {
        return state.currentTabIndex;
    }
}

const actions = {

    async newTab({ commit }, fileId) {
        console.log(`STORE -- OPEN TAB -- TAB=${fileId}`);
        await FileService.get(fileId)
            .catch((err) => { console.error(err); })
            .then((res) => {
                const file = res.data;
                const tab = {
                    id: file._id,
                    oldContent: file.content,
                    file: file,
                };
                commit("ADD_TAB", tab);
                commit("SET_CURRENT_TAB", tab)
            })
    },

    async getTab({ state }, tabId) {
        const tab = state.tabs.find((tab) => (tab.id == tabId))
        return tab;
    },

    async closeTab({ dispatch, commit }, { tabId, force }) {
        console.log(`STORE -- CLOSE TAB -- TAB=${tabId}`);
        const tab = await dispatch("getTab", tabId);
        if (tab != null) {
            if (tab.file.content != tab.file.oldContent && force != true) throw new Error("FILE_NOT_SAVED");
            else commit("CLOSE_TAB", tabId);
        }
    },

}

const mutations = {
    ADD_TAB(state, newTab) {
        if (state.tabs.find((tab) => (tab._id == newTab._id)) == null) {
            state.tabs.push(newTab)
        }
    },
    CLOSE_TAB(state, tabToRemove) {
        state.tabs = state.tabs.filter((tab) => {
            return tab.id != tabToRemove.id;
        });
    },
    SET_CURRENT_TAB(state, currentTab) {
        state.currentTab = currentTab;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
