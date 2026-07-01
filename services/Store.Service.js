import storeRepository from "../repositories/Stores.Repository.js";

export const createStore = async (storeData) => {
    return await storeRepository.createStore(storeData);
};

export const getStores = async () => {
    return await storeRepository.getStores();
};

export const getStoreById = async (id) => {
    return await storeRepository.getStoreById(id);
};

export const getStoresByOwner = async (ownerId) => {
    return await storeRepository.getStoresByOwner(ownerId);
};

export const updateStore = async (id, data) => {
    return await storeRepository.updateStore(id, data);
};

export const deleteStore = async (id) => {
    return await storeRepository.deleteStore(id);
};

export default {
    createStore,
    getStores,
    getStoreById,
    getStoresByOwner,
    updateStore,
    deleteStore
};
