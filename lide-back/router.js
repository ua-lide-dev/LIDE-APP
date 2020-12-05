const express = require("express");
const router = express.Router();

// Controllers
const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");
const compile = require("./controllers/compile.controller");
const cas = require("./controllers/cas.controller");
const SessionService = require("./controllers/sessionService");
/* --- Routes --- */

//Routes User
router.post("/user", user.createUser);
router.get("/projects",ensureAuthenticated,user.getAllProjects);

// Routes Project
router.post("/createProject", ensureAuthenticated, project.create);
router.put('/renameProject', project.rename);
router.post("/deleteProject",project.delete);

// Routes File
router.post("/createFile", file.create);
router.put("/renameFile", file.rename);
router.post("/deleteFile", file.delete);
router.post("/getFile", file.getFile);


// Route save
router.put("/save",file.save);

//Route Compile
router.post("/execute", ensureAuthenticated, compile.post);

function ensureAuthenticated(req, res, next) {
    const username = req.headers.username;
    const session = req.headers.session;
    const isValid =  SessionService.validateSession(username, session);
    if (isValid) next();
    else res.status(401).json("User is not authenticated");
}

// Route CAS Validate
router.get("/cas",cas.validate);
module.exports = router;