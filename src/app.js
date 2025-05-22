const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { config } = require('./config/config');
const { DependencyContainer } = require('./config/dependencies');
const { errorHandler } = require('./middleware/errorHandler');

/**
 * Configuración de Swagger
 */
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
        components: {
            schemas: {
                ApiResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['success', 'error'],
                            description: 'Estado de la respuesta',
                        },
                        data: {
                            type: 'object',
                            nullable: true,
                            description: 'Datos de la respuesta en caso de éxito',
                        },
                        error: {
                            type: 'object',
                            nullable: true,
                            properties: {
                                message: {
                                    type: 'string',
                                    description: 'Mensaje de error',
                                },
                                statusCode: {
                                    type: 'integer',
                                    description: 'Código de estado HTTP',
                                },
                            },
                            description: 'Información del error en caso de fallo',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/infrastructure/controllers/*.js'],
};

/**
 * Clase principal de la aplicación
 */
class App {
    constructor() {
        this.app = express();
        this.dependencyContainer = DependencyContainer.getInstance();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    /**
     * Configura los middleware globales
     */
    setupMiddleware() {
        this.app.use(express.json());
        
        // Configuración de Swagger
        const swaggerDocs = swaggerJsdoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    /**
     * Configura las rutas de la aplicación
     */
    setupRoutes() {
        const promptController = this.dependencyContainer.getPromptController();
        this.app.use('/api', promptController.getRouter());
    }

    /**
     * Configura el manejo de errores global
     */
    setupErrorHandling() {
        this.app.use(errorHandler);
    }

    /**
     * Inicia el servidor
     */
    start() {
        this.app.listen(config.PORT, () => {
            console.log(`Servidor corriendo en puerto ${config.PORT}`);
            console.log(`Documentación Swagger disponible en http://localhost:${config.PORT}/api-docs`);
        });
    }
}

module.exports = { App };