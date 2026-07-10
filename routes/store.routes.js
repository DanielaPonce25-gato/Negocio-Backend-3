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

router.post("/", upload.array("images", 5), createStore);
router.get("/", getStores);
router.get("/:id", getStoreById);
router.get("/owner/:ownerId", getStoresByOwner);
router.put("/:id", upload.array("images", 5), updateStore);
router.delete("/:id", deleteStore);

export default router;
