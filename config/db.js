const mongoose = require('mongoose');
const {MONGO_USERNAME, MONGO_PASSWORD} = require('../config/config');
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.poplm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to DB");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  module.exports = InitiateMongoServer;