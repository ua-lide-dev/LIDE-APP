const FileService = require('../services/db/file.service');
const ProjectService = require('../services/db/project.service');
const { execSync } = require('child_process');
const fs = require('fs').promises;

// Fonction de compilation & exécution
exports.execute = async (req, res) => {
  const username = req.username;
  const fileid = req.params.fileid;

  // Récupération du fichier initiateur de l'exécution
  const file = await FileService.get(username, fileid).catch((error) => {
    console.error(error);
    res.status(500).json(error);
  });
  const filename = file.filename;
  const reqExtension = file.extension;

  // Récupération de son projet
  const project = await ProjectService.get(username, file.projectid).catch((error) => {
    console.error(error);
    res.status(500).json(error);
  });
  const projectname = project.projectname;

  // params containter
  const containerName = 'lide-' + username;
  let containerId = '';

  try {
    const extension = reqExtension.replace('.', ''); //FIXME A ENLEVER et adapter 

    // Suppression des anciens fichiers sur le FS du serveur
    execSync('rm -rf /lide-data/' + username + '/');

    // Création du dossier de l'utilisateur sur le FS du serveur
    const projectPath = '/lide-data/' + username + '/' + projectname + '/';
    execSync('mkdir -p ' + projectPath);

    // Construction des fichiers sur le FS du serveur
    constructFs(project, username, res);

    // Supression d'un potentiel précedent container
    try {
      execSync('docker rm --force ' + containerName);
    } catch (error) {
      console.error(error);
    }

    // Sélection de l'image docker //TODO réupérer ça dynamiquement en base
    var img;
    var startCommand;
    var TIMEOUT_VALUE = process.env.TIMEOUT_VALUE;

    switch (extension) {
      case 'cpp':
        img = "cpp_lide";
        startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v  ${projectPath}:/workdir --name ${containerName} ${img} ${projectPath}`;
        break;
      case 'h':
        img = "cpp_lide";
        startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v ${projectPath}:/workdir --name ${containerName} ${img} ${projectPath}`;
        break;
      case 'java':
        img = "java_lide";
        startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v ${projectPath}:/workdir --name ${containerName} ${img} ${filename}.${extension}`;
        break;
      case 'py':
        img = "py_lide";
        startCommand = `docker run --env TIMEOUT_VALUE=${TIMEOUT_VALUE} -it -d --cpus=1 -v ${projectPath}:/workdir --name ${containerName} ${img} ${filename}.${extension}`;
        break;
      default:
        res.status(400).json("Extension non gérée");
    }

    // Lancement du conteneur
    console.debug(startCommand);
    execSync(startCommand);

    // Récupération de l'id du conteneur
    containerId = execSync('docker inspect --format=\'{{.Id}}\' ' + containerName).toString();
    containerId = containerId.substr(0, containerId.length - 1);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

  res.status(200).json({ containerid: containerId });
}

async function constructFs(project, username, res) {
  for (const fileid of project.files) {
    await FileService.get(username, fileid).catch((error) => {
      console.error(error);
      res.status(500).json(error);
    }).then(async (file) => {
      const extension = file.extension.replace('.', ''); //FIXME A ENLEVER et adapter 
      // Remplir le contenu du fichier
      const filePath = '/lide-data/' + username + '/' + project.projectname + '/' + file.filename + '.' + extension;
      await fs.writeFile(filePath, file.content).catch((error) => {
        console.error(error);
      }).then(() => {
        console.debug(`Write ${filePath}`);
      })

    });
  }
}

exports.killExec = (req, res) => {
  const username = req.username;
  const containerName = 'lide-' + username

  try {
    console.debug(`docker kill "${containerName}"`)
    execSync('docker kill ' + containerName);
    const statusMessage = `Container "${containerName}" successfully stopped.`;
    console.debug(`container "${containerName}" killed`)
    res.status(200).json({ status: statusMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
}