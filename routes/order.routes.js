
import { Router } from "express";
import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    getOrdersByBuyer,
    getOrdersByStore,
    updateOrderPriority,
    updateOrderProof,
    updateOrderStatus
} from "../controllers/Order.Controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/buyer/:buyerId", getOrdersByBuyer);
router.get("/store/:storeId", getOrdersByStore);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/priority", updateOrderPriority);
router.patch("/:id/proof", updateOrderProof);
router.delete("/:id", deleteOrder);

export default router;