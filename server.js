const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'server is running'
  })
})


// controllers
app.use('/auth', require('./routes/auth'));

let server = app.listen(process.env.PORT || 8000, () => console.log(`Server is working at 8000`))

module.exports = server;