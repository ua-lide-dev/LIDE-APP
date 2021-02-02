const UserService = require('../services/db/user.service');
const { execSync, exec } = require('child_process');
const FileService = require('../services/db/file.service');

exports.getExport = async (req, res) => {
    const username = req.username;

    try {
    let result = await UserService.getProjects(username)
        .catch((err) => {
            res.status(400).json({
                error: err.message,
            });
        });
    
    for (const projet of result){
        for (const projetFile of projet.files){
            //pas de filecontent dans getProjects alors on recharge les fichiers en entiers
            const projectname = projet.projectname;

            // récupération du fichier
            const file = await FileService.get(username, projetFile._id).catch((error) => { res.status(200).json(error); });
            const filename = file.filename;
            const extension = file.extension.replace('.', '');
            const fileContent = file.content;
            // Recréation
            execSync('mkdir -p /lide-export/' + username + '/' + projectname);

            let filePath = '/lide-export/' + username + '/' + projectname + '/' + filename + '.' + extension;

            // Remplir le contenu du fichier
            execSync('echo \'' + fileContent + '\' > ' + filePath);
        }
    }

execSync('zip -r /lide-export/'+username + '/' + username +'.zip /lide-export/' + username + '/');


//on nettoie les fichiers 
exec('sleep 3 && rm -Rf /lide-export/'+username);

res.download("/lide-export/" + username + '/' + username+".zip");

}catch (error) {
    console.error("probleme sur le zip' :"+error);
    res.status(400);    
  }
};