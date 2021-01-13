const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const file = new Schema({
  projectid: String,
  filename: String,
  extension: String,
  content: String,
  date: Date,
});

const File = mongoose.model('File', file);

module.exports = File;
