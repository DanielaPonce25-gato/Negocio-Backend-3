import * as UserService from "../services/User.Service.js";
import { apiResponse } from "../utils/apiResponse.js";



// Valicion de datos de usuario
export const createUser = async (req, res, next) => {
    try {
        const user = await UserService.createUser(req.body);
        const obj = user.toObject ? user.toObject() : user;  // es distinto al moldeo de mongoose
        delete obj.password;

        return apiResponse(res, {
            statusCode: 201,
            message: "Usuario creado exitosamente",
            payload: obj
    
        });

    } catch (err) {
        next(err); // Pasa el error al middleware de manejo de errores
    }
};


export const getUsers = async (req, res, next) => {
    try {
        const users = await UserService.getUsers();

        return apiResponse(res, {
            statusCode: 200,
            message: "Usuarios obtenidos exitosamente", 
            payload: users
        });

    } catch (err) {
        next(err); 
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });  // Verificar si existe

        return apiResponse(res, {
            statusCode: 200,
            message: "Usuario obtenido exitosamente", 
            payload: user
        }); 

    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await UserService.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });  // Verificar si existe
        
        return apiResponse(res, {
            statusCode: 200,
            message: "Usuario actualizado exitosamente", 
            payload: user
        });

    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deleted = await UserService.deleteUser(req.params.id);
        if (!deleted) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        
        return apiResponse(res, {
            statusCode: 200,
            message: "Usuario eliminado exitosamente", 
            payload: null
        });

    } catch (err) {
        next(err);
    }
};

export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
