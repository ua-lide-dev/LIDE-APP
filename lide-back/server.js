const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
const db = require("./db");
const bodyparser = require('body-parser');

/* -- Connection à la base de donnée MongoDB --- */
db.connect();
app.use(bodyparser.json());

/*----authorisation du cors pour nos requetes---*/
app.use(cors());

app.use(express.json());

/* --- Ensemble des routes --- */
app.use("/", router);

/* --- Lancement du serveur back --- */
app.listen(3000, () => {
  console.log(
    `Server starting : http://localhost:3000`
  );
});