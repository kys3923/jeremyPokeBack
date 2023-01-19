const express = require('express');
const router = express.Router();

const { register, login, viewAll } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/viewAll').get(viewAll);

module.exports = router;