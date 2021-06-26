const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO:{
        USERNAME: process.env.MONGO_USERNAME,
        PASSWORD: process.env.MONGO_PASSWORD,
        DB: process.env.MONGO_DB,
        CLUSTER: process.env.MONGO_CLUSTER,
    },
    JWT_SECRET: process.env.JWT_SECRET || 'flash',
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || '1h',
}