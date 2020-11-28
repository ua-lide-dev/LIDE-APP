const Project = require("../models/project");
const User = require ("../models/user")
/*
    Le controlleur Project gère les appels à la bdd 
        pour tout ce qui concerne les projets (nom + fichiers)
*/

/* Pour chaque controlleur :
    - Req est l'objet correspondant à la requête. req.header et re.params contiennent les infos
    - Res est l'objet envoyé en réponse (HTTP CODE STATUS)
*/

// POST -> crée un projet
exports.create = (req, res) => {
  // on recupere le username envoyé dans la requete 
  const username = req.headers.username;
  const projectname = req.body.projectname;
  // On initialise un nouvel objet Project
  console.log(username);
  console.log(projectname);
  const project = {
    projectname: projectname,
    files: []
  };

  User.findOne({username:username,'projects.projectname':projectname})
  .then(user=>{
    if(user){
      res.status(400).json({
        error: "Project already exists !",
      });
      
    }
    else {
      User.findOneAndUpdate(
        {username:username},
        { $push: {projects : project}},{useFindAndModify: false}).exec()
        .then(
          res.status(201).json(project)
        ).catch((err) => {
          // Si la requête échoue (Statut 400 BAD REQUEST)
          res.status(400).json({
            error: err,
          });
        });
    }
  })
};


// PUT -> renommer un projet
exports.rename = (req, res) => {
  // on recupere le username envoyé dans la requete 
  const username = req.headers.username;
  const projectname = req.body.projectname;
  const newprojectname = req.body.newprojectname;

  
   User.findOne({username:username , 'projects.projectname':projectname})
  .then(user=>{
    
    if(user != null){ 
    User.findOneAndUpdate(
      {username:username , 'projects.projectname':projectname},
      { $set: {'projects.$.projectname' : newprojectname}},{useFindAndModify: false}).exec()
      .then(
        res.status(204).send("project renamed")
      ).catch((err) => {
        // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
      });
    
    }
    
    else {
      res.status(400).send("project does not exist")
    }
    

  })
};


//DELETE -> Supprimer un projet
exports.delete = (req, res) => {
   // on recupere le username envoyé dans la requete 
   const username = req.headers.username;
   const projectname = req.body.projectname;

   User.findOne({username:username , 'projects.projectname':projectname})
   .then(user=>{
     
     if(user != null){ 
     User.findOneAndUpdate(
       {username:username , 'projects.projectname':projectname},
       { $pull: {projects : {projectname: projectname}}},{useFindAndModify: false}).exec()
       .then(
        res.status(200).send("project deleted")
      ).catch((err) => {
        // Si la requête échoue (Statut 400 BAD REQUEST)
        res.status(400).json({
          error: err,
        });
      });
     }
     
     else {
      res.status(400).send("project does not exist")
    }
   })
  
};
