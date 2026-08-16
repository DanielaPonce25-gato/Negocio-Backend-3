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
    fileSize: 3 * 1024 * 1024,
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
 *       - Stores
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/StoreCreate'
 *     responses:
 *       201:
 *         description: Tienda creada exitosamente
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
 *                   example: Tienda creada exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/Store'
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
router.post("/", upload.array("images", 5), createStore);


/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Obtener todas las tiendas
 *     tags:
 *       - Stores
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
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
*/

router.get("/", getStores);


/**
 * @swagger
 * /api/stores/owner/{ownerId}:
 *   get:
 *     summary: Obtener todas las tiendas de un propietario
 *     tags:
 *       - Stores
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

router.get("/owner/:ownerId", getStoresByOwner);


/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Obtener una tienda por su ID
 *     tags:
 *       - Stores
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

router.get("/:id", getStoreById);


/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Actualizar una tienda por su ID
 *     tags:
 *       - Stores
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
 *             $ref: '#/components/schemas/StoreUpdate'
 *     responses:
 *       200:
 *         description: Tienda actualizada exitosamente
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
 *                   example: Tienda actualizada exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/Store'
 *       400:
 *         description: Error al actualizar el recurso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tienda no encontrada
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

router.put("/:id", upload.array("images", 5), updateStore);


/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Eliminar una tienda por su ID
 *     tags:
 *       - Stores
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
 *                    example: Tienda eliminada correctamente
 *                  payload:
 *                    nullable: true
 *                    example: null
 *       400:
 *         description: Error al eliminar el recurso
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tienda no encontrada
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

router.delete("/:id", deleteStore);

export default router;
