import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_LIDE_BACK_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
});

// intercepte les requêtes pour alimenter les headers
http.interceptors.request.use((config) => {
  if (localStorage.username != null) {
    config.headers.username = localStorage.username;
  }
  if (localStorage.session != null) {
    config.headers.session = localStorage.session;
  }
  return config
}, (err) => {
  console.log(err)
  return Promise.reject(err)
})

/** Interceptor de réponse */
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Si non authentifié par l'API
    if (error.response.status == 401)
      window.location = "/login"
    else {
      console.err("ERROR CATCHED FROM BACKEND API");
      console.err(error);
    }
    return Promise.reject(error);
  }
);

export default http;