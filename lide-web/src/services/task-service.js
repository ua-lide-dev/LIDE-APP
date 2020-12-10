import http from "./http-config";
/* 
    Ensemble des requettes HTTP CRUD vers le BACK
    http est configuré dans le fichier http-config
*/

/// Users
function createUser(username) {
  console.log("username dans les routes fronts create user : " + username);
  const request = new XMLHttpRequest();
  request.open("POST", "https://lide.leria-etud.univ-angers.fr:10000/user");
  request.setRequestHeader("username", username);
  return request.send();
}

/// Projects
function getProjects(username) {
  console.log("username dans les routes fronts projects : " + username);
  return http.get("/projects", { headers: { username: username } });
}

//data est un obj avec un champ projectname  et username
function createProject(projectname, username) {
  const data = {
    projectname: projectname,
  };
  return http.post("/createProject", data, { headers: { username: username } });
}

function renameProject(username, projectpath, data) {
  http.setHeader("username", username);
  http.write('{"projectpath":' + projectpath + "}");

  return http.put("/renameProject", data);
}

function deleteProject(username, projectname) {
  const data = {
    projectname: projectname,
  };
  return http.post("/deleteProject", data, { headers: { username: username }});
}

/// Files

function createFile(username, file) {
  const data = {
    projectname: file.projectname,
    content: file.content,
    filename: file.filename,
    extension: file.extension,
  };
  return http.post("/createFile", data, { headers: { username: username } });
}

function getFile(username, projectname, filename, extension) {
  const data = {
    projectname: projectname,
    filename: filename,
    extension: extension,
  };
  console.log("taskService getFile =>");
  console.log(data);
  console.log("username : " + username);
  return http.post("/getFile", data, { headers: { username: username } });
}

function updateFile(username, projectpath, filename, data) {
  http.setHeader("username", username);
  http.write('{"projectpath":' + projectpath + ',"filename":' + filename + "}");

  return http.put("/updateFile", data);
}

function deleteFile(username, projectname, filename) {
  const data = {
    projectname: projectname,
    filename: filename,
  };
  return http.post("/deleteFile", data, { headers: { username: username } });
}

function saveFile(username, file) {
  /*const file = {
    projectname: file.projectname,
    content: file.content,
    filename: file.filename,
    extension: file.extension,
  };*/
  console.log("file dans save file =>");
  console.log(file);
  return http.post("/save", file, { headers: { username: username } });
}

function execute(username, file){
  //return lid du conteneur a attacher
  console.log("file execute");
  console.log(file);
  return http.post("/execute", file, { headers: { username: username } });
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
  execute,
};
