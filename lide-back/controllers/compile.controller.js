const {execSync} = require('child_process');

//demande de compil de la part de user

// POST -> récupère un fichier
exports.post = (req, res) => {

var user = req.headers.username; 
var file = req.body.filename;
var ext = req.body.ext; 
var path = req.body.projectpath; 

console.log(user);
console.log(file);
console.log(ext);
console.log(path);

//mkdir du nouveau dir
execSync('mkdir -p /data-lide/'+ user +'/' + path);

//creation du fichier
execSync('echo "#include<iostream>\n int main () {std::cout << 12 << std::endl; return 0;}" > /data-lide/'+ user +'/' + path + '/' +file);

//exec de docker 

//pour changer de langage on peut juste modifier le ext en req.body.ext 
//docker run -i --name cppqmaignan --rm -v /data-lide/qmaignan/TP1/fichier.cpp:/fichier.cpp cpp fichier.cpp : exemple de docker run
execSync("docker run -i --rm --name "+user+" -v /data-lide/"+user+"/"+path+"/"+file+"."+ext+" "+ ext+" "+file+"."+ext);
execSync("docker inspect --format='{{.Id}}'"+ user);
};