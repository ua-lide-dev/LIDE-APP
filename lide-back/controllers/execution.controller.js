const FileService = require('../services/db/file.service');
const ProjectService = require('../services/db/project.service');
const { execSync } = require('child_process');

// Fonction de compilation & exécution
exports.execute = async (req, res) => {
  const username = req.username;
  const fileid = req.params.fileid;

  // récupération du fichier
  const file = await FileService.get(username, fileid).catch((error) => { res.status(200).json(error); });
  const filename = file.filename;
  const reqExtension = file.extension;
  const fileContent = file.content;

  // récupération de son projet
  const project = await ProjectService.get(username, file.projectid).catch((error) => { res.status(200).json(error); });
  const projectname = project.projectname;

  // params containter
  const containerName = 'lide-' + username;
  let containerId = '';

  try {
    const extension = reqExtension.replace('.', '');
    // Création du volume et du fichier
    execSync('mkdir -p /lide-data/' + username + '/' + projectname);

    filePath = '/lide-data/' + username + '/' + projectname + '/' + filename + '.' + extension;

    // Remplir le contenu du fichier
    execSync('echo \'' + fileContent + '\' > ' + filePath);

    // Supression d'un potentiel précedent container
    try {
      execSync('docker rm --force ' + containerName);
    } catch (error) { }

    // Lancement du conteneur
    execSync(
      'docker run -it -d' +
      ' -v ' +
      filePath +
      ':/exec/file.' +
      extension +
      ' --name ' +
      containerName +
      ' ' +
      extension,
    );

    // Récupération de l'id du conteneur
    containerId = execSync('docker inspect --format=\'{{.Id}}\' ' + containerName).toString();
    containerId = containerId.substr(0, containerId.length - 1);
  } catch (error) {
    console.error(error);
  }

  res.status(200).json({ containerid: containerId });
}
