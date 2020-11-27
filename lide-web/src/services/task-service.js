import http from "./http-config";
/* 
    Ensemble des requettes HTTP CRUD vers le BACK
    http est configuré dans le fichier http-config
*/

/// Users
function createUser(username){
  console.log("username dans les routes fronts create user : " + username);
  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/user");
  request.setRequestHeader("username", username);
  return request.send();
}

/// Projects
function getProjects(username) {
  console.log("username dans les routes fronts projects : " + username);
  return http.get("/projects", {headers:{username:username}});
}

//data est un obj avec un champ projectname  et username
function createProject(projectname, username) {
  const data = {
    projectname : projectname,
  }
  return http.post("/createProject", data, {headers:{username:username}});
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

function createFile(username, file) {
  const data = {
    projectname : file.projectname,
    content: file.content,
    filename: file.filename,
    extension: file.extension
  }
  return http.post("/createFile", data, {headers:{username:username}})
}

function getFile(username, projectname, filename) {
  const data = {
    projectname : projectname,
    filename: filename
  }
  return http.post("/createFile", data, {headers:{username:username}})
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
  saveFile,
  getFile,
  createUser, 
};
