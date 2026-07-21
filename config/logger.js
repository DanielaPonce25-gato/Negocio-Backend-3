

import winston from "winston";




const customLevels = {   
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

    colors: {
        fatal: "magenta",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "white"
    }
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
    levels: customLevels.levels,

    transports: [

        // Consola
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production"
                ? "info"
                : "debug",

            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),

        // Archivo
        new winston.transports.File({
            filename: "./logs/Logging.log",
            level: "warning",

            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            )
        })
    ]
});

export default logger;