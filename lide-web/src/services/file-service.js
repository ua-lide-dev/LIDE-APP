import axios from "../configs/axios-config";

function get(fileid) {
  return axios.get(`/file/${fileid}`);
}

function create(projectid, filename, extension) {
  const data = {
    projectid: projectid,
    filename: filename,
    extension: extension,
  };
  return axios.post("/file", data);
}

function remove(fileid) {
  return axios.delete(`/file/${fileid}`);
}

function rename(fileid, newfilename) {
  const data = {
    newfilename: newfilename,
  };
  return axios.put(`/file/${fileid}?rename=true`, data);
}

function save(fileid, content) {
  const data = {
    content: content,
  };
  return axios.put(`/file/${fileid}?save=true`, data);
}

function execute(fileid) {
  return axios.post(`/execute/${fileid}`);
}

export default {
  get,
  create,
  remove,
  rename,
  save,
  execute,
};
