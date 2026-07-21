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

// Crear usuario
router.post("/", upload.array("images", 5) ,userController.createUser);

// Obtener todos los usuarios
router.get("/", userController.getUsers);

// Obtener usuario por ID
router.get("/:id", userController.getUserById);

// Actualizar usuario por ID
router.put("/:id", upload.array("images", 5),userController.updateUser);

// Eliminar usuario por ID
router.delete("/:id", userController.deleteUser);

export default router;
