const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  _id : { type: Schema.ObjectId, auto: true },
  username: String,
  password : String
})

const model = mongoose.model ("user",user,"USER");

module.exports = model;