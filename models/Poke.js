const mongoose = require('mongoose');
const User = require('./User');

const PokeSchema = new mongoose.Schema({
  pokeId: String,
  pokeName: String,
  imgUrl: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  }
}, {timestamps: true})

const Poke = mongoose.model('Poke', PokeSchema);

module.exports = Poke;