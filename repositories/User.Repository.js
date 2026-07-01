import User from "../models/User.js";

// Crea un nuevo usuario en la base de datos.
export const createUser = async (data) => {
    return await User.create(data);
};


// Obtiene todos los usuarios (sin la contraseña).
export const getUsers = async () => {
    return await User.find().select("-password");
};


// Obtiene un usuario por su ID (sin la contraseña).
export const getUserById = async (id) => {
    return await User.findById(id).select("-password");
};


// Busca un usuario por email (útil para login o validaciones). Devuelve contraseña.
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};


// Actualiza un usuario por su ID y devuelve el documento nuevo (sin contraseña por defecto).
// Si `data.password` está presente, se hashea antes de actualizar.
export const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};


// Elimina un usuario por su ID.
export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export default {
    createUser,
    getUsers,
    getUserById,
    findUserByEmail,
    updateUser,
    deleteUser
};
