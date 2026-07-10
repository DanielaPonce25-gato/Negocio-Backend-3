import { Router } from "express";

import {
    getMockUsers,
    getMockProducts,
    getMockOrders,
    getMockStores,
    getAllMockData,
    generateData
} from "../controllers/MockData.Controller.js";


const router = Router();

// Solo generan datos (NO guardan en la base)
router.get("/mockingusers", getMockUsers);
router.get("/mockingproducts", getMockProducts);
router.get("/mockingorders", getMockOrders);
router.get("/mockingstores", getMockStores);
router.get("/mockingall", getAllMockData);

// Genera y guarda en MongoDB
router.post("/generateData", generateData);

export default router;

