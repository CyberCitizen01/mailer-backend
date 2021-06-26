const mongoose = require('mongoose');
const {MONGO} = require('../config/config');
const uri = `mongodb+srv://${MONGO.USERNAME}:${MONGO.PASSWORD}@${MONGO.CLUSTER}.poplm.mongodb.net/${MONGO.DB}?retryWrites=true&w=majority`;

module.exports =  InitiateMongoServer = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log(`Connected to db: ${MONGO.DB} at cluster: ${MONGO.CLUSTER}`);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
