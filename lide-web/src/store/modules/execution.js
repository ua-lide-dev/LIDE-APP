
const state = () => ({
    executionInProgress: false,
});

const getters = {
    executionInProgress(state) {
        return state.executionInProgress;
    },
}

const actions = {
    async setExecutionInProgress({ state }, executionInProgress) {
        console.log("STORE ACTION EXECINPROGRESS = " + executionInProgress);
        state.executionInProgress = executionInProgress;
    }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}