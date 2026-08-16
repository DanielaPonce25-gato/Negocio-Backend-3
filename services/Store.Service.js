import storeRepository from "../repositories/Stores.Repository.js";

import { createError } from "../utils/apiResponse.js";

export const createStore = async (storeData) => {

    if (!storeData) {

        throw createError(
            "VALIDATION_ERROR",
            "Los datos de la tienda son obligatorios."
        );

    }

    if (!storeData.name) {

        throw createError(
            "VALIDATION_ERROR",
            "El nombre de la tienda es obligatorio."
        );

    }

    if (!storeData.owner) {

        throw createError(
            "VALIDATION_ERROR",
            "La tienda debe tener un propietario."
        );

    }

    if (!storeData.address) {

        throw createError(
            "VALIDATION_ERROR",
            "La dirección de la tienda es obligatoria."
        );

    }

    try {

        return await storeRepository.createStore(storeData);

    } catch {

        throw createError("CREATE_ERROR");

    }

};


export const getStores = async () => {

    try {

        return await storeRepository.getStores();

    } catch {

        throw createError("GET_ALL_ERROR");

    }

};


export const getStoreById = async (id) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de la tienda es requerido."
        );

    }

    let store;

    try {

        store = await storeRepository.getStoreById(id);

    } catch {

        throw createError("GET_ERROR");

    }

    if (!store) {

        throw createError("STORE_NOT_FOUND");

    }

    return store;

};

export const getStoresByOwner = async (ownerId) => {

    if (!ownerId) {

        throw createError(
            "VALIDATION_ERROR",
            "El id del propietario es requerido."
        );

    }

    try {

        return await storeRepository.getStoresByOwner(ownerId);

    } catch {

        throw createError("GET_ERROR");

    }

};

export const updateStore = async (id, data) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de la tienda es requerido."
        );

    }

    if (!data || Object.keys(data).length === 0) {

        throw createError(
            "VALIDATION_ERROR",
            "No hay datos para actualizar."
        );

    }

    let updatedStore;

    try {

        updatedStore = await storeRepository.updateStore(id, data);

    } catch {

        throw createError("UPDATE_ERROR");

    }

    if (!updatedStore) {

        throw createError("STORE_NOT_FOUND");

    }

    return updatedStore;

};

export const deleteStore = async (id) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de la tienda es requerido."
        );

    }

    let deletedStore;

    try {

        deletedStore = await storeRepository.deleteStore(id);

    } catch {

        throw createError("DELETE_ERROR");

    }

    if (!deletedStore) {

        throw createError("STORE_NOT_FOUND");

    }

    return deletedStore;

};

export default {
    createStore,
    getStores,
    getStoreById,
    getStoresByOwner,
    updateStore,
    deleteStore
};
