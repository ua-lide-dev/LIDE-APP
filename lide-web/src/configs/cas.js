import axios from "axios";
import http from "../services/http-config";
export default {

  install(vue, router) {
 
    if (!router)
      throw new Error(
        "You must install Vue-Router and pass an instance as a parameter of the CAS call."
      );
    if (!axios)
      throw new Error(
        "You must install Axios and Vue-Axios and pass an instance as a parameter of the CAS call."
      );
    
    // variabiliser l'url du front
    const serverURL = process.env.VUE_APP_LIDE_WEB_URL;
    // variabiliser l'url du back
    const serverCAS =  process.env.VUE_APP_CAS_URL;
    // encodage de l'url du front
    const encoddedServerURL = encodeURIComponent(serverURL);

    router.beforeEach((to) => {
      //si on clique sur le bouton connexion du front, rediriger vers /login
      if (to.fullPath.startsWith("/cas")) {
        // envoie vers la page de connexion du cas
        login();
   
      }
      
      //else  if (to.fullPath.startsWith("/")) {
        
       /// window.location="/";

      //}
   
      // TODO si on clique sur le bouton déconnexion du front, rediriger vers /logout
      else if (to.fullPath.startsWith("/logout")) {
        // TODO code de déconnexion (nettoyage de la session)
        // TODO puis envoie vers la page de déconnexion du cas
        localStorage.clear();
        logout();

      }
      // suite a une redirection depuis le cas, on aura un ticket dans l'url
      else if (to.fullPath.startsWith("/?ticket=")) {
   
        // TODO appel axios au service de validation du cas à l'aide du ticket
        // TODO si la validation a fonctionné --> redirection vers /app
        // TODO si la validation n'a pas fonctionné --> page erreur 
       
        let ticket = to.query.ticket
        const validateURL = forgeValidate(ticket)

        http.get("/cas",{headers: { validateURL: validateURL}}).then((response)=>{
          const username = response.data.username;
          const session = response.data.session;
          localStorage.setItem("username", username);
          localStorage.setItem("session", session);
          window.location = "/app";
          
        });
      
      }
  
      // TODO url protégée
      else if (to.matched.some((record) => record.meta.requiresAuth)) {
        // TODO vérifier la session
        // TODO si session valide redirection vers la suite --> next()
        // TODO si session non valide redirection vers page d'erreur
      }     /*else {
        // TODO gestion des autres autres routes
        // TODO validation de la session
      }
      */
    });
    
    // forge l'url de login et redirige
    const login = () => {
        window.location = `${serverCAS}login?service=${encoddedServerURL}`;
       
    }

    // forge l'url de logout et redirige
    const logout = () => {
        window.location = `${serverCAS}logout?service=${encoddedServerURL}`
    }

    // forge l'url de validation
    function forgeValidate(ticket) {
     let validateURL = `${serverCAS}serviceValidate?format=JSON&service=${encoddedServerURL}&ticket=${ticket}`;
      return validateURL;
    }  
  
  },
};