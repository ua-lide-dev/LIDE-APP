//demande de compil de la part de user

//recup de user : $username
//recup du path pour le fichier : $projetpath
//recup du fichier user : $file_name 

//lancement de la bonne image docker en fonction de l'extension 
//commande de run a passer a childprocess pour chaque user, pour l'image cpp
//run --rm -it --name cpp$USER -v /root/data/$USER/$FILE:/$FILE cpp $FILE
//pour les autres images on a juste a changer cpp par le nom du langage

const { exec } = require('child_process');
exec('docker run --rm -it --name cpp$USER -v /data-lide/$username/$projetpath/$file_name:/$file_name cpp $file_name', (error, stdout, stderr) => {
  if (error) {
    //on revoi msg d'erreur la
    console.error(`exec error: ${error}`);
    return;
  }
  //recuperation du resultat de childprocess et on l'envoi 
  console.log(`stdout: ${stdout}`);
  //recupertation des erreus on fait pas la diff avec la reussite 
  console.error(`stderr: ${stderr}`);
});

//renvoie du res pour que Xtern affiche qqlchose