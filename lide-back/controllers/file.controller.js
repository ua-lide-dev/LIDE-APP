const File = require("../model/file");

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

// GET -> récupère tous les fichiers
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
    delete req.body._id;  // Sécurité, l'id sera généré par mangoDB
  
    // On initialise un nouvel objet File
    const file = new File({
        filename: req.params.filename,
        extension: req.params.extension,
        body: req.params.body,
        date: req.body.date
    });
  
    file
      .save() // Fonction mangoose pour l'ajout en base
      .then(function(proj){
          return File.findOneAndUpdate({ _id: req.params.idFile }, { file:file._id }, { new:true })
      })
      .then(() => {
        res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
          message: "Le fichier a bien été ajouté",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
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