const { ExternalApiServiceImpl } = require('../infrastructure/services/ExternalApiServiceImpl');
const { PromptServiceImpl } = require('../infrastructure/services/PromptServiceImpl');
const { PromptController } = require('../infrastructure/controllers/PromptController');

/**
 * Configuración de las dependencias de la aplicación
 */
class DependencyContainer {
    static #instance;

    constructor() {
        if (DependencyContainer.#instance) {
            return DependencyContainer.#instance;
        }
        DependencyContainer.#instance = this;

        this.initializeDependencies();
    }

    /**
     * Inicializa todas las dependencias de la aplicación
     */
    initializeDependencies() {
        // Servicios de infraestructura
        this.externalApiService = new ExternalApiServiceImpl();

        // Servicios de aplicación
        this.promptService = new PromptServiceImpl(this.externalApiService);

        // Controladores
        this.promptController = new PromptController(this.promptService);
    }

    /**
     * Obtiene la instancia del contenedor de dependencias
     */
    static getInstance() {
        if (!DependencyContainer.#instance) {
            DependencyContainer.#instance = new DependencyContainer();
        }
        return DependencyContainer.#instance;
    }

    /**
     * Obtiene el controlador de prompts configurado
     */
    getPromptController() {
        return this.promptController;
    }
}

module.exports = { DependencyContainer };