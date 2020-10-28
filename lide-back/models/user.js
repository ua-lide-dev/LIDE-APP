const mongoose = require("mongoose");
const project = require("./project");
const Schema = mongoose.Schema;

const user = new Schema({
  username: String,
  password : String,
  projects : [ {project:project.schema}]
})

const User = mongoose.model ("User",user);

module.exports = User;
