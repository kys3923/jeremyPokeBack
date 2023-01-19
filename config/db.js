const mongoose = require('mongoose');

const connectDB = async () => {
  try { 
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('DB connected')
  } catch (e) {
    console.log(e, 'error at connecting to DB')
    process.exit(1)
  }
};

module.exports = connectDB;