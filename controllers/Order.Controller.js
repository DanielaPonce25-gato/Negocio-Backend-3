
import * as orderService from "../services/Order.Service.js";



export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        return res.status(201).json({ status: "success", data: order });
    } catch (error) {
        const error = new Error("Error al crear la orden");
        error.status = 400;
        throw error;
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        return res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        const error = new Error("Error al obtener las órdenes");
        error.status = 404;
        throw error;
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
        const error = new Error("Error al obtener la orden");
        error.status = 404;
        throw error;
    }
};

export const getOrdersByBuyer = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByBuyer(req.params.buyerId);
        return res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        const error = new Error("Error al obtener las órdenes del comprador");
        error.status = 404;
        throw error;
    }
};

export const getOrdersByStore = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByStore(req.params.storeId);
        return res.status(200).json({ status: "success", data: orders });
    } catch (error) {
        const error = new Error("Error al obtener las órdenes de la tienda");
        error.status = 404;
        throw error;
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
        const error = new Error("Error al actualizar el estado de la orden");
        error.status = 400;
        throw error;
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
        const error = new Error("Error al actualizar la prioridad de la orden");
        error.status = 400;
        throw error;
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
        const error = new Error("Error al actualizar el comprobante de la orden");
        error.status = 400;
        throw error;
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
        const error = new Error("Error al eliminar la orden");
        error.status = 400;
        throw error;
    }
};
