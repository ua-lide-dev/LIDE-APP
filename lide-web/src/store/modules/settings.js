
const state = () => ({
    darkMode: false,
    indentation: 4,
    theme: "base16-dark",
    terminalTheme: "#ffffff",
    themes: [
        "default",
        "3024-day",
        "3024-night",
        "abcdef",
        "ambiance",
        "ayu-dark",
        "ayu-mirage",
        "base16-dark",
        "base16-light",
        "bespin",
        "blackboard",
        "cobalt",
        "colorforth",
        "darcula",
        "dracula",
        "duotone-dark",
        "duotone-light",
        "eclipse",
        "elegant",
        "erlang-dark",
        "gruvbox-dark",
        "hopscotch",
        "icecoder",
        "idea",
        "isotope",
        "lesser-dark",
        "liquibyte",
        "lucario",
        "material",
        "material-darker",
        "material-palenight",
        "material-ocean",
        "mbo",
        "mdn-like",
        "midnight",
        "monokai",
        "moxer",
        "neat",
        "neo",
        "night",
        "nord",
        "oceanic-next",
        "panda-syntax",
        "paraiso-dark",
        "paraiso-light",
        "pastel-on-dark",
        "railscasts",
        "rubyblue",
        "seti",
        "shadowfox",
        "solarized dark",
        "solarized light",
        "the-matrix",
        "tomorrow-night-bright",
        "tomorrow-night-eighties",
        "ttcn",
        "twilight",
        "vibrant-ink",
        "xq-dark",
        "xq-light",
        "yeti",
        "yonce",
        "zenburn",
    ],
});

const getters = {
    darkMode(state) {
        return state.darkMode;
    },
    indentation(state) {
        return state.indentation;
    },
    theme(state) {
        return state.theme;
    },
    terminalTheme(state) {
        return state.terminalTheme;
    }
}

const actions = {
    setDarkMode({ commit }, darkMode) {
        commit('SET_DARKMODE', darkMode);
    },
    setTheme({ commit }, theme) {
        commit('SET_THEME', theme);
    },
    setIndentation({ commit }, indentation) {
        commit('SET_INDENTATION', indentation);
    },
    setTerminalTheme({commit}, theme) {
        commit('SET_TERMINAL_THEME', theme);
    }
}

const mutations = {
    SET_DARKMODE(state, darkMode) {
        state.darkMode = darkMode;
    },
    SET_THEME(state, theme) {
        state.theme = theme;
    },
    SET_INDENTATION(state, indentation) {
        state.indentation = indentation;
    },
    SET_TERMINAL_THEME(state, theme) {
        state.terminalTheme = theme;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}