import http from "./http-config";
/* 
    Ensemble des requettes HTTP CRUD vers le BACK
    http est configuré dans le fichier http-config
*/


/// Projects

function getProjects(username) {
  http.setHeader("username", username)

  return http.get("/getProjects");
}

function createProject(username, data) {
  http.setHeader("username", username)

  return http.post("/createProject", data);
}

function renameProject(username, projectpath, data) {
  http.setHeader("username", username)
  http.write("{\"projectpath\":"+ projectpath +"}");

  return http.put("/renameProject", data);
}

function deleteProject(username, projectpath) {
  http.setHeader("username", username)
  http.write("{\"projectpath\":"+ projectpath +"}");

  return http.delete("/deleteProject");
}

/// Files

function createFile(username, projectpath, data) {
  http.setHeader("username", username)
  http.write("{\"projectpath\":"+ projectpath +"}");

  return http.post("/createFile", data);
}

function updateFile(username, projectpath, filename, data) {
  http.setHeader("username", username)
  http.write("{\"projectpath\":" + projectpath + ",\"filename\":" + filename + "}");

  return http.put("/updateFile", data);
}

function deleteFile(username, projectpath, filename) {
  http.setHeader("username", username)
  http.write("{\"projectpath\":" + projectpath + ",\"filename\":" + filename + "}");

  return http.delete("/deleteFile");
}

function saveFile(username, projectpath, filename, data) {
  http.setHeader("username", username)
  http.write("{\"projectpath\":" + projectpath + ",\"filename\":" + filename + "}");

  return http.delete("/saveFile", data);
}


export default {
  getProjects,
  createProject,
  renameProject,
  deleteProject,
  createFile,
  updateFile,
  deleteFile,
  saveFile
};
