
import { ERROR_DICTIONARY } from "./errorDictionary.js";

export function apiResponse(res, statusCodeOrOptions = 200, message, data = null) {
    let statusCode = statusCodeOrOptions;
    let payload = data;

    if (typeof statusCodeOrOptions === "object" && statusCodeOrOptions !== null) {
        const options = statusCodeOrOptions;
        statusCode = options.statusCode ?? 200;
        message = options.message;
        payload = options.payload ?? options.data ?? null;
    }

    return res.status(statusCode).json({
        status: "success",
        message,
        payload
    });
}

export function apiErrorResponse(res, statusCode = 500, message = "Internal Server Error", error = null) {
    return res.status(statusCode).json({
        status: "error",
        message,
        error
    });
}

export function createError(code, customMessage = null){
    
    const errorDefinition = ERROR_DICTIONARY[code] || ERROR_DICTIONARY.INTERNAL_SERVER_ERROR;

    const error = new Error(customMessage || errorDefinition.message);
    
    error.statusCode = errorDefinition.statusCode;
    error.code = ERROR_DICTIONARY[code] ? code : "INTERNAL_SERVER_ERROR";

    return error;
}