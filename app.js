import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// Rutas de productos
app.use("/api/products", productRoutes);   

// Rutas de usuarios
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
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


app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada"
    });
});


export default app;
