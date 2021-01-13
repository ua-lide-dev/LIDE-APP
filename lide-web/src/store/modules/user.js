
const state = () => ({
    username: "",
});

const getters = {
    username (state)  {
        return state.username;
    }
}

const actions = {
    setUsername({commit}, username){
        commit('SET_USERNAME', username)
    }
}

const mutations = {
    SET_USERNAME(state, username){
        state.username = username;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}