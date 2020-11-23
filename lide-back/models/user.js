const mongoose = require("mongoose");
const project = require("./project");
const Schema = mongoose.Schema;

const user = new Schema({
  username: String,
  projects : [project]
});

const User = mongoose.model ("User",user);

module.exports = User;
