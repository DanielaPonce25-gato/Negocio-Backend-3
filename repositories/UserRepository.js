import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Crea un nuevo usuario en la base de datos. Hashea la contraseña si viene.
export const createUser = async (data) => {
    const payload = { ...data };
    if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
    }
    return await User.create(payload);
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
    const payload = { ...data };
    if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
    }
    return await User.findByIdAndUpdate(id, payload, { new: true }).select("-password");
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
