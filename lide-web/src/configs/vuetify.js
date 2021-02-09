import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2455b6",
        secondary: "#616161",
        error: "#b71c1c",
        body: "#151515",
        bodysecondary: '#F5F5F5',
        appbar: "#2455b6"
      },
      dark: {
        body: "#151515",
        bodysecondary: '#363636',
        appbar: "#2455b6"
      }
    },
  },
});
