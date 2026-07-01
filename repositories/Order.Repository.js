import OrderModel from "../models/Order.js";


class OrderRepository {

    async create(data) {
        return await OrderModel.create(data);
    }

    async findAll() {
        return await OrderModel.find().sort({ createdAt: -1 });
    }

    async findById(id) { //busca una orden por su ID y además llena los datos relacionados 
        return await OrderModel.findById(id)
            .populate("buyer", "name email")
            .populate("store", "name")
            .populate("products.product"); // información del producto
    }

    async findByBuyer(buyerId) {
        return await OrderModel.find({ buyer: buyerId }) // devuelve todas las órdenes del comprador específico
            .sort({ createdAt: -1 }); // de las mas recientes a las más antiguas
    }

    async findByStore(storeId) { // devuelve todas las órdenes de la tienda específica
        return await OrderModel.find({ store: storeId }) 
            .sort({ createdAt: -1 }); 
    }

    async updateStatus(id, status) { // actualiza el estado de la orden
        return await OrderModel.findByIdAndUpdate( // busca la orden por su ID y actualiza el estado
            id,
            { status },
            { new: true }
        );
    }

    async updatePriority(id, priority) { // actualiza la prioridad de la orden
        return await OrderModel.findByIdAndUpdate(
            id,
            { priority },
            { new: true }
        );
    }

    async updateProof(id, proof) { // actializa el comprobante de pago de la orden
        return await OrderModel.findByIdAndUpdate( 
            id,
            { proof },
            { new: true }
        );
    }

    async delete(id) {
        return await OrderModel.findByIdAndDelete(id);
    }
}

export default new OrderRepository();