import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_LIDE_BACK_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
});

/** Interceptor de requête */
http.interceptors.request.use((config) => {
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
      console.error("ERROR CATCHED FROM BACKEND API");
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export default http;