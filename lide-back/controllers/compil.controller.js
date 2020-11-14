//demande de compil de la part de user

//recup de user : $USER

//recup du fichier user : $FILE 


//lancement de la bonne image docker en fonction de l'extension 
//commande de run a passer a childprocess pour chaque user, pour l'image cpp
//run --rm -it --name cpp$USER -v /root/data/$USER/$FILE:/$FILE cpp $FILE
//pour les autres images on a juste a changer cpp par le nom du langage

const { exec } = require('child_process');
exec('run --rm -it --name cpp$USER -v /root/data/$USER/$FILE:/$FILE cpp $FILE', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

//recuperation du resultat de childprocess 

//renvoie du res pour que Xtern affiche qqlchose