const { ExternalApiService } = require('./externalApiService');

class PromptService {
    constructor() {
        this.externalApiService = new ExternalApiService();
    }

    async processPrompt(prompt) {
        try {
            // Llamada a la primera API externa
            const contextResponse = await this.externalApiService.getContext(prompt);

            // Crear mensaje completo
            const fullMessage = `Mensaje del usuario: ${prompt}\nContexto encontrado en la db: ${contextResponse}\nRespuesta de la IA: `;

            // Llamada a la segunda API externa
            const finalResponse = await this.externalApiService.getAIResponse(fullMessage);

            return finalResponse;
        } catch (error) {
            console.error('Error en el servicio de prompt:', error);
            throw new Error('Error al procesar el prompt');
        }
    }
}

module.exports = { PromptService };