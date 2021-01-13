const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
  projectname: String,
  files: [],
});

const Project = mongoose.model('Project', project);

module.exports = Project;
