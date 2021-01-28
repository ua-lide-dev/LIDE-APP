import axios from "./axios-config";

export default {
  /**
   *
   * @param vue {Object} - Vue instance.
   * @param router {Object} - VueJS Router instance; Init the router with the logout URL, cf. documentation.
   * @param axios {Object} - Axios instance; Init this instance and add this to vue initialization.
   * @param options.serverURL {String} - URL of web server
   * @param options.serverCAS {String} - URL of CAS server
   */
  install(vue, router) {
    const serverURL = process.env.VUE_APP_LIDE_WEB_URL;

    router.beforeEach(async (to, from, next) => {
      // route protégée
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.session != null) {  // TODO : validate session
          // si identifié via login
          next();
        } else {
          // si pas identifié
          login();
        }
      } else if (to.fullPath.startsWith("/login")) {
        // on nettoie la dernière session
        localStorage.clear();

        // bouchon username sans cas
        localStorage.username = "user1";

        // récupération de la session
        await axios.get("/session").then(async (res) => {
          localStorage.session = res.data.session;
          // register
          await axios.get("/user");
          // redirect
          window.location = serverURL + "app";
        }).catch((error) => {
          window.location = serverURL;
          throw error;
        })

      } else if (to.fullPath.startsWith("/logout")) {
        // clear du local storage
        logout();
      }
      else {
        // Si on tape pas une url protégée --> ok
        next();
      }
    });

    const login = () => {
      window.location = serverURL + "login";
    };

    const logout = () => {
      localStorage.clear();
      window.location = serverURL;
    };
  },
};