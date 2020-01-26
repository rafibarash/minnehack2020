const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI: db } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, options);
    console.log('Mongo DB connected.');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
