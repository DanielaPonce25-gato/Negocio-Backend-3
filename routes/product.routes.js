
import { Router } from "express";
import multer from "multer";
import * as productController from "../controllers/Product.Controller.js";

const router = Router();

const storage = multer.diskStorage({ // define donde va a guardar los archivos subidos 

    destination: (req, file, cb) => { // archivo sacado en caso en carpeta uploads
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {  
        const timestamp = Date.now(); // genera un nombre unico para cada imagen subida
        const fileExtension = file.originalname.split(".").pop(); // extension del archivo (jpg, png, etc.)
        cb(null, `${timestamp}-${file.fieldname}.${fileExtension}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"]; 
        cb(null, allowed.includes(file.mimetype));
    }
});

// Ruta para crear un nuevo producto
router.post("/", upload.array("images", 5), productController.createProduct);

// Ruta para obtener todos los productos
router.get("/", productController.getProducts);

// Ruta para obtener las categorías de productos
router.get("/categories", productController.getCategories);

// Ruta para obtener un producto por su ID
router.get("/:id", productController.getProductById);

// Ruta para actualizar un producto por su ID
router.put("/:id", upload.array("images", 5), productController.updateProduct);

// Ruta para eliminar un producto por su ID
router.delete("/:id", productController.deleteProduct);

export default router;
