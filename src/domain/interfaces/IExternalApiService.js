/**
 * Interface que define los métodos para interactuar con servicios externos
 */
class IExternalApiService {
    /**
     * Obtiene el contexto de una base de datos externa
     * @param {string} prompt - El prompt para buscar contexto
     * @returns {Promise<string>} El contexto encontrado
     */
    async getContext(prompt) {
        throw new Error('Método no implementado');
    }

    /**
     * Obtiene una respuesta de la IA
     * @param {string} message - El mensaje para procesar
     * @returns {Promise<string>} La respuesta de la IA
     */
    async getAIResponse(message) {
        throw new Error('Método no implementado');
    }
}

module.exports = { IExternalApiService };