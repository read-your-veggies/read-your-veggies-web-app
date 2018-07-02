const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = require('./index.js').db;
const articleDbConn = require('./index.js').articleDbConn;
const userDbConn = require('./index.js').userDbConn;
const sourceDbConn = require('./index.js').sourceDbConn;

const articleSchema = new Schema({
  url: {type: String, unique: true},
  title: String,
  author: Array, // news api always returns an array of strings here
  source: String,
  description: String,
  fullText: String,
  articleStance: Number,
  image: String,
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

const Article = articleDbConn.model('Article', articleSchema);

const userSchema = new Schema({
  authenticationInfo: String,
  avatar: String,
  name: String,
  health: { type: Number, default: 0 },
  user_stance: { type: Number, default: 0 },
  recently_read: [String],
  emails: String,
  facebookId: String,
  facebookUrl: String,
  birthday: String,
  location: String,
  locPolRatio: { type: Number, default: 0 },
  hometown: String,
  homePolRatio: { type: Number, default: 0 },
  age_range: String,
  onboard_stance: { type: Number, default: 0 },
  onboard_information: { type: String, default: 'NEED_ON_BOARDING' },
  //this will be a HUGE object/string
  completed_articles: { type: String, default: JSON.stringify({})},
  reading_stance: { type: [Number], default:[0,0] },
});

const User = userDbConn.model('User', userSchema);

const sourceSchema = new Schema({
  name: String,
  articles: [String],
  titles: [String],
  fullTexts: [String],
  titlesPersonality: String,
  fullTextsPersonality: String,
});

const Source = sourceDbConn.model('Source', sourceSchema);

module.exports = { Article, User, Source }