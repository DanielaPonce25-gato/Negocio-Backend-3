// middleware que centra los errores de la api

const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    res.status(err.status || 500).json({
        status: "error",
        controller: req.baseUrl, // muestra desde qué ruta vino
        message: err.message || "Ocurrió un error inesperado"
    });
};

export default errorHandler;