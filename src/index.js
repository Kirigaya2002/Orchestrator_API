const express = require('express');
const { config } = require('./config/config');
const { promptController } = require('./controllers/promptController');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', promptController);

// Iniciar servidor
app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en puerto ${config.PORT}`);
});