const File = require("../models/file");
const User = require ("../models/user")
/*
    Le controlleur File gère les appels à la bdd 
        pour tout ce qui concerne les fichiers (nom + extension + contenu + date)
*/

// GET -> récupère un fichier
exports.get = (req, res) => {
    File.findOne({ // Fonction predefinie Mangoose
      _id: req.params.idFile,
    })
      .then((file) => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json(file);
    })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json(err);
    });
};

exports.getAll = (req, res) => {
  File.find()
    .then((file) => { // Si la requête réussi (Statut 200 -> OK)
      res.status(200).json(file);
  })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json(err);
  });
};

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



// PUT -> Modifie un fichier
exports.update = (req, res) => {
  File.updateOne({ _id: req.params.idFile }, { ...req.body})
    .then(() => {
      res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
        message: "Le fichier a été mis à jour",
      });
  })
  .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json({
        error: err,
      });
  });
};



// DELETE -> Supprime tous les fichiers
exports.deleteAll = (req, res) => {
  Fichier.deleteMany({
    idProject: req.params.idProject,
  })
    .then(() => { // Si la requête réussi (Statut 200 -> OK)
      res.status(200).json({
        message: "Tous les fichiers ont été supprimés !",
      });
    })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json({
        error: err,
      });
  });
};