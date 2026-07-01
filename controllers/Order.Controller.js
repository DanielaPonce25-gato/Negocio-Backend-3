
import * as orderService from "../services/Order.Service.js";

const handleError = (res, error) => {
    const status = error.status || 400;
    return res.status(status).json({
        status: "error",
        message: error.message || "Error en la operación con órdenes"
    });
};

export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        return res.status(201).json({ status: "success", data: order });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        return res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }
        return res.status(200).json({ status: "success", data: order });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getOrdersByBuyer = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByBuyer(req.params.buyerId);
        return res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getOrdersByStore = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByStore(req.params.storeId);
        return res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }
        return res.status(200).json({ status: "success", data: order });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateOrderPriority = async (req, res) => {
    try {
        const order = await orderService.updateOrderPriority(req.params.id, req.body.priority);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }
        return res.status(200).json({ status: "success", data: order });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateOrderProof = async (req, res) => {
    try {
        const order = await orderService.updateOrderProof(req.params.id, req.body.proof);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }
        return res.status(200).json({ status: "success", data: order });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await orderService.deleteOrder(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }
        return res.status(200).json({ status: "success", message: "Orden eliminada" });
    } catch (error) {
        return handleError(res, error);
    }
};
