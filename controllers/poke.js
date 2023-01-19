const axios = require('axios');

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