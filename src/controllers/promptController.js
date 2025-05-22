const express = require('express');
const { PromptService } = require('../services/promptService');
const { AppError, errorHandler } = require('../middleware/errorHandler');

/**
 * @swagger
 * tags:
 *   name: Prompts
 *   description: API para procesamiento de prompts
 */
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
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: Respuesta generada por la IA
 *       400:
 *         description: Error en la solicitud - Prompt no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

const router = express.Router();
const promptService = new PromptService();

router.post('/process-prompt', async (req, res, next) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt || prompt.trim() === '') {
            throw new AppError('El prompt es requerido y no puede estar vacío', 400);
        }

        const result = await promptService.processPrompt(prompt);
        res.json({
            status: 'success',
            data: {
                response: result
            }
        });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(errorHandler);

module.exports = { promptController: router };