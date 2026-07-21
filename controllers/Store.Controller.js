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

        req.logger.info("Intentando crear tienda");

        const storeData = buildStorePayload(req);
        const store = await storeService.createStore(storeData);
    
        req.logger.info(`Tienda creada correctamente: ${store.name}`);
        
        return apiResponse(res, {
            statusCode: 201, 
            message: "Tienda creada exitosamente",
            payload: store
        });

    } catch (err) {

        req.logger.error(`Error crear la tienda: ${err.message}`);

        next(err); // Pasa el error al middleware de manejo de errores
    }
};

export const getStores = async (req, res, next) => {  // Trae solo tiendas activas
    try {

        req.logger.info("Obteniendo lista de tiendas");

        const stores = await storeService.getStores();

        req.logger.info(`Tiendas obtenidas: ${stores.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Tiendas obtenidas exitosamente", 
            payload: stores
        });

    } catch (err) {

        req.logger.error(`Error al obtener tiendas: ${err.message}`);

        next(err);
    }
};

export const getStoreById = async (req, res, next) => {  // Busca una tienda por ID y trae los datos del owner.
    try {

        req.logger.info(`Buscando tienda id: ${req.params.id}`);

        const store = await storeService.getStoreById(req.params.id);

        if (!store) {

            req.logger.warning(`Tienda no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Tienda no encontrada" 
            });
        }

        req.logger.info(`Tienda encontrada: ${store.name}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Tienda obtenida exitosamente", 
            payload: store
        });

    } catch (err) {

        req.logger.error(`Error al buscar tienda: ${err.message}`);

        next(err);
    }
};

export const getStoresByOwner = async (req, res, next) => { // Trae todas las tiendas de un usuario específico.
    try {

        req.logger.info(`Buscando tiendas del propietario: ${req.params.ownerId}`);

        const stores = await storeService.getStoresByOwner(req.params.ownerId);

        req.logger.info(`Tiendas encontradas: ${stores.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Tiendas del propietario obtenidas exitosamente", 
            payload: stores
        });


    } catch (err) {

        req.logger.error(`Error al buscar tiendas del propietario: ${err.message}`);

        next(err);
    }
};

export const updateStore = async (req, res, next) => {  // Actualiza una tienda.
    try {

        req.logger.info(`Actualizando tienda id: ${req.params.id}`);

        const storeData = buildStorePayload(req);
        const store = await storeService.updateStore(req.params.id, storeData);

        if (!store) {

            req.logger.warning(`Tienda no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Tienda no encontrada" 
            });
        }

        req.logger.info(`Tienda actualizada correctamente: ${store.name}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Tienda actualizada exitosamente", 
            payload: store
        });

    } catch (err) {

        req.logger.error(`Error al actualizar tienda: ${err.message}`);

        next(err);
    }
};

export const deleteStore = async (req, res, next) => {
    try {

        req.logger.info(`Eliminando tienda id: ${req.params.id}`);

        const deleted = await storeService.deleteStore(req.params.id);

        if (!deleted) {

            req.logger.warning(`Tienda no encontrada id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Tienda no encontrada" 
            });
        }

        req.logger.info(`Tienda eliminada correctamente id: ${req.params.id}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Tienda eliminada exitosamente", 
            payload: null
        });


    } catch (err) {

        req.logger.error(`Error al eliminar tienda: ${err.message}`);

        next(err);
    }
};
