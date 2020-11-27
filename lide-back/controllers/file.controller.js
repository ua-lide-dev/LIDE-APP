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
      {"file.filename": req.body.filename, "file.extension": req.body.extension}
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


// POST -> récupère le fichier correspondant aux infos passées dans la requête
exports.getFile = (req, res) => {
  User.findOne({ username:req.headers.username})
  .then((user) => { // Si la requête réussi (Statut 200 -> OK)
    for(projet in user.projects){
      if(user.projects[projet].projectname==req.body.projectname){
        for(fic in user.projects[projet].files){
          if(user.projects[projet].files[fic].filename==req.body.filename && user.projects[projet].files[fic].extension==req.body.extension){
            res.status(200).json(user.projects[projet].files[fic]);
          }
        }
      }
      
    }
    res.status(200).json(user);
  })
  .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
    console.log(err);
    res.status(400).json(err);
  });
};


