const mongoose = require("mongoose");
const file = require("./file")
const Schema = mongoose.Schema;

const project = new Schema({
  projectname: String,
  files : [{file : file.schema}]
},{ _id : false },{ strict: false })

const Project = mongoose.model ("Project",project);

module.exports = Project;
