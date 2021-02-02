

const state = () => ({
    actif: false,
    texte : "Notification de base",
    couleur : "green",
    timeout : 2000,
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
    timout(state) {
        return state.timeout;
    },
}

const actions = {
    async displayNotif({commit}){
        commit('SET_ACTIF', true);
    },
    closeNotif({commit}){
        commit('SET_ACTIF', false);
    },
    setTexte({commit},texte){
        commit('SET_TEXTE', texte);
    },
    setCouleur({commit},couleur){
        commit('SET_COULEUR', couleur);
    },
    setTimeout({commit},timeout){
        commit('SET_TIMEOUT', timeout);
    },
}

const mutations = {
    SET_ACTIF(state, actif){
        state.actif = actif;
        if(actif){
            setTimeout(() => { state.actif = false }, state.timeout);
        }
    },
    SET_TEXTE(state, texte){
        state.texte = texte;
    },
    SET_COULEUR(state, couleur){
        state.couleur = couleur;
    },
    SET_TIMEOUT(state, timeout){
        state.timeout = timeout;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
  