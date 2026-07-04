
import * as orderService from "../services/Order.Service.js";
import { apiResponse } from "../utils/apiResponse.js";


export const createOrder = async (req, res, next) => {
    try {
        const order = await orderService.createOrder(req.body);

        return apiResponse(res, {
            statusCode: 201,
            message: "Orden creada exitosamente", 
            payload: order
        });

    } catch (err) {
        next(err); // Pasa el error al middleware de manejo de errores
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getOrders();

        return apiResponse(res, {
            statusCode: 200,
            message: "Órdenes obtenidas exitosamente", 
            payload: orders
        });

    } catch (err) {
        next(err); 
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Orden obtenida exitosamente", 
            payload: order
        });

    } catch (err) {
        next(err);
    }
};

export const getOrdersByBuyer = async (req, res, next) => {
    try {
        const orders = await orderService.getOrdersByBuyer(req.params.buyerId);

        return apiResponse(res, {
            statusCode: 200,
            message: "Órdenes del comprador obtenidas exitosamente", 
            payload: orders
        });

    } catch (err) {
        next(err);
    }
};

export const getOrdersByStore = async (req, res, next) => {
    try {
        const orders = await orderService.getOrdersByStore(req.params.storeId);

        return apiResponse(res, {
            statusCode: 200,
            message: "Órdenes de la tienda obtenidas exitosamente", 
            payload: orders
        });

    } catch (err) {
        next(err);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Estado de la orden actualizado exitosamente", 
            payload: order
        });

    } catch (err) {
        next(err);
    }
};

export const updateOrderPriority = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderPriority(req.params.id, req.body.priority);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Prioridad de la orden actualizada exitosamente", 
            payload: order
        });

    } catch (err) {
        next(err);
    }
};

export const updateOrderProof = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderProof(req.params.id, req.body.proof);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Comprobante de la orden actualizado exitosamente", 
            payload: order
        });

    } catch (err) {
        next(err);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const deleted = await orderService.deleteOrder(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Orden no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Orden eliminada exitosamente", 
            payload: null
        });

    } catch (err) {
        next(err);
    }
};
