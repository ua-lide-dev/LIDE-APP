const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const file = new Schema({
  filename: String,
  extension : String,
  content : String,
  date : Date
})


module.exports = file;
