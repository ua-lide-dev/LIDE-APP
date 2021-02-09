import FileService from "@/services/file-service";

/* Important : L'id de la tab est l'id de son fichier */

const state = {
    // La liste des onglets ouverts
    tabs: [],
    // L'onglet ouvert
    currentTab: null,
};

const getters = {
    tabs(state) {
        return state.tabs;
    },
    currentTab(state) {
        return state.currentTab;
    },
}

const actions = {

    /**
    * Ouvre un onglet selon son id en définissant l'onglet courant
    */
    async newTab({ state, commit }, fileId) {
        console.log(`STORE -- OPEN TAB -- TAB=${fileId}`);
        // si rechargement de la page, on ne souhaite pas récupérer le fichier depuis la bdd (évite de perdre le travail en cours)
        if (state.tabs.find((tab) => tab.id == fileId) == null) {
            // sinon on récupère le fichier en bdd
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
        }
    },

    /** 
     * Sauvegarde le fichier associé à un onglet
    */
    async saveTab(store, tab) {
        console.log("STORE SAVE TAB : " + tab.id);
        await FileService.save(tab.file._id, tab.file.content)
            .then(tab.oldContent = tab.file.content);
    },

    /**
     * Retourne un onglet selon son id en définissant l'onglet courant
     */
    async getTab({ state }, tabId) {
        const tab = state.tabs.find((tab) => (tab.id == tabId))
        return tab;
    },

    /**
     * Focus un onglet selon son id puis on redéfinit l'onglet courant
     */
    async focusTab({ dispatch, commit }, tabId) {
        console.log(`STORE -- FOCUS TAB -- TAB=${tabId}`);
        await dispatch("getTab", tabId)
            .catch((err) => console.error(err))
            .then((tab) => commit("SET_CURRENT_TAB", tab));
    },

    /**
     * Ferme un onglet selon son id
     */
    async closeTab({ state, dispatch, commit }, tabId) {
        console.log(`STORE -- CLOSE TAB -- TAB=${tabId}`);
        const tab = await dispatch("getTab", tabId);
        if (tab != null) {
            commit("SET_CURRENT_TAB_BEFORE_CLOSE", tabId);
            commit("CLOSE_TAB", tabId);
            commit("SET_CURRENT_TAB", state.currentTab)
        }
    },

    /**
     * Modifier le nom du fichier de l'onglet
     * Appelée après le renommage d'un fichier
     */
    async updateTabFileName({ dispatch }, { tabId, newfilename }) {
        const tab = await dispatch("getTab", tabId);
        if (tab != null) tab.file.filename = newfilename;
    },

    /**
     * Pour une tab, renseigne son editeur associé (ref) 
     */
    async setEditor({ dispatch, commit }, { tabId, cmEditor }) {
        console.log(`STORE -- SET EDITOR -- TAB=${tabId} CMEDITOR=${cmEditor}`);
        const tab = await dispatch("getTab", tabId);
        if (tab != null) commit("SET_TAB_EDITOR", { tab, cmEditor })
    },

    setNewContent({ commit }, { tab, newContent }) {
        commit("SET_NEW_CODE", { tab: tab, newContent: newContent });
    },

}

const mutations = {
    ADD_TAB(state, newTab) {
        if (state.tabs.find((tab) => (tab.id == newTab.id)) == null) {
            state.tabs.push(newTab)
        }
    },
    CLOSE_TAB(state, tabToRemoveId) {
        state.tabs = state.tabs.filter((tab) => {
            return tab.id != tabToRemoveId;
        });
    },
    SET_CURRENT_TAB_BEFORE_CLOSE(state, tabToRemoveId) {
        if (tabToRemoveId == state.currentTab.id) {
            if (state.tabs.length > 1) {
                for (let i = 0; i < state.tabs.length; i++) {
                    if (state.tabs[i].id == tabToRemoveId) {
                        if (i > 0) state.currentTab = state.tabs[i - 1];
                        else state.currentTab = state.tabs[i + 1];
                    }
                }
            } else state.currentTab = null;
        }
    },
    SET_CURRENT_TAB(state, currentTab) {
        state.currentTab = currentTab;
    },
    SET_TAB_EDITOR(state, { tab, cmEditor }) {
        tab.cmEditor = cmEditor;
    },
    SET_NEW_CODE(state, { tab, newContent }) {
        tab.file.content = newContent;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
