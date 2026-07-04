
import { apiErrorResponse , createError } from "../utils/apiResponse.js";

// middleware que centra los errores de la api

const errorHandler = (err, req, res, next) => {
    
    let handledError = err;

    // Si nos envian un id de mongodb invalido
    if (handledError.name === "CastError") {
        handledError = createError("VALIDATION_ERROR", "ID invalido");
    }

    return apiErrorResponse(res,
        handledError.statusCode || 500,
        handledError.message || "Error interno del servidor",
        handledError.code || "INTERNAL_SERVER_ERROR"
    );
}


export default errorHandler;