import * as storeService from "../services/Store.Service.js";
import { apiResponse } from "../utils/apiResponse.js";


export const createStore = async (req, res, next) => {
    try {
        const store = await storeService.createStore(req.body);
        
        return apiResponse(res, {
            statusCode: 201, 
            message: "Tienda creada exitosamente",
            payload: store
        });

    } catch (err) {
        next(err); // Pasa el error al middleware de manejo de errores
    }
};

export const getStores = async (req, res, next) => {  // Trae solo tiendas activas
    try {
        const stores = await storeService.getStores();

        return apiResponse(res, {
            statusCode: 200,
            message: "Tiendas obtenidas exitosamente", 
            payload: stores
        });

    } catch (err) {
        next(err);
    }
};

export const getStoreById = async (req, res, next) => {  // Busca una tienda por ID y trae los datos del owner.
    try {
        const store = await storeService.getStoreById(req.params.id);
        if (!store) {
            return res.status(404).json({ status: "error", message: "Tienda no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Tienda obtenida exitosamente", 
            payload: store
        });

    } catch (err) {
        next(err);
    }
};

export const getStoresByOwner = async (req, res, next) => { // Trae todas las tiendas de un usuario específico.
    try {
        const stores = await storeService.getStoresByOwner(req.params.ownerId);

        return apiResponse(res, {
            statusCode: 200,
            message: "Tiendas del propietario obtenidas exitosamente", 
            payload: stores
        });

    } catch (err) {
        next(err);
    }
};

export const updateStore = async (req, res, next) => {  // Actualiza una tienda.
    try {
        const store = await storeService.updateStore(req.params.id, req.body);
        if (!store) {
            return res.status(404).json({ status: "error", message: "Tienda no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Tienda actualizada exitosamente", 
            payload: store
        });

    } catch (err) {
        next(err);
    }
};

export const deleteStore = async (req, res, next) => {
    try {
        const deleted = await storeService.deleteStore(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Tienda no encontrada" });
        }

        return apiResponse(res, {
            statusCode: 200,
            message: "Tienda eliminada exitosamente", 
            payload: null
        });


    } catch (err) {
        next(err);
    }
};
