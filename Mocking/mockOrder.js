import { faker } from "@faker-js/faker";
import { DELIVERY_PRIORITY, ORDER_STATUS } from "../constants/index.js";

export const generateMockOrder = (
    buyerId,
    storeId,
    product
) => {
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
        status: ORDER_STATUS.CREATED,
        priority: DELIVERY_PRIORITY.NORMAL
    };
};




