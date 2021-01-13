import axios from "axios";

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
    if (!router) throw new Error('You must install Vue-Router and pass an instance as a parameter of the CAS call.')
    if (!axios) throw new Error('You must install Axios and Vue-Axios and pass an instance as a parameter of the CAS call.')

    const serverURL = process.env.VUE_APP_LIDE_WEB_URL;
    const serverCAS =  process.env.VUE_APP_CAS_URL;
    const serviceValidate =  process.env.VUE_APP_LIDE_BACK_URL + "session";
    const encoddedServerURL = encodeURIComponent(serverURL);

    router.beforeEach((to, from, next) => {
      // si redirection depuis le login cas
      if (to.fullPath.startsWith("/?ticket=")) {
        console.log("redirected from cas");
        let ticketCAS = to.query.ticket;

        // 1 - validate + enregistrement session
        axios.get(serviceValidate, { headers: { ticket: ticketCAS } }).then((res) => {
          console.log(res.data);
          // TODO set uniquement si valide
          localStorage.username = res.data.username;
          localStorage.session = res.data.session;
          // TODO !!!!! rediriger uniquement si username valide dans réponse
          // On redirige vers /app
          window.location = serverURL + "app";
        }).catch((error) => {
          // TODO  ERREUR ! _> On redirige vers /
          //window.location = serverURL;
          console.log(error);
        })

      }
      // si on tape sur /logout
      else if (to.fullPath.startsWith("/logout")) {
        localStorage.clear();
        console.log("redirect from logout");
        next({
          path: logout(),
          params: { nextUrl: to.fullPath }
        })
      }
      // si on tape sur /login
      else if (to.fullPath.startsWith("/login")) {
        console.log("redirect from login");
        next({
          path: login(),
          params: { nextUrl: to.fullPath }
        })
      }
      // Si on tape une url protégée
      else if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("protected url");

        // Si session
        // TODO vérif session
        if (localStorage.session != null && localStorage.username != "NOT_FOUND") {
          next();
        }
        // Si pas de session
        else {
          // TODO page erreur connexion connexion pécor
          window.location = serverURL + "login";
        }

      }
      // Si on tape pas une url protégée --> ok
      else {
        console.log("unportected url");
        next();
      }
    })

    const login = () => {
      let login = `${serverCAS}login?service=${encoddedServerURL}`;
      window.location = login;
    }

    const logout = () => {
      localStorage.removeItem('session');
      window.location = `${serverCAS}logout?service=${encoddedServerURL}`
    }

  },
}
