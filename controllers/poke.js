const axios = require('axios');
const User = require('../models/User');
const Poke = require('../models/Poke');
const { request } = require('express');

exports.search = async (req, res) => {
  console.log(req.params.id)
  let pokemon = req.params.id

  try {
    let request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (!!request) {
      let receivedData = request.data
      res.send(receivedData)
    }
  } catch (e) {
    console.log(e)
  }

}

exports.favSave = async (req, res) => {
  console.log(req.body)

  // define req.body
  const { pokeId, pokeName, imgUrl, author } = req.body;

  // validate
  if ( !pokeId || !pokeName || !imgUrl || !author) {
    console.log('required information is missing')
    return res.json({
      success: false,
      message: 'please provide all information'
    })
  }

  try {
    // find User
    let foundUser = await User.findById({ _id: author });

    // save data in DB
    const poke = new Poke(req.body);
    await poke.save();

    // save pokemon in user
    foundUser.favPokemon.push(poke);
    
    // save User
    await foundUser.save()

    console.log(foundUser)

    // respond to frontend
    res.json({
      success: true,
      poke
    })

  } catch (e) {
    console.log(e)
  }
  

}

exports.favView = async (req, res) => {

  // define received object
  const { user, pokemons } = req.body;

  // validate if there is right data
  if (!pokemons) {
    console.log('there is no pokemons')
    return res.json({
      sucess: false,
      message: 'save pokemons first'
    })
  }

  // empty array for sending to frontend
  let foundPoke = [];

  const findPokeAPI = await pokemons.map(async (pokemon) => {
    try {
      // find poketmon from DB
      let reqeustToDB = await Poke.findById(pokemon)
      // find POketmon from API
      let requestToAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${reqeustToDB.pokeId}`)
      // add found poketmon from API to empty arry
      foundPoke.push(requestToAPI.data)

      // if finding item number equals found item number
      if (foundPoke.length === pokemons.length) {
        res.send(foundPoke)
      }
    } catch (e) {
      console.log(e)
    }
  })

}