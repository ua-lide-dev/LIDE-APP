const express = require("express");
const router = express.Router();

/* --------------- Controllers----------------- */

const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");
const execution = require("./controllers/execution.controller");
const session = require("./controllers/session.controller");

/* ---------------- Security ------------------ */

const SessionService = require("./services/security/session.service");

/* ---------------- Routes -------------------- */

// Route permettant de créer un utilisateur lors de sa première connexion
router.get("/user", ensureAuthenticated, user.get);
router.delete("/user", ensureAuthenticated, user.delete);
router.get("/user/projects", ensureAuthenticated, user.getProjects);

// Routes de gestion des projets
router.post("/project", ensureAuthenticated, project.create);
router.get("/project/:projectid", ensureAuthenticated, project.get);
router.delete("/project/:projectid", ensureAuthenticated, project.delete);
router.put("/project/:projectid", ensureAuthenticated, project.update);

// Routes de gestion des fichiers
router.post("/file", ensureAuthenticated, file.create);
router.get("/file/:fileid", ensureAuthenticated, file.get);
router.delete("/file/:fileid", ensureAuthenticated, file.delete);
router.put("/file/:fileid", ensureAuthenticated, file.update);

// Route de compilation & exécution
router.post("/execute/:fileid", ensureAuthenticated, execution.execute);

// Route de validation cas + génération du token de session
router.get("/session", session.session);

// Route de validation du token de session
router.get("/validateSession", session.validateSession);

async function ensureAuthenticated(req, res, next) {
  const session = req.headers.session;
  const username = await SessionService.validateSession(session);
  if (!username) res.status(401).json("User is not authenticated");
  req.username = username;
  next();
}

module.exports = router;
