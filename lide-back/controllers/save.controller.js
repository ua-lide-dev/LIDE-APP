const Save = require("../models/save");

/*
    Le controlleur Save gère les appels à la bdd 
        pour tout ce qui concerne les sauvegardes (user + filename + container)

*/

// GET -> récupère une sauvegarde
exports.get = (req, res) => {
    Save.findOne({ // Fonction predefinie Mangoose
      _id: req.params.idSave,
    })
      .then((save) => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json(save);
    })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json(err);
    });
};

// GET -> récupère toutes les sauvegardes
exports.getAll = (req, res) => {
    Save.find()
      .then((save) => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json(save);
    })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json(err);
    });
  };

// POST -> crée une sauvegarde
exports.create = (req, res) => {
    delete req.body._id;  // Sécurité, l'id sera généré par mangoDB
  
    // On initialise un nouvel objet Save
    const save = new Save({
      nom_fichier: req.params.nom_fichier, 
      utilisateur: req.params.utilisateur
    });
  
    save
      .save() // Fonction mangoose pour l'ajout en base
      .then(function(sav){
        return Save.findOneAndUpdate({ _id: req.params.idSave }, { save:sav._id }, { new:true })
    })
      .then(() => {
        res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
          message: "La sauvegarde a bien été ajoutée !",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};

// PUT -> Modifie une sauvegarde
exports.update = (req, res) => {
    Save.updateOne({ _id: req.params.idSave }, { ...req.body})
      .then(() => {
        res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
          message: "La sauvegarde a été mise à jour",
        });
    })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};
  
// DELETE -> Supprime une sauvegarde
exports.delete = (req, res) => {
    Save.findOneAndDelete({
      _id: req.params.idSave,
    })
      .then(() => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json({
          message: "La sauvegarde a été supprimée !",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};

// DELETE -> Supprime toutes les sauvegardes
exports.deleteAll = (req, res) => {
    Save.deleteMany({
      idSave: req.params.idSave,
    })
      .then(() => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json({
          message: "Toutes les sauvegardes ont été supprimées !",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
  };