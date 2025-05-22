/**
 * Interface que define los métodos para el procesamiento de prompts
 */
class IPromptService {
    /**
     * Procesa un prompt y genera una respuesta
     * @param {string} prompt - El prompt a procesar
     * @returns {Promise<string>} La respuesta generada
     */
    async processPrompt(prompt) {
        throw new Error('Método no implementado');
    }
}

module.exports = { IPromptService };