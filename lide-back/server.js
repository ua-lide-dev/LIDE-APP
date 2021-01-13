const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;

const https = require("https");
const fs = require("fs");

const db = require("./db");

/* -- Connection à la base de donnée MongoDB --- */
db.connect();

app.use(cors());
app.use(bodyParser.json());

/* --- Ensemble des routes --- */
app.use("/api/v1", router);

/* --- Lancement du serveur back --- */
app.listen(port, () => {
  console.log("Server starting : http://localhost:" + port);
});
