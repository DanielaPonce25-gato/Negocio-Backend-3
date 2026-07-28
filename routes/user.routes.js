import { Router } from "express";
import multer from "multer";
import * as userController from "../controllers/User.Controller.js";

const router = Router();

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
 * /api/users:
 *   post:
 *     summary: Crear un usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Daniela
 *               lastName:
 *                 type: string
 *                 example: Ponce
 *               email:
 *                 type: string
 *                 format: email
 *                 example: daniela@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *               role:
 *                 type: string
 *                 enum: [customer, admin, driver, store]
 *                 example: customer
 *               addresses:
 *                 type: string
 *                 description: JSON con las direcciones.
 *                 example: '[{"label":"home","address":"Av. Siempre Viva 123","reference":"Casa azul"}]'
 *               documents:
 *                 type: string
 *                 description: JSON con los documentos.
 *                 example: '[{"user_document", "driver_license", "delivery_proof"}]'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el recurso
 *       409:
 *         description: Ya existe un usuario con ese correo electrónico
*/

// Crear usuario 
router.post("/", upload.array("images", 5) ,userController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Error al obtener los recursos.
*/

// Obtener todos los usuarios
router.get("/", userController.getUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Usuarios
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
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Error al obtener el recurso.
*/

// Obtener usuario por ID
router.get("/:id", userController.getUserById);


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags:
 *       - Usuarios
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Daniela
 *               lastName:
 *                 type: string
 *                 example: Ponce
 *               email:
 *                 type: string
 *                 example: daniela@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 enum:
 *                   - customer
 *                   - admin
 *                   - driver
 *                   - store
 *                 example: customer
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       example: home
 *                     address:
 *                       type: string
 *                       example: Av. Siempre Viva 123
 *                     reference:
 *                       type: string
 *                       example: Casa azul
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - user_document
 *                   - driver_license
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "http://localhost:8000/uploads/foto.jpg"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Error al actualizar el recurso.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
*/

// Actualizar usuario por ID
router.put("/:id", upload.array("images", 5),userController.updateUser);


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags:
 *       - Usuarios
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
 *       404:
 *         description: Error al obtener el recurso
 *       400:
 *         description: Error al eliminar el recurso
*/

// Eliminar usuario por ID
router.delete("/:id", userController.deleteUser);

export default router;
