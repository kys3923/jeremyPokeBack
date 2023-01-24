const express = require('express');
const router = express.Router();

const { search, addToFav } = require('../controllers/movie');

router.route('/search').post(search);
router.route('/addToFav/:id').post(addToFav)

module.exports = router;