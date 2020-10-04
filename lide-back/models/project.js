const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const project = new Schema({
  _id : { type: Schema.ObjectId, auto: true },
  projectname: String,
  idUser: Schema.ObjectId
})

const model = mongoose.model ("project",project, "PROJECT");

module.exports = model;