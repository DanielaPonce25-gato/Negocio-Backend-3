import Store from "../models/Store.js";

export const createStore = async (data) => { // Crea una tienda nueva en la base de datos.
    return await Store.create(data);
};

export const getStores = async () => {
    return await Store.find({ isActive: true })  // Trae solo tiendas activas

        .populate("owner", "firstName lastName email") // Reemplaza el ID del owner por datos del usuario
        .sort({ createdAt: -1 });
};

export const getStoreById = async (id) => { // Busca una tienda por ID y trae los datos del owner.
        return await Store.findById(id)
        .populate("owner", "firstName lastName email");
};

export const getStoresByOwner = async (ownerId) => {  // Trae todas las tiendas de un usuario específico.
    return await Store.find({ owner: ownerId })
        .sort({ createdAt: -1 });
};

export const updateStore = async (id, data) => { // Actualiza una tienda.

    return await Store.findByIdAndUpdate(id, data, { new: true });  // devuelve el documento actualizado
};

export const deleteStore = async (id) => { // Elimina la tienda
    return await Store.findByIdAndDelete(id);
};

export default {
    createStore,
    getStores,
    getStoreById,
    getStoresByOwner,
    updateStore,
    deleteStore
};

