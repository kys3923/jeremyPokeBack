const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

const { register, login, viewAll, viewAccount } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/viewAll').get(viewAll);
router.route('/view/:id').get(viewAccount)

module.exports = router;