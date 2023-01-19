const User = require('../models/User');
const crypto = require('crypto');

exports.register = async (req, res) => {

  const { email, password, username, address, contact } = req.body;

  // validation
  if (!username || !email || !password ) {
    res.status(400).json({
      success: false,
      message: 'Please provide all information'
    })
  }

  const userExists = await User.findOne({ email })

  if(!!userExists) {
    res.status(400).json({
      success: false,
      message: 'Provided email already exists'
    })
  }

  try {
    const user = await User.create({
      email,
      password,
      username,
      address,
      contact,
    })

    sendToken(user, 201, res)
  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error at creating user in DB'
    })
  }
}

exports.login = async (req, res) => {
  console.log( req.body )
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'please check your email/password'
    })
  }

  try {
    const user = await User.findOne({email}).select('+password');
    if(!user) {
      return res.status(401).json({
        success: false,
        message: 'no user found'
      })
    }

    const isMatch = await user.matchPasswords(password);

    if(!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'please check your password'
      })
    }

    sendToken(user, 200, res);
  } catch (e) {
    console.log(e)
    res.json({
      success: false,
      message: 'error at login with DB'
    })
  }
}

exports.viewAll = async (req, res) => {
  console.log('you have reached to the backend succeesfully')
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
    user: user,
  })
}