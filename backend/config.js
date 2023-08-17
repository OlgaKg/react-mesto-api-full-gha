require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

const config = {
  port: PORT || 3001,
  mongodbURI: MONGODB_URI || 'mongodb://localhost:27017/mestodb',
};

module.exports = config;
