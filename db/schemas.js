const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  url: String,
  title: String,
  author: Array, // news api always returns an array of strings here
  source: String,
  description: String,
  fullText: String,    
});

var Article = mongoose.model('Article', articleSchema);

module.exports = { Article }