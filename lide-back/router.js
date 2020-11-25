const express = require("express");
const router = express.Router();

// Controllers
const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");
const compile = require("./controllers/compile.controller");

/* --- Routes --- */
// Routes User
router.get("/user/:idUser", (req, res) => { user.get });
router.post("/user", (req, res) => { user.create });
router.put("/user/:idUser", (req, res) => { user.update });
router.delete("/user/:idUser", (req, res) => { user.delete });

//Routes Project
//---route de test qui revoi un project bidon//
router.get("/getProjects",project.getTest);
//-------//
router.get("/user/:idUser/project/:idProject", (req, res) => { project.get });
router.get("/user/:idUser/project", (req, res) => { project.getAll });
router.post("/user/:idUser/project", (req, res) => { project.create });
router.put("/user/:idUser/project/:idProject", (req, res) => { project.update });
router.delete("/user/:idUser/project/:idProject", (req, res) => { project.delete });
router.delete("/user/:idUser/project", (req, res) => { project.deleteAll });

//Routes File
router.get("/user/:idUser/project/:idProject/file/:idFile", (req, res) => {file.get});
router.get("/user/:idUser/project/:idProject/file", (req, res) => {file.getAll});
router.post("/user/:idUser/project/:idProject", (req, res) => {file.create});
router.put("/user/:idUser/project/:idProject/file/:idFile", (req, res) => {file.update});
router.delete("/user/:idUser/project/:idProject/file/:idFile", (req, res) => {file.delete});
router.delete("/user/:idUser/project/:idProject/file", (req, res) => {file.deleteAll});

//Routes Compile
router.post("/execute", compile.post);

// test
router.get("/test",project.getTest);

module.exports = router;