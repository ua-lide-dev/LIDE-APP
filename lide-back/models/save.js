const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const save = new Schema({
  filename: String,
  user : [ {user:user.schema}]
})

const Save = mongoose.model ("Save",save);

module.exports = Save;