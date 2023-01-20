const express = require('express');
const router = express.Router();

const { search, favSave, favView } = require('../controllers/poke');

router.route('/search/:id').post(search);
router.route('/favorite').post(favSave);
router.route('/favorite/view').post(favView);

module.exports = router;