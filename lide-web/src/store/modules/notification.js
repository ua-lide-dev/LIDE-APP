
const state = () => ({
    actif: false,
    texte: "Notification de base",
    couleur: "success",
});

const getters = {
    actif(state) {
        return state.actif;
    },
    texte(state) {
        return state.texte;
    },
    couleur(state) {
        return state.couleur;
    },
}

const actions = {
    notif({ commit }, { texte, couleur }) {
        commit('SET_TEXTE', texte);
        commit('SET_COULEUR', couleur);
        commit('SET_ACTIF', true);
    },
    closeNotif({ commit }) {
        commit('SET_ACTIF', false);
    },
    setTexte({ commit }, texte) {
        commit('SET_TEXTE', texte);
    },
    setCouleur({ commit }, couleur) {
        commit('SET_COULEUR', couleur);
    },
}

const mutations = {
    SET_ACTIF(state, actif) {
        state.actif = actif;
    },
    SET_TEXTE(state, texte) {
        state.texte = texte;
    },
    SET_COULEUR(state, couleur) {
        state.couleur = couleur;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
