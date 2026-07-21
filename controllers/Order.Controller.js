
import * as orderService from "../services/Order.Service.js";
import { apiResponse } from "../utils/apiResponse.js";


export const createOrder = async (req, res, next) => {
    try {

        req.logger.info("Intentando crear orden");

        const order = await orderService.createOrder(req.body);

        req.logger.info(`Orden creada correctamente id: ${order._id}`);

        return apiResponse(res, {
            statusCode: 201,
            message: "Orden creada exitosamente", 
            payload: order
        });

    } catch (err) {

        req.logger.error(`Error al crear orden: ${err.message}`);

        next(err); // Pasa el error al middleware de manejo de errores
    }
};

export const getOrders = async (req, res, next) => {
    try {

        req.logger.info("Obteniendo lista de órdenes");

        const orders = await orderService.getOrders();

        req.logger.info(`Órdenes obtenidas: ${orders.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Órdenes obtenidas exitosamente", 
            payload: orders
        });

    } catch (err) {

        req.logger.error(`Error al obtener órdenes: ${err.message}`);

        next(err); 
    }
};

export const getOrderById = async (req, res, next) => {
    try {

        req.logger.info(`Buscando orden id: ${req.params.id}`);

        const order = await orderService.getOrderById(req.params.id);

        if (!order) {

            req.logger.warning(`Orden no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Orden no encontrada" 
            });
        }

        req.logger.info(`Orden encontrada id: ${order._id}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Orden obtenida exitosamente", 
            payload: order
        });

    } catch (err) {

        req.logger.error(`Error al buscar orden: ${err.message}`);

        next(err);
    }
};

export const getOrdersByBuyer = async (req, res, next) => {
    try {

        req.logger.info(`Buscando órdenes del comprador: ${req.params.buyerId}`);

        const orders = await orderService.getOrdersByBuyer(req.params.buyerId);

        req.logger.info(`Órdenes encontradas: ${orders.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Órdenes del comprador obtenidas exitosamente", 
            payload: orders
        });

    } catch (err) {

        req.logger.error(`Error al buscar órdenes del comprador: ${err.message}`);

        next(err);
    }
};

export const getOrdersByStore = async (req, res, next) => {
    try {

        req.logger.info(`Buscando órdenes de la tienda: ${req.params.storeId}`);

        const orders = await orderService.getOrdersByStore(req.params.storeId);

        req.logger.info(`Órdenes encontradas: ${orders.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Órdenes de la tienda obtenidas exitosamente", 
            payload: orders
        });

    } catch (err) {

        req.logger.error(`Error al buscar órdenes de tienda: ${err.message}`);

        next(err);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {

        req.logger.info(`Actualizando estado de orden id: ${req.params.id}`);

        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);


        if (!order) {

            req.logger.warning(`Orden no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Orden no encontrada" 
            });
        }

        req.logger.info(`Estado de orden actualizado: ${order.status}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Estado de la orden actualizado exitosamente", 
            payload: order
        });

    } catch (err) {

        req.logger.error(`Error al actualizar estado de orden: ${err.message}`);

        next(err);
    }
};

export const updateOrderPriority = async (req, res, next) => {
    try {

        req.logger.info(`Actualizando prioridad de orden id: ${req.params.id}`);

        const order = await orderService.updateOrderPriority(req.params.id, req.body.priority);

        if (!order) {

            req.logger.warning(`Orden no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Orden no encontrada" 
            });
        }

        req.logger.info(`Prioridad actualizada: ${order.priority}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Prioridad de la orden actualizada exitosamente", 
            payload: order
        });

    } catch (err) {

        req.logger.error(`Error al actualizar prioridad de orden: ${err.message}`);

        next(err);
    }
};

export const updateOrderProof = async (req, res, next) => {
    try {


        req.logger.info(`Actualizando comprobante de orden id: ${req.params.id}`);

        const order = await orderService.updateOrderProof(req.params.id, req.body.proof);

        if (!order) {

            req.logger.warning(`Orden no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Orden no encontrada" 
            });
        }

        req.logger.info(`Comprobante actualizado correctamente orden id: ${req.params.id}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Comprobante de la orden actualizado exitosamente", 
            payload: order
        });

    } catch (err) {

        req.logger.error(`Error al actualizar comprobante: ${err.message}`);

        next(err);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {

        req.logger.warn(`Eliminando orden id: ${req.params.id}`);

        const deleted = await orderService.deleteOrder(req.params.id);

        if (!deleted) {

            req.logger.warning(`Orden no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Orden no encontrada" 
            });
        }

        req.logger.info(`Orden eliminada correctamente id: ${req.params.id}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Orden eliminada exitosamente", 
            payload: null
        });

    } catch (err) {

        req.logger.error(`Error al eliminar orden: ${err.message}`);

        next(err);
    }
};
