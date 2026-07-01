

import orderRepository from "../repositories/Order.Repository.js";

export const createOrder = async (orderData) => {  // crea una nueva orden en la base de datos
    return await orderRepository.create(orderData);
};

export const getOrders = async () => { // obtiene todas las órdenes de la base de datos
    return await orderRepository.findAll();
};

export const getOrderById = async (id) => { // obtiene una orden específica por su ID
    return await orderRepository.findById(id);
};

export const getOrdersByBuyer = async (buyerId) => { // obtiene todas las órdenes de un comprador específico
    return await orderRepository.findByBuyer(buyerId);
};

export const getOrdersByStore = async (storeId) => { // obtiene todas las órdenes del cliente de la tienda específica
    return await orderRepository.findByStore(storeId);
};

export const updateOrderStatus = async (id, status) => { // estado del pedido
    return await orderRepository.updateStatus(id, status);
};

export const updateOrderPriority = async (id, priority) => { // estatus del pedido
    return await orderRepository.updatePriority(id, priority);
};

export const updateOrderProof = async (id, proof) => {  // actializa el comprobante de pago de la orden
    return await orderRepository.updateProof(id, proof);
};

export const deleteOrder = async (id) => {
    return await orderRepository.delete(id);
};