
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



/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *           encoding:
 *             images:
 *              contentType: image/jpeg, image/png, image/webp, image/gif
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Producto creado exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Ruta para crear un nuevo producto
router.post("/", upload.array("images", 5), productController.createProduct);


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Productos obtenidos exitosamente
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Ruta para obtener todos los productos
router.get("/", productController.getProducts);


/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     summary: Obtener todas las categorías de productos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Categorías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Categorías obtenidas correctamente
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Tecnología
 *                     - Hogar
 *                     - Deportes
 *                     - Belleza
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Ruta para obtener las categorías de productos
router.get("/categories", productController.getCategories);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *           example: 6a3841d427bd86f9b641c6ca
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Producto obtenido correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Ruta para obtener un producto por su ID
router.get("/:id", productController.getProductById);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto por su ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *           example: 6a41513d757800b4ba8d9e96
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *           encoding:
 *             images:
 *              contentType: image/jpeg, image/png, image/webp, image/gif
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: success
 *                  message:
 *                    type: string
 *                    example: Producto actualizado correctamente
 *                  payload:
 *                    $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */

// Ruta para actualizar un producto por su ID
router.put("/:id", upload.array("images", 5), productController.updateProduct);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *           example: 66b5b0a5d3c9d7f5b8d2e123
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Producto eliminado correctamente
 *                 payload:
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Error al eliminar el recurso
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
*/

// Ruta para eliminar un producto por su ID
router.delete("/:id", productController.deleteProduct);

export default router;
