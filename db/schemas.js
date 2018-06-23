const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  url: String,
  title: String,
  author: Array, // news api always returns an array of strings here
  source: String,
  description: String,
  fullText: String,
  articleStance: Number,
  votes: {
    agree: {
      summedUserStance: Number,
      totalVotes: Number,
    },
    disagree: {
      summedUserStance: Number,
      totalVotes: Number,
    },
    fun: {
      summedUserStance: Number,
      totalVotes: Number,
    },
    bummer: {
      summedUserStance: Number,
      totalVotes: Number,
    },
    mean: {
      summedUserStance: Number,
      totalVotes: Number,
    },
    worthyAdversary: {
      summedUserStance: Number,
      totalVotes: Number,
    },
  },
});

const Article = mongoose.model('Article', articleSchema);

const userSchema = new Schema({
  authenticationInfo: String,
  avatar: String,
  name: String,
  health: Number,
  user_stance: Number,
  recently_read: [String],
  emails: String,
  facebookId: String,
  facebookUrl: String,
  birthday: String,
  location: String,
  hometown: String,
  age_range: Schema.Types.Mixed,

});

const User = mongoose.model('User', userSchema);

module.exports = { Article, User }