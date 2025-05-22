const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { config } = require('./config/config');
const { promptController } = require('./controllers/promptController');

const app = express();

// Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Procesamiento de Prompts',
      version: '1.0.0',
      description: 'API para procesar prompts y obtener respuestas de APIs externas',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/controllers/*.js'], // Rutas a los archivos con anotaciones Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', promptController);

// Iniciar servidor
app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en puerto ${config.PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${config.PORT}/api-docs`);
});