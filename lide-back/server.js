const db = require("./db");
const express = require("express");
const app = express();
const router = require("./router");
const bodyparser=require("body-parser");

app.use(express.json());

/* -- Connection à la base de donnée MongoDB --- */
db.connect();
app.use(bodyparser.json());

/* --- Ensemble des routes --- */
app.use("/", router);

/* --- Lancement du serveur back --- */
app.listen(3000, () => {
  console.log(
    `Server starting : http://localhost:3000`
  );
});