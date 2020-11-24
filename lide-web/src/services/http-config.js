import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  header: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
    "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method",
    "Access-Control-Allow-Credentials":"true"
  },
});
