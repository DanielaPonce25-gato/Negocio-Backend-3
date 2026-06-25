import { Router } from "express";
import * as userController from "../controllers/UserController.js";

const router = Router();

// Crear usuario
router.post("/", userController.createUser);

// Obtener todos los usuarios
router.get("/", userController.getUsers);

// Obtener usuario por ID
router.get("/:id", userController.getUserById);

// Actualizar usuario por ID
router.put("/:id", userController.updateUser);

// Eliminar usuario por ID
router.delete("/:id", userController.deleteUser);

export default router;
