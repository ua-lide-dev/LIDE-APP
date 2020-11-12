import http from "./http-config";
/* 
    Ensemble des requettes HTTP CRUD vers le BACK
    http est configuré dans le fichier http-config
*/


/// Projects

function getProjects(idUser) {
  return http.get("/user/" + idUser + "/project");
}

function createProject(idUser, data) {
  return http.post("/user/" + idUser + "/project", data);
}

function renameProject(idUser, idProject, data) {
  return http.put("/user/" + idUser + "/project/" + idProject, data);
}

function deleteProject(idUser, idProject) {
  if(idProject != "" && idProject != null)
  {
    return http.delete("/user/" + idUser + "/project/" + idProject);
  }
}

/// Files

function createFile(idUser, idProject, data) {
  return http.post("/user/" + idUser + "/project/" + idProject, data);
}

function updateFile(idUser, idProject, idFile, data) {
  return http.put("/user/" + idUser + "/project/" + idProject + "/file/" + idFile, data);
}

function deleteFile(idUser, idProject, idFile) {
  if(idFile != "" && idFile != null)
  {
    return http.delete("/user/" + idUser + "/project/" + idProject + "/file/" + idFile);
  }
}

function saveFile(idFile, data) {
  return http.delete("/save/file/" + idFile, data);
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
