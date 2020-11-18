const express = require("express");
const router = express.Router();

// Controllers
const user = require("./controllers/user.controller");
const project = require("./controllers/project.controller");
const file = require("./controllers/file.controller");
const compile = require("./controllers/compile.controller");

// Route save
router.put("/save",file.save);

//Route Compile
router.post("/execute", compile.post);

module.exports = router;