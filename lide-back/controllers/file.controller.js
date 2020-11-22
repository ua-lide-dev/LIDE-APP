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


  User.findOne({username:username})
  .then(user=>{
    var fileExist = false;
    for(let i = 0; i < user.projects.length; i++){ 
     if( user.projects[i].projectname  == projectname){
        for(let j = 0; j < user.projects[i].files.length; j++){ 
          if( user.projects[i].files[j].filename  == req.body.filename) fileExist = true;
        } 
     }
    }

    if(fileExist == false){
      console.log("file not exist")
     
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
    
    else {
      console.log("file exist")
      
      res.status(400).json({
        error: "File already exists !",
      });
  
    

  }
  })
  
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

// DELETE -> Supprime un fichier
exports.delete = (req, res) => {
  File.findOneAndDelete({
    _id: req.params.idFile,
  })
    .then(() => { // Si la requête réussi (Statut 200 -> OK)
      res.status(200).json({
        message: "Le fichier a été supprimé !",
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