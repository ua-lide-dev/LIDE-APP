const mongoose = require("mongoose");
const file = require("./file")
const Schema = mongoose.Schema;

const project = new Schema({
  projectname: String,
  files : [file.schema]
},{ _id : false })

const Project = mongoose.model ("Project",project);

module.exports = Project;
