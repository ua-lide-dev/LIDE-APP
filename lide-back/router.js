const express = require("express");
const router = express.Router();

// Controllers
const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");
const compile = require("./controllers/compile.controller");
const session = require("./controllers/session.controller");



/* --- Routes --- */

//Routes User
router.post("/user", user.createUser);
router.get("/projects",user.getAllProjects);

// Routes Project
router.post("/createProject", project.create);
router.put('/renameProject', project.rename);
router.post("/deleteProject",project.delete);

// Routes File
router.post("/createFile", file.create);
router.put("/renameFile", file.rename);
router.post("/deleteFile", file.delete);
router.post("/getFile", file.getFile);


// Route save
router.post("/save",file.save);

//Route Compile
router.post("/execute", compile.post);


// Route de validation cas + génération du token de session
router.get("/session", session.session);


module.exports = router;