const express = require('express');
const { PromptService } = require('../services/promptService');

const router = express.Router();
const promptService = new PromptService();

router.post('/process-prompt', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'El prompt es requerido' });
        }

        const result = await promptService.processPrompt(prompt);
        res.json({ response: result });
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = { promptController: router };