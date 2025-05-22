require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3060,
    EXTERNAL_API_URL_1: process.env.EXTERNAL_API_URL_1,
    EXTERNAL_API_URL_2: process.env.EXTERNAL_API_URL_2,
};

module.exports = { config };