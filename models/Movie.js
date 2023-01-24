const mongoose = require('mongoose');
const User = require('./User');

const MovieSchema = new mongoose.Schema({
  imdbId: String,
  title: String,
  actors: String,
  director: String,
  writer: String,
  genre: String,
  released: String,
  imgUrl: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  }
}, {timestamps: true})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;