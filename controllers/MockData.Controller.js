import MockDataService from "../services/MockDataService.js";
import { apiResponse } from "../utils/apiResponse.js";

/**
 * Controller - Maneja las solicitudes HTTP para datos mock
 * Esta capa recibe las peticiones, valida parámetros y responde con datos
 */

export const getAllMockData = (req, res, next) => {
    try {

        req.logger.info("Generando datos de prueba");

        const quantity = req.query.quantity;
        const data = MockDataService.getAllMockData(quantity);

        req.logger.info("Datos de prueba generados correctamente"); 

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock data disponible",
            payload: data
        });

    } catch (error) {

        req.logger.error(`Error generando datos de prueba: ${error.message}`);

        next(error);
    }
};

export const getMockUsers = (req, res, next) => {
    try {

        req.logger.info("Generando usuarios mock");

        const quantity = req.query.quantity;
        const users = MockDataService.getMockUsers(quantity);

        req.logger.info(`Usuarios mock generados: ${users.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock usuarios obtenidos",
            payload: users
        });


    } catch (error) {

        req.logger.error(`Error generando usuarios mock: ${error.message}`);

        next(error);
    }
};

export const getMockProducts = (req, res, next) => {
    try {

        req.logger.info("Generando productos mock");

        const quantity = req.query.quantity;
        const products = MockDataService.getMockProducts(quantity);

        req.logger.info(`Productos mock generados: ${products.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock productos obtenidos",
            payload: products
        });


    } catch (error) {

        req.logger.error(`Error generando productos mock: ${error.message}`); 

        next(error);
    }
};

export const getMockOrders = (req, res, next) => {
    try {

        req.logger.info("Generando órdenes mock");

        const quantity = req.query.quantity;
        const products = MockDataService.getMockProducts(quantity);
        const orders = MockDataService.getMockOrders(quantity, products);

        req.logger.info(`Órdenes mock generadas: ${orders.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock órdenes obtenidas",
            payload: orders
        });

    } catch (error) {

        req.logger.error(`Error generando órdenes mock: ${error.message}`);

        next(error);
    }
};

export const getMockStores = (req, res, next) => {
    try {

        req.logger.info("Generando tiendas mock");

        const quantity = req.query.quantity;
        const stores = MockDataService.getMockStores(quantity);

        req.logger.info(`Tiendas mock generadas: ${stores.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Mock tiendas obtenidas",
            payload: stores
        });


    } catch (error) {

        req.logger.error(`Error generando tiendas mock: ${error.message}`);

        next(error);
    }
};


// // GENERA Y GUARDA EN MONGODB

export const generateData = async (req, res, next) => {
    try {

        req.logger.info("Generando y guardando datos de prueba en MongoDB");

        const quantity = req.body.quantity || 5;

        const result = await MockDataService.generateData(quantity);

        req.logger.info(`Datos de prueba generados correctamente. Cantidad: ${quantity}`); 

        return apiResponse(res, {
            statusCode: 201,
            message: "Datos de prueba generados y guardados correctamente",
            payload: result
        });

    } catch (error) {

        req.logger.error(`Error generando datos de prueba en MongoDB: ${error.message}`);

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
