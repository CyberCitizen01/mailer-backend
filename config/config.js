const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET || 'flash',
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || '1h',
}