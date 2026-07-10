import * as storeService from "../services/Store.Service.js";
import { apiResponse } from "../utils/apiResponse.js";

const parseImageUrls = (req) => {
    const images = [];

    // Procesa URLs

    const addUrls = (raw) => {
        if (Array.isArray(raw)) { 

                // Convierte string y elimina los espacios con .trim
            images.push(...raw.map((url) => String(url).trim()).filter(Boolean));
        } else if (typeof raw === "string") {
            images.push(
                ...String(raw)
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean)
            );
        }
    };



    if (req.body?.imageUrls) {
        addUrls(req.body.imageUrls);
    }

    if (req.body?.images && req.body?.imageUrls === undefined) {
        addUrls(req.body.images);
    }

    if (req.files?.length) {
        const uploadedUrls = req.files.map((file) => {
            const host = req.get("host");
            const protocol = req.protocol;
            return `${protocol}://${host}/uploads/${file.filename}`;
        });

        images.push(...uploadedUrls);
    }

    return images;
};

export const buildStorePayload = (req) => {
    const { owner, name, description, address, phone, email, isActive } = req.body;
    const payload = { owner, name, description, address, phone, email, isActive };

    const imageUrls = parseImageUrls(req);
    if (imageUrls.length) {
        payload.images = imageUrls;
    }

    return payload;
};

export const createStore = async (req, res, next) => {
    try {
        const storeData = buildStorePayload(req);
        const store = await storeService.createStore(storeData);
        
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
        const storeData = buildStorePayload(req);
        const store = await storeService.updateStore(req.params.id, storeData);
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
