const { execSync } = require('child_process');

//demande de compil de la part de user

// POST -> récupère un fichier
exports.post = (req, res) => {

  var user = req.headers.username;
  var file = req.body.filename;
  var ext = req.body.extension;
  var path = req.body.projectname;
  var content = req.body.content;

  console.log("================EXECUTION==================");
  console.log(user);
  console.log(file);
  console.log(ext);
  console.log(path);
  console.log(content);
  console.log("================fin==================");

  //mkdir du nouveau dir
  execSync('mkdir -p /data-lide/' + user + '/' + path);

  //creation du fichier
  // TODO appeler getfile
  execSync('echo "'+content+ '" > /data-lide/' + user + '/' + path + '/' + file + "." + ext);

  //exec de docker 

  //docker run -i --name cppqmaignan --rm -v /data-lide/qmaignan/TP1/fichier.cpp:/fichier.cpp cpp fichier.cpp : exemple de docker run
  try {
    execSync("docker container rm --force " + user);
  } catch (error) {
    console.log(error);
  }

  execSync(
    "docker run -it -d" +
    " --name " + user +
    " -v " + "/data-lide/" + user + "/" + path + "/" + file + "." + ext + ":/" + file + "." + ext +
    " " + ext +
    " /" + file + "." + ext
  );

 // execSync("docker run -i --name " + user + " -v /data-lide/" + user + "/" + path + "/" + file + "." + ext + " " + ext + " " + "/data-lide/" + user + "/" + path + "/" + file + "." + ext);

  var idDocker = execSync("docker inspect --format='{{.Id}}' " + user).toString();
  console.log("idocker -->" + idDocker);
  res.status(200).json({ containerid: idDocker });
};