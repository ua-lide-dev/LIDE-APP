const File = require("../models/file");
const Project = require("../models/project");
const { exec, execSync } = require('child_process');

//demande de compil de la part de user

// GET -> récupère un fichier
exports.get = (req, res) => {

  File.findOne({ // Fonction predefinie Mangoose
    _id: req.params.idFile,
  })

//recup de user : $username
//recup du path pour le fichier : $projetpath
//recup du fichier user : $file_name

//lancement de la bonne image docker en fonction de l'extension 
//commande de run a passer a childprocess pour chaque user, pour l'image cpp
//run --rm -it --name cpp$USER -v /root/data/$USER/$FILE:/$FILE cpp $FILE
//pour les autres images on a juste a changer cpp par le nom du langage

//mkdir du nouveau dir
execSync('mkdir /data-lide/jeSuisUnUser/projectPath/'), (error, stdout, stderr) => {}

//creation du fichier
execSync('echo "#include<iosteam> int maint () {std::cout << 12 << std::endl; return 0;}" > /data-lide/jeSuisUnUser/projectPath/file_name.cpp'), (error, stdout, stderr) => {}

//exec de docker 

//les docker name seront toujours nommé avec username 
execSync('docker run --rm -it --name ' + req.header.username + '$username -v /data-lide/' + req.header.username + '/' + req.body.projectpath 
    + '/' + req.body.file_name + ':/' + req.body.file_name + ' ' + req.body.file_name, 
    (error, stdout, stderr) => {
  
  if(error){
    //echec de la ligne compilation
    console.error(`exec error: ${error}`);
    res.status(400).json(error);
    return;
  }

  //envoi de la compilation
  if(stdout){
    console.log(`stdout: ${stdout}`);
    res.status(200).json(stdout);
    return;
  }
  
  //envoi des erreurs de compilation
  if(stderr){
    console.error(`stderr: ${stderr}`);
    res.status(200).json(error);
    return;
  }

});
};