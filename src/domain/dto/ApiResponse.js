/**
 * Clase que representa la respuesta de la API
 */
class ApiResponse {
    constructor(status, data, error = null) {
        this.status = status;
        this.data = data;
        this.error = error;
    }

    /**
     * Crea una respuesta exitosa
     * @param {any} data - Los datos de la respuesta
     * @returns {ApiResponse} Una nueva instancia de ApiResponse
     */
    static success(data) {
        return new ApiResponse('success', data);
    }

    /**
     * Crea una respuesta de error
     * @param {string} message - El mensaje de error
     * @param {number} statusCode - El código de estado HTTP
     * @returns {ApiResponse} Una nueva instancia de ApiResponse
     */
    static error(message, statusCode) {
        return new ApiResponse('error', null, { message, statusCode });
    }
}

module.exports = { ApiResponse };