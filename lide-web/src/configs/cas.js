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
    const serverCAS = process.env.VUE_APP_CAS_URL;
    const encoddedServerURL = encodeURIComponent(serverURL);

    router.beforeEach((to, from, next) => {
      // si redirection depuis le login cas
      if (to.fullPath.startsWith("/?ticket=")) {
        console.log("redirected from cas");
        let ticketCAS = to.query.ticket;

        // 1 - validatation ticket cas + enregistrement session
        axios.get("session", { headers: { ticket: ticketCAS } }).then((res) => {
          console.log(res.data); //TODO a suppr

          localStorage.username = res.data.username;

          // Set du token de session
          localStorage.session = res.data.session;

          // On redirige vers /app
          window.location = "/app"; //TODO : .next();
        }).catch((error) => {
          console.log(error);
          login();
        })
      }
      // si on tape sur /logout
      else if (to.fullPath.startsWith("/logout")) {
        // localStorage.clear();
        // console.log("redirect from logout");
        // next({
        //   path: logout(),
        //   params: { nextUrl: to.fullPath }
        // })
        logout();
      }
      // si on tape sur /login
      else if (to.fullPath.startsWith("/login")) {
        console.log("redirect from login");
        // next({
        //   path: login(),
        //   params: { nextUrl: to.fullPath }
        // })
        login();
      }
      // Si on tape une url protégée
      else if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("protected url");
        // Si session
        // TODO vérif session
        if (localStorage.session != null) {
          axios.get("validateSession").then(async (res) => {
            //Initialisation ou création de l'utilisateur 
            await axios.get("user");
            next();
          }).catch((error) => {
            login();
            console.log(error);
          })
        }
        // Si pas de session
        else {
          login();
        }
      }
      // Si on tape pas une url non protégée --> ok
      else {
        next();
      }
    })

    const login = () => {
      let login = `${serverCAS}login?service=${encoddedServerURL}`;
      window.location = login;
    }

    const logout = () => {
      localStorage.clear();
      window.location = `${serverCAS}logout?service=${encoddedServerURL}`
    }

  },
}