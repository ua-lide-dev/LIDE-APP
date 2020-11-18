const { exec, execSync } = require('child_process');

//demande de compil de la part de user

// POST -> récupère un fichier
exports.post = (req, res) => {

//res.status(200).json(req.headers.username + req.body.filename + req.body.projectpath);

//recup de user : $username
//recup du path pour le fichier : $projetpath
//recup du fichier user : $filename

//lancement de la bonne image docker en fonction de l'extension 
//commande de run a passer a childprocess pour chaque user, pour l'image cpp
//run --rm -it --name cpp$USER -v /root/data/$USER/$FILE:/$FILE cpp $FILE
//pour les autres images on a juste a changer cpp par le nom du langage

//mkdir du nouveau dir
execSync('mkdir -p /data-lide/'+ req.headers.username +'/' + req.body.projectpath), (error, stdout, stderr) => {}

//creation du fichier
execSync('echo "#include<iostream>\n int main () {std::cout << 12 << std::endl; return 0;}" > /data-lide/'+ req.headers.username +'/' + req.body.projectpath + '/' + req.body.filename), (error, stdout, stderr) => {}

//exec de docker 

//les docker name seront toujours nommé avec username 
/*execSync('docker run --rm -it --name cpp' + req.headers.username + ' -v /data-lide/' + req.headers.username + '/' + req.body.projectpath 
    + '/' + req.body.filename + ':/' + req.body.filename + ' cpp ' + req.body.filename, 
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
    res.status(200).json(stderr);
    return;
  }

});*/

execSync('docker run -i --rm hello-world', 
    (error, stdout, stderr) => {
      
      res.status(400).json(error);
      res.status(200).json(stdout);
      res.status(200).json(stderr);
  
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
    res.status(200).json(stderr);
    return;
  }
});
};