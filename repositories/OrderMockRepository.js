
import Order from "../models/Order.js";

import { faker } from "@faker-js/faker";
import { DELIVERY_PRIORITY, ORDER_STATUS } from "../constants/index.js";

/**
 * Repository - Generador de datos mock para órdenes
 * Esta capa maneja la generación de datos ficticios
 */
export const generateMockOrder = (buyerId, storeId, product) => {

    const quantity = faker.number.int({ min: 1, max: 5 });

    const total = Number((product.price * quantity).toFixed(2));

    return {
        buyer: buyerId,
        store: storeId,

        products: [
            {
                product: product._id,
                name: product.title,
                image: product.images[0],
                price: product.price,
                quantity
            }
        ],

        deliveryAddress: {
            label: faker.helpers.arrayElement(["Casa", "Trabajo"]),
            address: faker.location.streetAddress(),
            reference: faker.location.secondaryAddress()
        },

        total,
        status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
        priority: faker.helpers.arrayElement(Object.values(DELIVERY_PRIORITY))
    };
};

export const generateMockOrders = (
    quantity = 1,
    buyerId,
    storeId,
    products
) => {

    return Array.from({ length: quantity }, (_, index) =>
        generateMockOrder(
            buyerId,
            storeId,
            products[index]
        )
    );

};

export default {
    generateMockOrder,
    generateMockOrders
};