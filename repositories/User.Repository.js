import User from "../models/User.js";

import logger from "../config/logger.js";

// Crea un nuevo usuario en la base de datos.
export const createUser = async (data) => {
    try{

        return await User.create(data);

    } catch (error) {

        logger.error(`Error al crear usuario: ${error.message}`);
        throw error;
    }
};


// Obtiene todos los usuarios (sin la contraseña).
export const getUsers = async () => {
    try {

        return await User.find().select("-password");

    } catch (error) {

        logger.error(`Error al obtener usuarios: ${error.message}`);
        throw error;
    }
};


// Obtiene un usuario por su ID (sin la contraseña).
export const getUserById = async (id) => {
    try {

        return await User.findById(id).select("-password");

    } catch (error) {

        logger.error(`Error al obtener usuario por ID: ${error.message}`);
        throw error;
    }
};


// Busca un usuario por email (útil para login o validaciones). Devuelve contraseña.
export const findUserByEmail = async (email) => {
    try {

        return await User.findOne({ email });

    } catch (error) {

        logger.error(`Error al buscar usuario por email: ${error.message}`);
        throw error;
    }
};


// Actualiza un usuario por su ID y devuelve el documento nuevo (sin contraseña por defecto).
// Si `data.password` está presente, se hashea antes de actualizar.
export const updateUser = async (id, data) => {
    try {

        return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");

    } catch (error) {

        logger.error(`Error al actualizar usuario: ${error.message}`);
        throw error;
    }
};


// Elimina un usuario por su ID.
export const deleteUser = async (id) => {
    try {

        return await User.findByIdAndDelete(id);

    } catch (error) {

        logger.error(`Error al eliminar usuario: ${error.message}`);
        throw error;
    }
};

export default {
    createUser,
    getUsers,
    getUserById,
    findUserByEmail,
    updateUser,
    deleteUser
};
