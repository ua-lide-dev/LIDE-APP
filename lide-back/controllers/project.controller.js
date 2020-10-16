const Project = require("../models/project");

/*
    Le controlleur Project gère les appels à la bdd 
        pour tout ce qui concerne les projets (nom + fichiers)

*/

/* Pour chaque controlleur :
    - Req est l'objet correspondant à la requête. req.header et re.params contiennent les infos
    - Res est l'objet envoyé en réponse (HTTP CODE STATUS)
*/

// GET -> récupère un projet
exports.get = (req, res) => {
    Project.findOne({ // Fonction predefinie Mangoose
      _id: req.params.idProject,
    })
      .then((project) => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json(project);
    })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json(err);
    });
};

// GET -> récupère tous les projets
exports.getAll = (req, res) => {
  Project.find()
    .then((project) => { // Si la requête réussi (Statut 200 -> OK)
      res.status(200).json(project);
  })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json(err);
  });
};

// POST -> crée un projet
exports.create = (req, res) => {
    delete req.body._id;  // Sécurité, l'id sera généré par mangoDB
  
    // On initialise un nouvel objet Project
    const project = new Project({
        nom: req.params.nom,
        projets: req.params.projets
    });
  
    project
      .save() // Fonction mangoose pour l'ajout en base
      .then(function(proj){
          return Project.findOneAndUpdate({ _id: req.params.idProject }, { project:proj._id }, { new:true })
      })
      .then(() => {
        res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
          message: "Le projet a bien été ajouté",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};

// PUT -> Modifie un projet
exports.update = (req, res) => {
  Project.updateOne({ _id: req.params.idProject }, { ...req.body})
    .then(() => {
      res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
        message: "Le projet a été mis à jour",
      });
  })
  .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json({
        error: err,
      });
  });
};

// DELETE -> Supprime un projet
exports.delete = (req, res) => {
  Project.findOneAndDelete({
    _id: req.params.idProject,
  })
    .then(() => { // Si la requête réussi (Statut 200 -> OK)
      res.status(200).json({
        message: "Le projet a été supprimé !",
      });
    })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json({
        error: err,
      });
  });
};

// DELETE -> Supprime tous lse projets
exports.deleteAll = (req, res) => {
  Project.deleteMany({
    idUser: req.params.idUser,
  })
    .then(() => { // Si la requête réussi (Statut 200 -> OK)
      res.status(200).json({
        message: "Tous les projets ont été supprimés !",
      });
    })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
      res.status(400).json({
        error: err,
      });
  });
};