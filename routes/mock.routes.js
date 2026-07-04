import { Router } from "express";
import { generateMockUsers } from "../Mocking/mockUser.js";
import { generateMockProduct } from "../Mocking/mockProduct.js";
import { generateMockOrder } from "../Mocking/mockOrder.js";
import { generateMockStore } from "../Mocking/mockStores.js";

const router = Router();

const toNumber = (value, fallback = 3) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};


const createMockProducts = (quantity = 3) => {
    const products = [];

    for (let index = 0; index < quantity; index += 1) {
        products.push({
            ...generateMockProduct(`seller-${index + 1}`),
            _id: `mock-product-${index + 1}`
        });
    }

    return products;
};

const generateMockStores = (count = 3) => {
    const stores = [];  

    for (let i = 0; i < count; i += 1) {
        const sellerId = `seller-${i + 1}`;
        stores.push(generateMockStore(sellerId));
    }

    return stores;
};

const createMockOrders = (quantity = 3, products = []) => {
    const orders = [];

    for (let index = 0; index < quantity; index += 1) {
        orders.push(
            generateMockOrder(`buyer-${index + 1}`, `store-${index + 1}`, products[index] || products[0])
        );
    }

    return orders;
};


router.get("/", (req, res) => {
    const quantity = toNumber(req.query.quantity, 3);
    const products = createMockProducts(quantity);

    res.json({
        status: "success",
        message: "Mock data disponible",
        data: {
            users: generateMockUsers(quantity),
            products,
            orders: createMockOrders(quantity, products)
        }
    });
});

router.get("/users", (req, res) => {
    const quantity = toNumber(req.query.quantity, 5);
    res.json({
        status: "success",
        data: generateMockUsers(quantity)
    });
});

router.get("/products", (req, res) => {
    const quantity = toNumber(req.query.quantity, 4);
    res.json({
        status: "success",
        data: createMockProducts(quantity)
    });
});

router.get("/orders", (req, res) => {
    const quantity = toNumber(req.query.quantity, 2);
    const products = createMockProducts(quantity);

    res.json({
        status: "success",
        data: createMockOrders(quantity, products)
    });
});

router.get("/stores", (req, res) => {
    const quantity = toNumber(req.query.quantity, 5);
    const stores = generateMockStores(quantity);

    res.json({
        status: "success",
        data: stores
    });
});

export default router;

