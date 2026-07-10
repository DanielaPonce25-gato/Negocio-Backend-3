import MockDataService from "../services/MockDataService.js";
import { apiResponse } from "../utils/apiResponse.js";

/**
 * Controller - Maneja las solicitudes HTTP para datos mock
 * Esta capa recibe las peticiones, valida parámetros y responde con datos
 */

export const getAllMockData = (req, res, next) => {
    try {
        const quantity = req.query.quantity;
        const data = MockDataService.getAllMockData(quantity);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock data disponible",
            payload: data
        });
    } catch (error) {
        next(error);
    }
};

export const getMockUsers = (req, res, next) => {
    try {
        const quantity = req.query.quantity;
        const users = MockDataService.getMockUsers(quantity);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock usuarios obtenidos",
            payload: users
        });
    } catch (error) {
        next(error);
    }
};

export const getMockProducts = (req, res, next) => {
    try {
        const quantity = req.query.quantity;
        const products = MockDataService.getMockProducts(quantity);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock productos obtenidos",
            payload: products
        });
    } catch (error) {
        next(error);
    }
};

export const getMockOrders = (req, res, next) => {
    try {
        const quantity = req.query.quantity;
        const products = MockDataService.getMockProducts(quantity);
        const orders = MockDataService.getMockOrders(quantity, products);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock órdenes obtenidas",
            payload: orders
        });
    } catch (error) {
        next(error);
    }
};

export const getMockStores = (req, res, next) => {
    try {
        const quantity = req.query.quantity;
        const stores = MockDataService.getMockStores(quantity);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock tiendas obtenidas",
            payload: stores
        });
    } catch (error) {
        next(error);
    }
};


// // GENERA Y GUARDA EN MONGODB

export const generateData = async (req, res, next) => {
    try {
        const quantity = req.body.quantity || 5;

        const result = await MockDataService.generateData(quantity);

        return apiResponse(res, {
            statusCode: 201,
            message: "Datos de prueba generados y guardados correctamente",
            payload: result
        });

    } catch (error) {
        next(error);
    }
};

export default {
    getAllMockData,
    getMockUsers,
    getMockProducts,
    getMockOrders,
    getMockStores,
    generateData
};
