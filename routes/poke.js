const express = require('express');
const router = express.Router();

const { search } = require('../controllers/poke');

router.route('/search/:id').post(search);

module.exports = router;