import * as storeService from "../services/Store.Service.js";

const handleError = (res, error) => {
    const status = error.status || 400;
    return res.status(status).json({
        status: "error",
        message: error.message || "Error en la operación con tiendas"
    });
};

export const createStore = async (req, res) => {
    try {
        const store = await storeService.createStore(req.body);
        return res.status(201).json({ status: "success", data: store });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getStores = async (req, res) => {  // Trae solo tiendas activas
    try {
        const stores = await storeService.getStores();
        return res.status(200).json({ status: "success", data: stores });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getStoreById = async (req, res) => {  // Busca una tienda por ID y trae los datos del owner.
    try {
        const store = await storeService.getStoreById(req.params.id);
        if (!store) {
            return res.status(404).json({ status: "error", message: "Tienda no encontrada" });
        }
        return res.status(200).json({ status: "success", data: store });
    } catch (error) {
        return handleError(res, error);
    }
};

export const getStoresByOwner = async (req, res) => { // Trae todas las tiendas de un usuario específico.
    try {
        const stores = await storeService.getStoresByOwner(req.params.ownerId);
        return res.status(200).json({ status: "success", data: stores });
    } catch (error) {
        return handleError(res, error);
    }
};

export const updateStore = async (req, res) => {  // Actualiza una tienda.
    try {
        const store = await storeService.updateStore(req.params.id, req.body);
        if (!store) {
            return res.status(404).json({ status: "error", message: "Tienda no encontrada" });
        }
        return res.status(200).json({ status: "success", data: store });
    } catch (error) {
        return handleError(res, error);
    }
};

export const deleteStore = async (req, res) => {
    try {
        const deleted = await storeService.deleteStore(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: "error", message: "Tienda no encontrada" });
        }
        return res.status(200).json({ status: "success", message: "Tienda eliminada" });
    } catch (error) {
        return handleError(res, error);
    }
};
