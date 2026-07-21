import * as UserService from "../services/User.Service.js";
import { apiResponse } from "../utils/apiResponse.js";


const parseImageUrls = (req) => {
    const images = [];

    const addUrls = (raw) => {
        if (Array.isArray(raw)) {
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

export const buildUserPayload = (req) => {
    let {
        firstName,
        lastName,
        email,
        password,
        addresses,
        role,
        documents
    } = req.body;

    
    // Si addresses llega desde FormData, convertirlo nuevamente en arreglo
    if (typeof addresses === "string") {
        try {
            addresses = JSON.parse(addresses);
        } catch {
            addresses = [];
        }
    }

    if (typeof documents === "string") {
        try {
            documents = JSON.parse(documents);
        } catch {
            documents = [];
        }
    }

    const payload = {
        firstName,
        lastName,
        email,
        password,
        addresses,
        role,
        documents
    };

    const imageUrls = parseImageUrls(req);
    if (imageUrls.length) {
        payload.images = imageUrls;
    }

    return payload;
};



// Valicion de datos de usuario
export const createUser = async (req, res, next) => {
    try {

        req.logger.info("Intentando crear usuario");

        const userData = buildUserPayload(req);
        const user = await UserService.createUser(userData);
        const obj = user.toObject ? user.toObject() : userData;  // es distinto al moldeo de mongoose
        delete obj.password;

        req.logger.info(`Usuario creado exitosamente: ${obj.email}`);

        return apiResponse(res, {
            statusCode: 201,
            message: "Usuario creado exitosamente",
            payload: obj
    
        });



    } catch (err) {

        req.logger.error(`Error creando usuario: ${err.message}`);

        next(err); // Pasa el error al middleware de manejo de errores
    }
};


export const getUsers = async (req, res, next) => {
    try {

        req.logger.info("Obteniendo lista de usuarios");

        const users = await UserService.getUsers();

        req.logger.info(`Usuarios obtenidos: ${users.length}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Usuarios obtenidos exitosamente", 
            payload: users
        });

    } catch (err) {

        req.logger.error(`Error al obtener los usuarios: ${err.message}`);

        next(err); 
    }
};

export const getUserById = async (req, res, next) => {
    try {

        req.logger.info(`Buscando usuario con id: ${req.params.id}`);

        const user = await UserService.getUserById(req.params.id);

        if (!user) {
            
            return res.status(404).json({ 
                status: "error", 
                message: "Usuario no encontrado" 
            });  // Verificar si existe
        }

        req.logger.info( `Usuario encontrado: ${user.email}`);
        
        return apiResponse(res, {
            statusCode: 200,
            message: "Usuario obtenido exitosamente", 
            payload: user
        }); 

    } catch (err) {

        req.logger.error(`Error al entrar usuario: ${err.message}`);

        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {

        req.logger.info( `Actualizando usuario id: ${req.params.id}` );

        const userData = buildUserPayload(req);

        const user = await UserService.updateUser(req.params.id, userData);

        if (!user) {

            req.logger.warning(`No existe usuario id: ${req.params.id}`);

            return res.status(404).json({ 
                status: "error", 
                message: "Usuario no encontrado" 
            });  // Verificar si existe
        }

        req.logger.info( `Usuario actualizado correctamente id: ${req.params.id}` );

        return apiResponse(res, {
            statusCode: 200,
            message: "Usuario actualizado exitosamente", 
            payload: user
        });

    } catch (err) {

        req.logger.error(`Error al actualizar el usuario: ${err.message}`);

        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {

        req.logger.info( `Eliminando usuario id: ${req.params.id}` );

        const deleted = await UserService.deleteUser(req.params.id);

        if (!deleted) {

            logger.warning( `No se pudo eliminar, usuario inexistente id: ${req.params.id}` );

            return res.status(404).json({ 
                status: "error", 
                message: "Usuario no encontrado" 
            });

        }

        req.logger.info( `Usuario eliminado correctamente id: ${req.params.id}` );
        
        return apiResponse(res, {
            statusCode: 200,
            message: "Usuario eliminado exitosamente", 
            payload: null
        });

    } catch (err) {

        req.logger.error(`Error al eliminar usuario: ${err.message}`);

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
