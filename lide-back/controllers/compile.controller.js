const { exec, execSync } = require('child_process');

//demande de compil de la part de user

// POST -> récupère un fichier
exports.post = (req, res) => {
var user = req.headers.username; 
var file = req.body.filename; 
var path = req.body.projectpath; 

console.log(user);
console.log(file);
console.log(path);

//res.status(200).json(req.headers.username + req.body.filename + req.body.projectpath);

//recup de user : $username
//recup du path pour le fichier : $projetpath
//recup du fichier user : $filename

//lancement de la bonne image docker en fonction de l'extension 
//commande de run a passer a childprocess pour chaque user, pour l'image cpp
//run --rm -it --name cpp$USER -v /root/data/$USER/$FILE:/$FILE cpp $FILE
//pour les autres images on a juste a changer cpp par le nom du langage

//mkdir du nouveau dir
execSync('mkdir -p /data-lide/'+ user +'/' + path), (error, stdout, stderr) => {}

//creation du fichier
execSync('echo "#include<iostream>\n int main () {std::cout << 12 << std::endl; return 0;}" > /data-lide/'+ user +'/' + path + '/' +file), (error, stdout, stderr) => {}

//exec de docker 

const { spawn } = require("child_process");

//pour changer de langage on peut juste modifier le cpp en req.body.extends 
//docker run -i --name cppqmaignan --rm -v /data-lide/qmaignan/TP1/fichier.cpp:/fichier.cpp cpp fichier.cpp
const docker = spawn("docker", ["run","-i","--name cpp"+user,"--rm","-v /data-lide/"+user+"/"+path+"/"+file+":/"+file,"cpp",file]);

docker.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
  res.status(200).json(`${data}`);
  return;
});

docker.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
  res.status(201).json(`${data}`);
  return;
});

docker.on('error', (error) => {
  console.log(`error: ${error.message}`);
  res.status(202).json(`${error}`);
  return;
});

docker.on("close", code => {
  console.log(`child process exited with code ${code}`);
  return;
});

/*const { spawn } = require("child_process");
//pour changer de langage on peut juste modifier le cpp en req.body.extends 
const docker = spawn("docker", ["run","-i","--rm","hello-world"]);

docker.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
  res.status(200).json(`${data}`);
  return;
});

docker.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
  res.status(201).json(`${data}`);
  return;
});

docker.on('error', (error) => {
  console.log(`error: ${error.message}`);
  res.status(202).json(`${error}`);
  return;
});

docker.on("close", code => {
  console.log(`child process exited with code ${code}`);
  return;
});*/
};