import express from "express";
import multer from "multer";
import {
    createStore,
    getStores,
    getStoreById,
    getStoresByOwner,
    updateStore,
    deleteStore
} from "../controllers/Store.Controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const fileExtension = file.originalname.split(".").pop();
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
 * /api/stores:
 *   post:
 *     summary: Crear una nueva tienda
 *     tags:
 *       - Tiendas
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - owner
 *               - name
 *               - address
 *             properties:
 *               owner:
 *                 type: string
 *                 description: ID del propietario de la tienda
 *                 example: 66b5b0a5d3c9d7f5b8d2e456
 *               name:
 *                 type: string
 *                 example: Tienda Daniela
 *               description:
 *                 type: string
 *                 example: Venta de artículos para el hogar.
 *               address:
 *                 type: string
 *                 example: Av. Siempre Viva 123
 *               phone:
 *                 type: string
 *                 example: 1122334455
 *               email:
 *                 type: string
 *                 format: email
 *                 example: tienda@gmail.com
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               images:
 *                 type: array
 *                 description: Imágenes de la tienda
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Tienda creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       400:
 *         description: Error al crear el recurso
 *       500:
 *         description: Error interno del servidor
*/
router.post("/", upload.array("images", 5), createStore);


/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Obtener todas las tiendas
 *     tags:
 *       - Tiendas
 *     responses:
 *       200:
 *         description: Tiendas obtenidas exitosamente
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
 *                   example: Tiendas obtenidas exitosamente
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *       500:
 *         description: Error interno del servidor
*/

router.get("/", getStores);


/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Obtener una tienda por su ID
 *     tags:
 *       - Tiendas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tienda
 *         schema:
 *           type: string
 *           example: 66b5b0a5d3c9d7f5b8d2e999
 *     responses:
 *       200:
 *         description: Tienda obtenida exitosamente
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
 *                   example: Tienda obtenida exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/Store'
 *       404:
 *         description: Tienda no encontrada
 *       500:
 *         description: Error interno del servidor
*/

router.get("/:id", getStoreById);


/**
 * @swagger
 * /api/stores/owner/{ownerId}:
 *   get:
 *     summary: Obtener todas las tiendas de un propietario
 *     tags:
 *       - Tiendas
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: ID del propietario
 *         schema:
 *           type: string
 *           example: 66b5b0a5d3c9d7f5b8d2e456
 *     responses:
 *       200:
 *         description: Tiendas del propietario obtenidas exitosamente
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
 *                   example: Tiendas obtenidas exitosamente
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *       404:
 *         description: Tienda no encontrada
 *       500:
 *         description: Error interno del servidor
*/

router.get("/owner/:ownerId", getStoresByOwner);


/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Actualizar una tienda por su ID
 *     tags:
 *       - Tiendas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tienda
 *         schema:
 *           type: string
 *           example: 66b5b0a5d3c9d7f5b8d2e999
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: ID del propietario
 *                 example: 66b5b0a5d3c9d7f5b8d2e456
 *               name:
 *                 type: string
 *                 example: Tienda Daniela
 *               description:
 *                 type: string
 *                 example: Venta de artículos para el hogar.
 *               address:
 *                 type: string
 *                 example: Av. Siempre Viva 123
 *               phone:
 *                 type: string
 *                 example: 1122334455
 *               email:
 *                 type: string
 *                 format: email
 *                 example: tienda@gmail.com
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               images:
 *                 type: array
 *                 description: Imágenes de la tienda
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Tienda actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       400:
 *         description: Error al actualizar el recurso
 *       404:
 *         description: Error al obtener el recurso
 *       500:
 *         description: Error interno del servidor
*/

router.put("/:id", upload.array("images", 5), updateStore);


/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Eliminar una tienda por su ID
 *     tags:
 *       - Tiendas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tienda
 *         schema:
 *           type: string
 *           example: 66b5b0a5d3c9d7f5b8d2e999
 *     responses:
 *       200:
 *         description: Tienda eliminada exitosamente
 *       400:
 *         description: Error al eliminar el recurso
 *       404:
 *         description: Tienda no encontrada
 *       500:
 *         description: Error interno del servidor
*/

router.delete("/:id", deleteStore);

export default router;
