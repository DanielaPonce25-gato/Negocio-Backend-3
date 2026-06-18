
import { Router } from "express";
import productController from "../controllers/";

const router = Router();

router.get("/", productController.getAll);
router.post("/", productController.create);
