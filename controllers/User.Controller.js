import e from "express";
import * as UserService from "../services/User.Service.js";
import { apiResponse } from "../utils/apiResponse.js";
import logger from "../config/logger.js";


const parseImageUrls = (req) => {
    const images = [];

    const addUrl = (raw) => {
        if (Array.isArray(raw)) {
            const url = String(raw[0]).trim();

            if (url) {
                images.push(url);
            }

        } else if (typeof raw === "string") {
            const url = raw.split(",")[0].trim();

            if (url) {
                images.push(url);
            }
        }
    };

    // Imagen enviada como URL
    if (req.body?.imageUrl) {
        addUrl(req.body.imageUrl);
    }

    // Imagen enviada como archivo
    const file = req.files?.images?.[0];

    if (file && images.length === 0) {
        const host = req.get("host");
        const protocol = req.protocol;

        images.push(
            `${protocol}://${host}/uploads/${file.filename}`
        );
    }

    // Máximo una imagen
    return images.slice(0, 1);
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

    const documentFile = Array.isArray(req.files?.document) ? req.files.document[0] : undefined;
    const documentType = req.body.type || req.body.documentType;


    if (documentFile && documentType) {
        const documentObject = {
            originalName: documentFile.originalname,
            fileName: documentFile.filename,
            path: documentFile.path,
            mimeType: documentFile.mimetype,
            size: documentFile.size,
            type: documentType
        };

        payload.documents = Array.isArray(payload.documents) ? payload.documents : [];
        payload.documents.push(documentObject);
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


export const uploadUserDocuments = async (req, res, next) => {

    req.logger.info("intento del Usuario de enviar un archivo");

    try{

        const {id} = req.params;

        const {type} = req.body;

        const file = req.file;

        const user = await UserService.addDocument(id,file,type);

        req.logger.info(`Usuario envio el archivo ${file.originalname}`);

        return apiResponse(res, {
            statusCode: 200,
            message: "Documento agregado correctamente!", 
            payload: user
        });

    } catch (err) {
        
        req.logger.error(`Error al enviar el archivo: ${err.message}`);

        next(err);
    }
}


export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
