require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3060,
    API_CHROMA: process.env.API_CHROMA,
    API_OLLAMA: process.env.API_OLLAMA,
};

module.exports = { config };