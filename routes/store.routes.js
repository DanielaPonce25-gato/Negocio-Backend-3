import express from "express";
import {
    createStore,
    getStores,
    getStoreById,
    getStoresByOwner,
    updateStore,
    deleteStore
} from "../controllers/Store.Controller.js";

const router = express.Router();

router.post("/", createStore);
router.get("/", getStores);
router.get("/:id", getStoreById);
router.get("/owner/:ownerId", getStoresByOwner);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);

export default router;
