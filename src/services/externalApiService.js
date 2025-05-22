const axios = require('axios');
const { config } = require('../config/config');

class ExternalApiService {
    async getContext(prompt) {
        try {
            const response = await axios.post(config.EXTERNAL_API_URL_1, {
                prompt: prompt
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.response;
        } catch (error) {
            console.error('Error al llamar a la API externa 1:', error);
            throw new Error('Error en la comunicación con la API externa 1');
        }
    }

    async getAIResponse(message) {
        try {
            const response = await axios.post(config.EXTERNAL_API_URL_2, {
                message: message
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.response;
        } catch (error) {
            console.error('Error al llamar a la API externa 2:', error);
            throw new Error('Error en la comunicación con la API externa 2');
        }
    }
}

module.exports = { ExternalApiService };