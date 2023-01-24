const axios = require('axios');
const User = require('../models/User');
const Movie = require('../models/Movie');

exports.search = async (req, res) => {
  
  // 1. define reqeust from frontend
  const { movie } = req.body;
  
  // 2. refine movie data to request to omdb
  let refinedInputtedText = movie.replace(/ /g,"+");

  // 3. save omdb key to .env - done
  
  try {
    // 4. reqeust to omdb api
    let request = await axios.get(`http://www.omdbapi.com/?t=${refinedInputtedText}&apikey=${process.env.OMDB_KEY}`)

    console.log(request)

    // 5. found omdb request, then refine the result found
    if(request.status === 200) {
      // 6. send refined data to front end
      let movie = request.data;
      res.json({
        success: true,
        movie
      })
    } else {
      res.json({
        success: false,
        message: 'found error at getting data from api'
      })
    }

  } catch (e) {
    console.log(e)
  }

}

exports.addToFav = async (req, res) => {
  console.log(req.params.id, req.body);
  let movieId = req.params.id;

  const { title, actors, director, writer, genre, released, author } = req.body;

  try {

    let foundUser = await User.findById({ _id: author });

    const movie = new Movie(req.body);
    await movie.save();
    foundUser.favMovies.push(movie);
    await foundUser.save();
    console.log(foundUser)

    res.json({
      success: true,
      movie
    })
    

  } catch (e) {
    console.log(e)
  }
}