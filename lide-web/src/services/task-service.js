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
  console.log("username dans les routes fronts getProjects : " + username);
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/projects");
  request.setRequestHeader("username", username);
  return request.send();
}

//data est un obj avec un champ projectname  et username
function createProject(projectname, username) {
  console.log("username et project name dans les routes fronts createProject : " + username +" ,"+ projectname);
  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/createProject");
  request.setRequestHeader("username", username);
  return request.send({projectname : projectname});
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
  saveFile,
  createUser
};
