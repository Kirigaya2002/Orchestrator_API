const { IPromptService } = require('../../domain/interfaces/IPromptService');
const { ApiResponse } = require('../../domain/dto/ApiResponse');
const { AppError } = require('../../middleware/errorHandler');

/**
 * Implementación del servicio de procesamiento de prompts
 */
class PromptServiceImpl extends IPromptService {
    /**
     * @param {import('../../domain/interfaces/IExternalApiService').IExternalApiService} externalApiService
     */
    constructor(externalApiService) {
        super();
        this.externalApiService = externalApiService;
    }

    /**
     * @inheritdoc
     */
    async processPrompt(prompt) {
        try {
            // Validación del prompt
            if (!prompt || prompt.trim() === '') {
                throw new AppError('El prompt es requerido y no puede estar vacío', 400);
            }

            // Obtener contexto
            const contextResponse = await this.externalApiService.getContext(prompt);

            // Crear mensaje completo con el contexto
            const fullMessage = `Mensaje del usuario: ${prompt}\nContexto encontrado en la db: ${contextResponse}\nRespuesta de la IA: `;

            // Obtener respuesta final de la IA
            const finalResponse = await this.externalApiService.getAIResponse(fullMessage);

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

module.exports = { PromptServiceImpl };