

import orderRepository from "../repositories/Order.Repository.js";

import { createError } from "../utils/apiResponse.js";

export const createOrder = async (orderData) => {  // crea una nueva orden en la base de datos

    if (!orderData) {

        throw createError(
            "VALIDATION_ERROR",
            "Los datos de la orden son obligatorios."
        );

    }


    if (!orderData.buyer) {

        throw createError(
            "VALIDATION_ERROR",
            "La orden debe tener un comprador."
        );

    }


    if (!orderData.products || !Array.isArray(orderData.products) || orderData.products.length === 0) {

        throw createError(
            "VALIDATION_ERROR",
            "La orden debe contener productos."
        );

    }

    try {

        return await orderRepository.create(orderData);

    } catch {

        throw createError("CREATE_ERROR");
    }
};

export const getOrders = async () => { // obtiene todas las órdenes de la base de datos

    try {

        return await orderRepository.findAll();

    } catch {

        throw createError("GET_ALL_ERROR");
    }

};


export const getOrderById = async (id) => { // obtiene una orden específica por su ID

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de la orden es requerido."
        );

    }

    let order;

    try {

        order = await orderRepository.findById(id);

    } catch {

        throw createError("GET_ERROR");
    }

    if (!order) {
        throw createError("ORDER_NOT_FOUND");
    }

    return order;
};

export const getOrdersByBuyer = async (buyerId) => { // obtiene todas las órdenes de un comprador específico

    if (!buyerId) {
        throw createError(
            "VALIDATION_ERROR",
            "El id del comprador es requerido."
        );
    }

    try {
        
        return await orderRepository.findByBuyer(buyerId);

    } catch {

        throw createError("GET_ERROR");
    }

};

export const getOrdersByStore = async (storeId) => { // obtiene todas las órdenes del cliente de la tienda específica

    if (!storeId) {
        throw createError(
            "VALIDATION_ERROR",
            "El id de la tienda es requerido."
        );
    }

    try {

        return await orderRepository.findByStore(storeId);

    } catch {

        throw createError("GET_ERROR");
    }

};

export const updateOrderStatus = async (id, status) => { // estado del pedido

    if (!id || !status) {
        throw createError(
            "VALIDATION_ERROR",
            "El id y el estado de la orden son obligatorios."
        );
    }

    let updatedOrder;

    try {

        updatedOrder = await orderRepository.updateStatus(id, status);

    } catch {

        throw createError("UPDATE_ERROR");
    }

    if (!updatedOrder) {

        throw createError("ORDER_NOT_FOUND");
    }

    return updatedOrder;;

};

export const updateOrderPriority = async (id, priority) => { // estatus del pedido

    if (!id || !priority) {

        throw createError(
            "VALIDATION_ERROR",
            "El id y la prioridad de la orden son obligatorios."
        );

    }

    const updatedOrder = await orderRepository.updatePriority(id, priority);

    if (!updatedOrder) {

        throw createError(
            "ORDER_NOT_FOUND"
        );

    }

    return updatedOrder;
};

export const updateOrderProof = async (id, proof) => {  // actializa el comprobante de pago de la orden
    
    if (!id || !proof) {
        throw createError(
            "VALIDATION_ERROR",
            "El id y el comprobante son obligatorios."
        );
    }

    let updatedOrder;

    try {

        updatedOrder = await orderRepository.updateProof(id, proof);

    } catch {

        throw createError("UPDATE_ERROR");
    }

    if (!updatedOrder) {

        throw createError("ORDER_NOT_FOUND");
    }

    return updatedOrder;

};

export const deleteOrder = async (id) => {
    
    if (!id) {
        throw createError(
            "VALIDATION_ERROR",
            "El id de la orden es requerido."
        );
    }

    let deletedOrder;

    try {

        deletedOrder = await orderRepository.delete(id);

    } catch {

        throw createError("DELETE_ERROR");
    }

    if (!deletedOrder) {
        
        throw createError("ORDER_NOT_FOUND");
    }

    return deletedOrder;

};