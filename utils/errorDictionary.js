
export const ERROR_DICTIONARY = {

    // Operaciones CRUD
    CREATE_ERROR: {
        statusCode: 400,
        message: "Error al crear el recurso"
    },

    UPDATE_ERROR: {
        statusCode: 400,
        message: "Error al actualizar el recurso"
    },

    DELETE_ERROR: {
        statusCode: 400,
        message: "Error al eliminar el recurso"
    },

    GET_ERROR: {
        statusCode: 404,
        message: "Error al obtener el recurso"
    },

    GET_ALL_ERROR: {
        statusCode: 404,
        message: "Error al obtener los recursos"
    },


    // Validaciones
    VALIDATION_ERROR: {
        statusCode: 400,
        message: "Datos de entrada inválidos"
    },

    // Recursos
    USER_NOT_FOUND: {
        statusCode: 404,
        message: "Usuario no encontrado"
    },

    PRODUCT_NOT_FOUND: {
        statusCode: 404,
        message: "Producto no encontrado"
    },

    STORE_NOT_FOUND: {
        statusCode: 404,
        message: "Tienda no encontrada"
    },

    ORDER_NOT_FOUND: {
        statusCode: 404,
        message: "Orden no encontrada"
    },

    USER_ALREADY_EXISTS: {
        statusCode: 409,
        message: "Ya existe un usuario con ese correo electrónico"
    },

    // Rutas y servidor
    ROUTE_NOT_FOUND: {
        statusCode: 404,
        message: "Ruta no encontrada"
    },

    DATABASE_ERROR: {
        statusCode: 500,
        message: "Error en la base de datos"
    },

    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Error interno del servidor"
    }


    
};
