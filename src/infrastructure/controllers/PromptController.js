const express = require('express');
const { ApiResponse } = require('../../domain/dto/ApiResponse');
const { AppError } = require('../../middleware/errorHandler');

/**
 * Controlador para el manejo de prompts
 */
class PromptController {
    /**
     * @param {import('../../domain/interfaces/IPromptService').IPromptService} promptService
     */
    constructor(promptService) {
        this.promptService = promptService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    /**
     * Inicializa las rutas del controlador
     */
    initializeRoutes() {
        /**
         * @swagger
         * /api/process-prompt:
         *   post:
         *     summary: Procesa un prompt y obtiene una respuesta
         *     tags: [Prompts]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - prompt
         *             properties:
         *               prompt:
         *                 type: string
         *                 description: El texto del prompt a procesar
         *     responses:
         *       200:
         *         description: Prompt procesado exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ApiResponse'
         *       400:
         *         description: Error en la solicitud
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ApiResponse'
         *       500:
         *         description: Error interno del servidor
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/ApiResponse'
         */
        this.router.post('/process-prompt', this.processPrompt.bind(this));
    }

    /**
     * Procesa un prompt y devuelve una respuesta
     */
    async processPrompt(req, res, next) {
        try {
            const { prompt } = req.body;

            const result = await this.promptService.processPrompt(prompt);
            res.json({ response: result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Retorna el router configurado
     */
    getRouter() {
        return this.router;
    }
}

module.exports = { PromptController };