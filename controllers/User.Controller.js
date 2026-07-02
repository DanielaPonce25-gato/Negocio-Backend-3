import * as UserService from "../services/User.Service.js";


// Valicion de datos de usuario
export const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        const obj = user.toObject ? user.toObject() : user;  // es distinto al moldeo de mongoose
        delete obj.password;
        return res.status(201).json({ status: "success", data: obj });    // Devuelve el usuario creado sin la contraseña
    } catch (error) {
        const error = new Error("Error al crear el usuario");
        error.status = 400;
        throw error;
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
        return res.status(200).json({ status: "success", data: users }); // Devuelve todos los usuarios sin la contraseña
    } catch (error) {
        const error = new Error("Error al obtener los usuarios");
        error.status = 404;
        throw error;
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });  // Verificar si existe
        return res.status(200).json({ status: "success", data: user }); 
    } catch (error) {
        const error = new Error("Error al obtener el usuario");
        error.status = 404;
        throw error;
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });  // Verificar si existe
        return res.status(200).json({ status: "success", data: user });
    } catch (error) {
        const error = new Error("Error al actualizar el usuario");
        error.status = 400;
        throw error;
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await UserService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        return res.status(200).json({ status: "success", message: "Usuario eliminado" });
    } catch (error) {
        const error = new Error("Error al eliminar el usuario");
        error.status = 400;
        throw error;
    }
};

export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
