const File = require("../models/file");
const Project = require("../models/project");
const { exec } = require('child_process');

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
exec('mkdir le nouveau dir avec les fichiers'), (error, stdout, stderr) => {}


//creation du fichier
exec('echo body > path jusqu au fichier'), (error, stdout, stderr) => {}


//exec de docker 
exec('docker run --rm -it --name cpp' + req.Header.username + '$username -v /data-lide/' + req.Header.username + '/' + req.body.projectpath 
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

