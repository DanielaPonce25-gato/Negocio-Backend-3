import User from "../models/User.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";
import Order from "../models/Order.js";

import { generateMockUsers } from "../repositories/UserMockRepository.js";
import { generateMockProducts } from "../repositories/ProductMockRepository.js";
import { generateMockOrders } from "../repositories/OrderMockRepository.js";
import { generateMockStores } from "../repositories/StoreMockRepository.js";


class MockDataService {

    validateQuantity(value, fallback = 3) {
        const parsed = Number(value);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    }

    // SOLO GENERAN DATOS

    getMockUsers(quantity) {
        const validatedQuantity = this.validateQuantity(quantity, 5);
        return generateMockUsers(validatedQuantity);
    }

    getMockProducts(quantity) {
        const validatedQuantity = this.validateQuantity(quantity, 5);
        return generateMockProducts(validatedQuantity);
    }

    getMockOrders(quantity, products = []) {
        const validatedQuantity = this.validateQuantity(quantity, 5);

        if (products.length === 0) {
            products = this.getMockProducts(validatedQuantity);
        }

        return generateMockOrders(validatedQuantity, null, null, products);
    }

    getMockStores(quantity) {
        const validatedQuantity = this.validateQuantity(quantity, 5);

        const users = generateMockUsers(validatedQuantity);

        return generateMockStores(users);
    }

    getAllMockData(quantity) {

        const validatedQuantity = this.validateQuantity(quantity, 5);

        const users = this.getMockUsers(validatedQuantity);

        return {
            users
        };
    }


    // GENERA Y GUARDA EN MONGODB

    async generateData(quantity) {

        const validatedQuantity = this.validateQuantity(quantity, 5);

        // Usuarios
        const users = generateMockUsers(validatedQuantity);
        const savedUsers = await User.insertMany(users);

        // Productos
        const products = [];

        for (const user of savedUsers) {
            products.push(generateMockProducts(1, user._id)[0]);
        }

        const savedProducts = await Product.insertMany(products);

        // Tiendas
        const stores = generateMockStores(savedUsers);

        const savedStores = await Store.insertMany(stores);

        // Órdenes
        const orders = [];

        for (let i = 0; i < validatedQuantity; i++) {

            const order = generateMockOrders(
                1,
                savedUsers[i]._id,
                savedStores[i]._id,
                [savedProducts[i]]
            )[0];

            orders.push(order);
        }

        const savedOrders = await Order.insertMany(orders);

        return {
            users: savedUsers.length,
            products: savedProducts.length,
            stores: savedStores.length,
            orders: savedOrders.length
        };
    }
}

export default new MockDataService();