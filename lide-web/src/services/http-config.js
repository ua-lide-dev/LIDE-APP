import axios from "axios";

export default axios.create({
  baseURL: "https://lide.leria-etud.univ-angers.fr:10000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
