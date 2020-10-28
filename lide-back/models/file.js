const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const file = new Schema({
  filename: String,
  extension : String,
  body : String,
  date : Date
})

const File = mongoose.model ("File",file);

module.exports = File;
