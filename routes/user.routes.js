import { Router } from "express";
import * as userController from "../controllers/User.Controller.js";
import uploads, {
    uploadDocument,
    uploadOptional
} from "../middleware/uploads.middleware.js";

const router = Router();


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *           encoding:
 *             images:
 *               contentType: image/jpeg, image/png, image/webp, image/gif
 *             document:
 *               contentType: application/pdf
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
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
 *                   example: Usuario creado exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: Error al crear el recurso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       409:
 *         description: Ya existe un usuario con ese correo electrónico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Crear usuario 
router.post(
    "/",
    uploads,
    userController.createUser
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente.
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
 *                   example: Usuarios obtenidos exitosamente
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Obtener todos los usuarios
router.get("/", userController.getUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *           example: "6a640f1fbcd850ff340b21f2"
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente.
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
 *                   example: Usuario obtenido exitosamente
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *          description: Datos de entrada inválidos.
 *          content:
 *               application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Error al obtener el recurso.
 *         content:
 *              application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ErrorResponse'
*/

// Obtener usuario por ID
router.get("/:id", userController.getUserById);


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *           example: "6a6410e5bcd850ff340b21f9"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *           encoding:
 *             images:
 *               contentType: image/jpeg, image/png, image/webp, image/gif
 *             document:
 *               contentType: application/pdf
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                    type: string
 *                    example: success
 *                message:
 *                   type: string
 *                   example: Usuario actualizado exitosamente
 *                payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al actualizar el recurso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
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

// Actualizar usuario por ID
router.put(
    "/:id",
    uploadOptional,
    userController.updateUser
);



/**
 * @swagger
 * /api/users/{id}/documents:
 *   post:
 *     summary: Agrega un documento a un usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *         example: "6a640f1fbcd850ff340b21f2"
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *               - type
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Documento en formato PDF
 *               type:
 *                 type: string
 *                 enum:
 *                   - user_document
 *                   - driver_license
 *                   - delivery_proof
 *                 description: Tipo de documento
 *                 example: user_document
 *           encoding:
 *             document:
 *               contentType: application/pdf
 *
 *     responses:
 *       200:
 *         description: Documento agregado correctamente.
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
 *                   example: Documento agregado correctamente!
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *
 *       400:
 *         description: Debe adjuntar un archivo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post(
    "/:id/documents",
    uploadDocument,
    userController.uploadUserDocuments
);



/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *           example: "687f9463c79a0f4c2f8d91a1"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
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
 *                   example: "Usuario eliminado exitosamente"
 *                 payload:
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

// Eliminar usuario por ID
router.delete("/:id", userController.deleteUser);




export default router;
