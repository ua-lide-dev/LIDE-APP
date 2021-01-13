import axios from "../configs/axios-config";

function get() {
  return axios.get('/user');
}

function getUserProjects() {
  return axios.get("/user/projects");
}

export default {
  get,
  getUserProjects,
};
