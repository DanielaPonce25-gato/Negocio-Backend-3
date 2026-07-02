
import { generateMockStore } from "./mockStores.js";

export const generateMockStores = (count = 3) => {
    const stores = [];

    for (let i = 0; i < count; i += 1) {
        const sellerId = `seller-${i + 1}`;
        stores.push(generateMockStore(sellerId));
    }

    return stores;
};

const stores = generateMockStores(3);
console.log(JSON.stringify(stores, null, 2));