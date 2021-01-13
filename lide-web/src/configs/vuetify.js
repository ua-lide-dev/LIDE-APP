import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2455b6",
        secondary: "#616161",
        accent: "#8c9eff",
        error: "#b71c1c",
        body: "#f3f2f7",
        tabs: "#151515",
      },
    },
  },
});
