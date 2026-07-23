import OrderModel from "../models/Order.js";

import logger from "../config/logger.js";

class OrderRepository {

    async create(data) {
        try {

            return await OrderModel.create(data);

        } catch (error) {

            logger.error(`Error al crear orden: ${error.message}`);
            throw error;
        }
    }

    async findAll() {
        try {

            return await OrderModel.find().sort({ createdAt: -1 });

        } catch (error) {

            logger.error(`Error al obtener órdenes: ${error.message}`);
            throw error;
        }
    }

    async findById(id) { //busca una orden por su ID y además llena los datos relacionados 
        try {

            return await OrderModel.findById(id)
                .populate("buyer", "name email")
                .populate("store", "name")
                .populate("products.product"); // información del producto

        } catch (error) {

            logger.error(`Error al obtener orden por ID: ${error.message}`);
            throw error;
        } 
    }

    async findByBuyer(buyerId) {
        try {

            return await OrderModel.find({ buyer: buyerId }) // devuelve todas las órdenes del comprador específico
            .sort({ createdAt: -1 }); // de las mas recientes a las más antiguas

        } catch (error) {
            logger.error(`Error al obtener órdenes del comprador: ${error.message}`);
            throw error;
        }
    }

    async findByStore(storeId) { // devuelve todas las órdenes de la tienda específica
        try {

            return await OrderModel.find({ store: storeId })
                .sort({ createdAt: -1 });

        } catch (error) {

            logger.error(`Error al obtener órdenes de la tienda: ${error.message}`);
            throw error;
        }
    }

    async updateStatus(id, status) { // actualiza el estado de la orden
        try {

            return await OrderModel.findByIdAndUpdate(  // busca la orden por su ID y actualiza el estado
                id,
                { status },
                { new: true }
            );

        } catch (error) {

            logger.error(`Error al actualizar el estado de la orden: ${error.message}`);
            throw error;
        }
    }

    async updatePriority(id, priority) { // actualiza la prioridad de la orden
        try {
            return await OrderModel.findByIdAndUpdate(
                id,
                { priority },
                { new: true }
            );

        } catch (error) {

            logger.error(`Error al actualizar la prioridad de la orden: ${error.message}`);
            throw error;
        }
    }

    async updateProof(id, proof) { // actializa el comprobante de pago de la orden
        try {

            return await OrderModel.findByIdAndUpdate(
                id,
                { proof },
                { new: true }
            );

        } catch (error) {

            logger.error(`Error al actualizar el comprobante de la orden: ${error.message}`);
            throw error;
        }
    }

    async delete(id) {
        try {

            return await OrderModel.findByIdAndDelete(id);

        } catch (error) {
            logger.error(`Error al eliminar la orden: ${error.message}`);
            throw error;
        }
    }
}

export default new OrderRepository();