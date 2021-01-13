import axios from "../configs/axios-config";

function get(projectid) {
  return axios.get(`/project/${projectid}`);
}

function create(projectname) {
  const data = {
    projectname: projectname,
  };
  return axios.post("/project", data);
}

function remove(projectid) {
  return axios.delete(`/project/${projectid}`);
}

function rename(projectid, newprojectname) {
  const data = {
    newprojectname: newprojectname,
  };
  return axios.put(`/project/${projectid}?rename=true`, data);
}

export default {
  get,
  create,
  remove,
  rename,
};
