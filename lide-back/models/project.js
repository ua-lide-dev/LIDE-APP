const mongoose = require("mongoose");
const file = require("./file")
const Schema = mongoose.Schema;

const project = new Schema({
  projectname: String,
  files : [file]
})

module.exports = project;
