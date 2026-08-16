import Store from "../models/Store.js";

import logger from "../config/logger.js";

export const createStore = async (data) => { // Crea una tienda nueva en la base de datos.
    try {

        return await Store.create(data);

    } catch (error) {

        logger.error(`Error al crear tienda: ${error.message}`);
        throw error;
    }
};

export const getStores = async () => {
    try {

        return await Store.find({ isActive: true }) // Trae solo tiendas activas
            .populate("owner", "firstName lastName email") // Reemplaza el ID del owner por datos del usuario
            .sort({ createdAt: -1 });

    } catch (error) {

        logger.error(`Error al obtener tiendas: ${error.message}`);
        throw error;
    }
};

export const getStoreById = async (id) => { // Busca una tienda por ID y trae los datos del owner.
    try {

        return await Store.findById(id)
            .populate("owner", "firstName lastName email");

    } catch (error) {

        logger.error(`Error al obtener tienda por ID: ${error.message}`);
        throw error;
    }

};

export const getStoresByOwner = async (ownerId) => {  // Trae todas las tiendas de un usuario específico.
    try {

        return await Store.find({ owner: ownerId })
            .sort({ createdAt: -1 });

    } catch (error) {

        logger.error(`Error al obtener tiendas del propietario: ${error.message}`);
        throw error;
    }
};

export const updateStore = async (id, data) => { // Actualiza una tienda.

    try {

        return await Store.findByIdAndUpdate(id, data, { new: true }); 

    } catch (error) {

        logger.error(`Error al actualizar tienda: ${error.message}`);
        throw error;
    } 
}; 

export const deleteStore = async (id) => { // Elimina la tienda
    try {

        return await Store.findByIdAndDelete(id);

    } catch (error) {

        logger.error(`Error al eliminar tienda: ${error.message}`);
        throw error;
    }
};

export default {
    createStore,
    getStores,
    getStoreById,
    getStoresByOwner,
    updateStore,
    deleteStore
};

