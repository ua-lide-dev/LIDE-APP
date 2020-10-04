const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const file = new Schema({
  _id : { type: Schema.ObjectId, auto: true },
  filename: String,
  extension : String,
  body : String,
  idProject : Schema.ObjectId
})

const model = mongoose.model ("file",file, "FILE");

module.exports = model;
