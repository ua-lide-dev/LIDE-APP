
const state = () => ({
    settingDrawer: false,
    helpDrawer: false,
});

const getters = {
    settingDrawer(state) {
        return state.settingDrawer;
    },
    helpDrawer(state) {
        return state.helpDrawer;
    }
}

const actions = {
    openSettingDrawer({commit}){
        commit('SET_SETTING_DRAWER', true);
        commit('SET_HELP_DRAWER', false);
    },
    closeSettingDrawer({commit}){
        commit('SET_SETTING_DRAWER', false);
    },
    openHelpDrawer({commit}){
        commit('SET_HELP_DRAWER', true);
        commit('SET_SETTING_DRAWER', false);
    },
    closeHelpDrawer({commit}){
        commit('SET_HELP_DRAWER', false);
    }
}

const mutations = {
    SET_SETTING_DRAWER(state, settingDrawer){
        state.settingDrawer = settingDrawer;
    },
    SET_HELP_DRAWER(state, helpDrawer){
        state.helpDrawer = helpDrawer;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}