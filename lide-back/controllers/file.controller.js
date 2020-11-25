const User = require ("../models/user")

/*
    Le controlleur File gère les appels à la bdd 
        pour tout ce qui concerne les fichiers (nom + extension + contenu + date)
*/

// POST -> crée un fichier
exports.create = (req, res) => {
 console.log("")

    // on recupere le username et le projectname
    const username = req.headers.username;
    const projectname= req.body.projectname;
    // On initialise un nouvel objet File
    const file = new File({
        filename: req.body.filename,
        extension: req.body.extension,
        body: req.body.body,
        date: Date.now()
    });

  User.findOne({username:username,'projects.projectname':projectname, 'projects.files.filename':req.body.filename})
  .then(user=>{
   if(user){
    res.status(400).json({
      error: "File already exists !",
    });
    
   }
   else{
    User.findOneAndUpdate(
      {username:username,'projects.projectname':projectname},
      { $push: {'projects.$.files': file}},{useFindAndModify: false}).exec()
      .then(
        res.status(201).json(file)
      ).catch((err) => {
        // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
      });
   }
})};

// PUT -> renommer un fichier
exports.rename = (req, res) => {
  // on recupere le username envoyé dans la requete 
  const username = req.headers.username;
  const projectname = req.body.projectname;
  const filename = req.body.filename;
  const newfilename = req.body.newfilename;

  
    User.findOneAndUpdate(
      {username:username , 'projects.projectname':projectname,'projects.files.filename':filename},
      { $set: {'projects.$[projectFilter].files.$[fileFilter].filename' : newfilename}},
      { arrayFilters: [{ 'projectFilter.projectname': projectname },{'fileFilter.filename':filename}] }).exec()
      .then(user=>{
          if(user!=null){
            res.status(204).send("file renamed")
          }else{
            //Si la requête échoue (Statut 400 BAD REQUEST)
            res.status(400).send("file does not exist")
          }
        
      });
    
    };

//DELETE -> Supprimer un fichier
exports.delete = (req, res) => {
  // on recupere le username envoyé dans la requete 
  const username = req.headers.username;
  const projectname = req.body.projectname;
  const filename = req.body.filename;

  User.findOneAndUpdate(
    {username:username , 'projects.projectname':projectname,'projects.files.filename':filename},
    { $pull: {'projects.$.files' : {filename: filename}}}).exec()
    .then(user=>{
        if(user!=null){
          res.status(204).send("file removed")
        }else{
          //Si la requête échoue (Statut 400 BAD REQUEST)
          res.status(400).send("file does not exist")
        }
      
    });
};

// PUT -> Sauvegarde un fichier
exports.save = (req, res) => {
  User.updateOne({ username:req.headers.username,}, {

    $set: { 
      "projects.$[project].files.$[file].body": req.body.body, 
    }
  },{ arrayFilters:[
      {"project.projectname": req.body.projectname}, 
      {"file.filename": req.body.filename}
    ]
  }) 
    .then(() => {
      res.status(201).json({// Si la requête réussi (Statut 201 -> CREATED
        message: "le fichier a bien été sauvegardé"
      });
  })
  .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json({
        error: err,
      });
  })
};


//(BOUCHON EN ATTENDANT LE CONTROLLER DE BAPTISTE) TODO a remplacer
// POST -> getfile 
exports.getFileContent = (req, res) => {

  //Données en entrée dans la requête

  console.log("username : " + req.headers.username);
  console.log("filename : " + req.body.filename);
  console.log("extension : " + req.body.extension);
  console.log("projectpath : " + req.body.projectpath);

  res.status(201).json({
    content:  "#include<iostream>\n int main () {std::cout << \"Hello World !\"  << std::endl; return 0;}"
  });
};

