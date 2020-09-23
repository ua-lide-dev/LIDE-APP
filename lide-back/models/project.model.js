const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projetSchema = new Schema({
  name: { type: String, required: true },
  idUser: { type: String, required: true },
});

const Projet = mongoose.model("Projet", projetSchema);

module.exports = Projet;
