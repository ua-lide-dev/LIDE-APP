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
    async newTab({ state, commit, dispatch }, fileId) {
        const tab = state.tabs.find((tab) => tab.id == fileId);
        // si rechargement de la page, on ne souhaite pas récupérer le fichier depuis la bdd (évite de perdre le travail en cours)
        if (tab == null) {
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
        } else dispatch("focusTab", tab);
    },

    /** 
     * Sauvegarde le fichier associé à un onglet
    */
    async saveTab({ state }, tab) {
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
    async focusTab({ commit }, tab) {
        commit("SET_CURRENT_TAB", tab);
    },

    /**
     * Ferme un onglet selon son id
     */
    async closeTab({ state, commit }, tab) {
        commit("SET_CURRENT_TAB_BEFORE_CLOSE", tab);
        commit("CLOSE_TAB", tab);
        commit("SET_CURRENT_TAB", state.currentTab);
    },

    /**
     * Modifier le nom du fichier de l'onglet
     * Appelée après le renommage d'un fichier
     */
    async updateTabFileName({ dispatch }, { tab, newfilename }) {
        tab.file.filename = newfilename;
    },

    /**
     * Pour une tab, renseigne son editeur associé (ref) 
     */
    async setEditor({ commit }, { tab, cmEditor }) {
        commit("SET_TAB_EDITOR", { tab, cmEditor });
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
    CLOSE_TAB(state, tabToRemove) {
        state.tabs = state.tabs.filter((tab) => {
            return tab.id != tabToRemove.id;
        });
    },
    SET_CURRENT_TAB_BEFORE_CLOSE(state, tabToRemove) {
        if (tabToRemove.id == state.currentTab.id) {
            if (state.tabs.length > 1) {
                for (let i = 0; i < state.tabs.length; i++) {
                    if (state.tabs[i].id == tabToRemove.id) {
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
