const express = require("express");
const router = express.Router();

// Controllers
const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");

/* --- Routes --- */
// Routes User
router.get("/user/:idUser", (req, res) => { user.get });
router.post("/user", (req, res) => { user.create });
router.put("/user/:idUser", (req, res) => { user.update });
router.delete("/user/:idUser", (req, res) => { user.delete });

//Routes Project
router.get("/user/:idUser/project/:idProject", (req, res) => { project.get });
router.get("/user/:idUser/project", (req, res) => { project.getAll });
router.post("/user/:idUser/project", (req, res) => { project.create });
router.put("/user/:idUser/project/:idProject", (req, res) => { project.update });
router.delete("/user/:idUser/project/:idProject", (req, res) => { project.delete });
router.delete("/user/:idUser/project", (req, res) => { project.deleteAll });

//Routes File
router.get("/user/:idUser/project/:idProject/file/:idFile", (req, res) => { file.get });
router.get("/user/:idUser/project/:idProject/file", (req, res) => { file.getAll });
router.post("/user/:idUser/project/:idProject", (req, res) => { file.create });
router.put("/user/:idUser/project/:idProject/file/:idFile", (req, res) => { file.update });
router.delete("/user/:idUser/project/:idProject/file/:idFile", (req, res) => { file.delete });
router.delete("/user/:idUser/project/:idProject/file", (req, res) => { file.deleteAll });

module.exports = router;