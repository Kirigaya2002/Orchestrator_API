const { ExternalApiService } = require('./externalApiService');
const { AppError } = require('../middleware/errorHandler');

class PromptService {
    constructor() {
        this.externalApiService = new ExternalApiService();
    }

    async processPrompt(prompt) {
        try {
            // Llamada a la primera API externa
            const contextResponse = await this.externalApiService.getContext(prompt);
            if (!contextResponse) {
                throw new AppError('No se pudo obtener el contexto del prompt', 400);
            }

            // Crear mensaje completo
            const fullMessage = `Mensaje del usuario: ${prompt}\nContexto encontrado en la db: ${contextResponse}\nRespuesta de la IA: `;

            // Llamada a la segunda API externa
            const finalResponse = await this.externalApiService.getAIResponse(fullMessage);
            if (!finalResponse) {
                throw new AppError('No se pudo generar una respuesta de la IA', 500);
            }

            return finalResponse;
        } catch (error) {
            console.error('Error en el servicio de prompt:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError(
                error.message || 'Error al procesar el prompt',
                error.statusCode || 500
            );
        }
    }
}

module.exports = { PromptService };