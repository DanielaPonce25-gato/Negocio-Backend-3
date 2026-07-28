
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
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - stock
 *               - category
 *               - seller
 *             properties:
 *               title:
 *                 type: string
 *                 example: Notebook Lenovo
 *               description:
 *                 type: string
 *                 example: Notebook Lenovo IdeaPad 15 pulgadas
 *               price:
 *                 type: number
 *                 example: 950000
 *               stock:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: Tecnología
 *               seller:
 *                 type: string
 *                 description: ID del usuario vendedor
 *                 example: 66b5b0a5d3c9d7f5b8d2e456
 *               images:
 *                 type: array
 *                 description: Imágenes del producto
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
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
 *                   example: Producto creado correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para crear un nuevo producto
router.post("/", upload.array("images", 5), productController.createProduct);


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Error al obtener el recurso
*/

// Ruta para obtener todos los productos
router.get("/", productController.getProducts);


/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     summary: Obtener todas las categorías de productos
 *     tags:
 *       - Productos
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
 *       404:
 *         description: Error al obtener el recurso
*/

// Ruta para obtener las categorías de productos
router.get("/categories", productController.getCategories);


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags:
 *       - Productos
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
 *       500:
 *         description: Error interno del servidor
*/

// Ruta para obtener un producto por su ID
router.get("/:id", productController.getProductById);


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto por su ID
 *     tags:
 *       - Productos
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Notebook Lenovo
 *               description:
 *                 type: string
 *                 example: Notebook Lenovo IdeaPad actualizada
 *               price:
 *                 type: number
 *                 example: 10
 *               stock:
 *                 type: integer
 *                 example: 15
 *               category:
 *                 type: string
 *                 example: Tecnología
 *               seller:
 *                 type: string
 *                 example: 6a640f1fbcd850ff340b21f2
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para actualizar un producto por su ID
router.put("/:id", upload.array("images", 5), productController.updateProduct);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     tags:
 *       - Productos
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
 *       400:
 *         description: Error al eliminar el recurso
 *       500:
 *         description: Error interno del servidor
*/

// Ruta para eliminar un producto por su ID
router.delete("/:id", productController.deleteProduct);

export default router;
