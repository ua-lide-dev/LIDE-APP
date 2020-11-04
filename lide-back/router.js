const express = require("express");
const router = express.Router();
var session = require('express-session');
var CASAuthentication = require('cas-authentication');

// configurer une session Express .
router.use( session({
  secret            : 'super secret key',
  resave            : false,
  saveUninitialized : true
}));


// Créer une instance de CASAuthentication.
var cas = new CASAuthentication({
  cas_url     : 'https://casv6.univ-angers.fr/',
  service_url : 'https://etud-kvm-tmalash.leria-etud.univ-angers.fr/',
  cas_version     : '3.0',
  renew           : false,
  is_dev_mode     : false,
  dev_mode_user   : '',
  dev_mode_info   : {},
  session_name    : 'cas_user',
  session_info    : 'cas_userinfo',
  destroy_session : false
});


/* redirection vers le CAS lors de l'authentification*/
router.get( '/login', cas.bounce_redirect , (req, res) => { res.redirect('/page_ide')  });

/* si user authentifié -> accès à la Page_IDE + envoie des infos user 
 sinon -> erreur 401
*/
router.get( '/page_ide', cas.block , (req, res) => { res.json( { cas_user: req.session[ cas.session_name ] } ) });

/* déconnexion de la session du CAS*/
router.get( '/logout', cas.logout );

// Controllers
const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");

/* --- Routes --- */
// Routes User
router.get("/user/:idUser", (req, res) => {user.get});
router.post("/user", (req, res) => {user.create});
router.put("/user/:idUser", (req, res) => {user.update});
router.delete("/user/:idUser", (req, res) => {user.delete});

//Routes Project
router.get("/user/:idUser/project/:idProject", (req, res) => {project.get});
router.get("/user/:idUser/project", (req, res) => {project.getAll});
router.post("/user/:idUser/project", (req, res) => {project.create});
router.put("/user/:idUser/project/:idProject", (req, res) => {project.update});
router.delete("/user/:idUser/project/:idProject", (req, res) => {project.delete});
router.delete("/user/:idUser/project", (req, res) => {project.deleteAll});

//Routes File
router.get("/user/:idUser/project/:idProject/file/:idFile", (req, res) => {file.get});
router.get("/user/:idUser/project/:idProject/file", (req, res) => {file.getAll});
router.post("/user/:idUser/project/:idProject", (req, res) => {file.create});
router.put("/user/:idUser/project/:idProject/file/:idFile", (req, res) => {file.update});
router.delete("/user/:idUser/project/:idProject/file/:idFile", (req, res) => {file.delete});
router.delete("/user/:idUser/project/:idProject/file", (req, res) => {file.deleteAll});
router.put("save/file/:id",file.save);

module.exports = router;
