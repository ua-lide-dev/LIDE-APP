const User = require("../models/user");

/*
    Le controlleur User gère les appels à la bdd 
        pour tout ce qui concerne les users (username + projets)

*/

// GET -> récupère tous les projets d'un utilisateur
exports.getAllProjects = (req, res) => {

  User.findOne({ username:req.headers.username}, 'projects ')
  .then((user) => { // Si la requête réussi (Statut 200 -> OK)
    res.status(200).json(user.projects);
  })
  .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
    res.status(400).json(err);
  });
};

// GET -> récupère tous les projets d'un utilisateur
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


// GET -> récupère un utilisateur
exports.get= (req, res) => {
    User.findOne({ // Fonction predefinie Mangoose
      _id: req.params.idUser,
    })
      .then((user) => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json(project);
    })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json(err);
    });
};

// POST -> crée un utilisateur
exports.createUser = (req, res) => {
    //delete req.body._id;  // Sécurité, l'id sera généré par mangoDB
  
    // On initialise un nouvel objet User
    const user = new User({
      username: req.headers.username,
      projects: []
    });
  
    user
      .save() // Fonction mangoose pour l'ajout en base
      .then(() => {
        res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
          message: "L'utilisateur "+user+"a bien été ajouté !",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};

// PUT -> Modifie un utilisateur
exports.update = (req, res) => {
    User.updateOne({ _id: req.params.idUser }, { ...req.body})
      .then(() => {
        res.status(201).json({ // Si la requête réussi (Statut 201 -> CREATED)
          message: "L'utilisateur a été mis à jour",
        });
    })
    .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};
  
// DELETE -> Supprime un utilisateur
exports.delete = (req, res) => {
    User.findOneAndDelete({
      _id: req.params.idUser,
    })
      .then(() => { // Si la requête réussi (Statut 200 -> OK)
        res.status(200).json({
          message: "L'utilisateur a été supprimé !",
        });
      })
      .catch((err) => { // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
    });
};