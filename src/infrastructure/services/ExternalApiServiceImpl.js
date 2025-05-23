const axios = require('axios');
const { config } = require('../../config/config');
const { IExternalApiService } = require('../../domain/interfaces/IExternalApiService');
const { AppError } = require('../../middleware/errorHandler');

/**
 * Implementación del servicio de APIs externas
 */
class ExternalApiServiceImpl extends IExternalApiService {
    /**
     * Configuración común para las peticiones HTTP
     */
    #getCommonConfig() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    /**
     * @inheritdoc
     */
    async getContext(question) {
        try {
            const response = await axios.post(
                config.API_CHROMA,
                { question },
                this.#getCommonConfig()
            );

            if (!response.data || !response.data.response) {
                throw new AppError('Respuesta inválida de la base de datos', 500);
            }

            return response.data.response;
        } catch (error) {
            throw new AppError(
                'Error en la comunicación con la base de datos',
                error.response?.status || 500
            );
        }
    }

    /**
     * @inheritdoc
     */
    async getAIResponse(question) {
        try {
            const response = await axios.post(
                config.API_OLLAMA,
                {
                    model: 'gemma3',
                    prompt: question,
                    stream: false
                },
                this.#getCommonConfig()
            );

            if (!response.data || !response.data.response) {
                throw new AppError('Respuesta inválida de la IA', 500);
            }

            return response.data.response;
        } catch (error) {
            throw new AppError(
                'Error en la comunicación con la IA',
                error.response?.status || 500
            );
        }
    }
}

module.exports = { ExternalApiServiceImpl };