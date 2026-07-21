import express from "express";
import cors from "cors";

import "./models/Store.js";

import { envConfig } from "./config/env.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import storeRoutes from "./routes/store.routes.js";
import mockRoutes from "./routes/mock.routes.js";
import vistaRoutes from "./routes/views.routes.js";

import errorHandler from "./middleware/MiddlewareGlobal.js";
import { notFoundHandler } from "./middleware/INVALID_ROUTE.js";

import { addLogger } from "./middleware/logger.middleware.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/css", express.static("css"));
app.use("/tools", express.static("tools"));

app.use(addLogger);


// Rutas de productos
app.use("/api/products", productRoutes);   

// Rutas de usuarios
app.use("/api/users", userRoutes);

// Rutas de ordenes
app.use("/api/orders", orderRoutes);

// Rutas de tiendas
app.use("/api/stores", storeRoutes);


app.use("/", vistaRoutes);

if (envConfig.nodeEnv === "development") {
    app.use("/api/mocks", mockRoutes);
}


app.get("/api", (req, res) => {
    res.json({
        status: "success",
        message: "ShipNow API"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "success",
        message: "API funcionando"
    });
});


/*
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada"
    });
});
*/

app.use(notFoundHandler);
app.use(errorHandler);


export default app;
