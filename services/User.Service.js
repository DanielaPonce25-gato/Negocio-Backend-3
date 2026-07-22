// importa todas las funciones del archivo UserRepository.js y las asigna al objeto UserRepository.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as UserRepository from "../repositories/User.Repository.js";
import { USER_ROLES, DOCUMENT_TYPES } from "../constants/index.js";

import { createError } from "../utils/apiResponse.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // valida el gmail
const roles = Object.values(USER_ROLES); // obtiene los perfiles definidos en USER_ROLES
const documentTypes = Object.values(DOCUMENT_TYPES);

const validateStringField = (value, fieldName, { required = false, max = 200 } = {}) => {

    if (required && (!value || typeof value !== "string" || value.trim().length === 0)) { 

        throw createError(
            "VALIDATION_ERROR",
            `El ${fieldName} es requerido.`
        );
    }

    if (value !== undefined) { 

        if (typeof value !== "string") {
            
            throw createError(
                "VALIDATION_ERROR",
                `El ${fieldName} es requerido.`
            );
        }

        if (value.trim().length === 0) {

            throw createError(
                "VALIDATION_ERROR",
                `El ${fieldName} es requerido.`
            );

        }

        if (value.trim().length > max) {

            throw createError(
                "VALIDATION_ERROR",
                `El ${fieldName} es requerido.`
            );
            
        }

        return value.trim();
    }

    return value;
};

const validateAddresses = (addresses) => {

    if (!Array.isArray(addresses)) {

        throw createError(
            "VALIDATION_ERROR",
            "Las direcciones deben ser un arreglo."
        );

    }

    if (addresses.length === 0) {

        throw createError(
            "VALIDATION_ERROR",
            "Las direcciones deben ser un arreglo."
        );
        
    }

    addresses.forEach((addr, index) => {
        if (!addr.label || !addr.address) {

            throw createError(
                "VALIDATION_ERROR",
                "La dirección debe tener label y address."
            );

        }


        if (!["home", "work"].includes(addr.label)) {

            throw createError(
                "VALIDATION_ERROR",
                "El label de la dirección debe ser 'home' o 'work'."
            );

        }


        if (typeof addr.address !== "string" || addr.address.trim().length === 0) {

            throw createError(
                "VALIDATION_ERROR",
                "La dirección debe ser una cadena de texto no vacía."
            );

        }
    });

    return addresses;
};


const validateDocuments = (documents) => {

    if (!Array.isArray(documents)) {

        throw createError(
            "VALIDATION_ERROR",
            "Los documentos deben ser un arreglo."
        );

    }


    const invalidDocument = documents.find(
        (document) => typeof document !== "string" || !documentTypes.includes(document)
    );

    if (invalidDocument) {

        throw createError(
            "VALIDATION_ERROR",
            `Cada documento debe ser uno de los tipos válidos: ${documentTypes.join(", ")}.`
        );

    }

    return documents;
};



const validateObjectId = (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de usuario no es válido."
        );

    }

};

// Se exporta una función crear usuario

export const createUser = async (userData) => {

    // Validaciones de negocio
    
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {

        throw createError(
            "VALIDATION_ERROR",
            "El usuario debe tener nombre, apellido, email y contraseña."
        );

    }

    userData.firstName = validateStringField(userData.firstName, "nombre", { required: true, max: 100 });
    userData.lastName = validateStringField(userData.lastName, "apellido", { required: true, max: 100 });
    userData.email = validateStringField(userData.email, "email", { required: true, max: 200 });

    if (!userData.addresses) {

        throw createError(
            "VALIDATION_ERROR",
            "Las direcciones son obligatorias."
        );

    }

    userData.addresses = validateAddresses(userData.addresses);

    if (!emailRegex.test(userData.email)) {

        throw createError(
            "VALIDATION_ERROR",
            "El email no es válido."
        );

    }

    if (typeof userData.password !== "string" || userData.password.length < 6) {

        throw createError(
            "VALIDATION_ERROR",
            "La contraseña debe tener al menos 6 caracteres."
        );
        
    }

    if (userData.role !== undefined && !roles.includes(userData.role)) {

        throw createError(
            "VALIDATION_ERROR",
            "El rol de usuario no es válido."
        );

    }

    if (userData.documents !== undefined) {
        userData.documents = validateDocuments(userData.documents);
    }

    // Verificar que el email no exista
    
    let existingUser;

    try {

        existingUser = await UserRepository.findUserByEmail(userData.email);

    } catch {

        throw createError("GET_ERROR");

    }

    if (existingUser) {

        throw createError("USER_ALREADY_EXISTS");

    }

    const payload = { ...userData };

    if (payload.password) {

        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);

    }

    try {

        return await UserRepository.createUser(payload);

    } catch {

        throw createError("CREATE_ERROR");

    }

};

export const getUsers = async () => {

    try {

        return await UserRepository.getUsers();

    } catch {

        throw createError("GET_ALL_ERROR");

    }
    
    // llama a la funcion getUsers de UserRepository y visualiza los usuarios de la base de datos
};

export const getUserById = async (id) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de usuario es requerido."
        );

    }

    validateObjectId(id);

    let user;

    try {

        user = await UserRepository.getUserById(id);

    } catch {

        throw createError("GET_ERROR");

    }

    if (!user) {

        throw createError("USER_NOT_FOUND");

    }

    return user;

};

export const findUserByEmail = async (email) => {

    if (!email) {

        throw createError(
            "VALIDATION_ERROR",
            "El email es requerido."
        );

    }

    try {

        return await UserRepository.findUserByEmail(email);

    } catch {

        throw createError("GET_ERROR");

    }

    // llama a la funcion findUserByEmail de UserRepository
};

export const updateUser = async (id, data) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de usuario es requerido."
        );

    }

    validateObjectId(id);

    if (data.email !== undefined) {
        data.email = validateStringField(data.email, "email", { required: true, max: 200 });

        if (!emailRegex.test(data.email)) {

            throw createError(
                "VALIDATION_ERROR",
                "El email no es válido."
            );

        }

        let existingUser;

        try {

            existingUser = await UserRepository.findUserByEmail(data.email);

        } catch {

            throw createError("GET_ERROR");

        }

        if (existingUser && existingUser._id.toString() !== id) {

            throw createError("USER_ALREADY_EXISTS");

        }
    }

    if (data.firstName !== undefined) {
        data.firstName = validateStringField(data.firstName, "nombre", { required: true, max: 100 });
    }

    if (data.lastName !== undefined) {
        data.lastName = validateStringField(data.lastName, "apellido", { required: true, max: 100 });
    }

    if (data.addresses !== undefined) {
        data.addresses = validateAddresses(data.addresses);
    }

    if (data.password !== undefined) {
        if (typeof data.password !== "string" || data.password.length < 6) {

            throw createError(
                "VALIDATION_ERROR",
                "La contraseña debe tener al menos 6 caracteres."
            );

        }
    }

    if (data.role !== undefined && !roles.includes(data.role)) {

        throw createError(
            "VALIDATION_ERROR",
            "El rol de usuario no es válido."
        );

    }

    if (data.documents !== undefined) {
        data.documents = validateDocuments(data.documents);
    }

    const payload = { ...data };
    if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
    }

    let updatedUser;

    try {

        updatedUser = await UserRepository.updateUser(id, payload);

    } catch {

        throw createError("UPDATE_ERROR");

    }

    if (!updatedUser) {

        throw createError(
            "USER_NOT_FOUND"
        );

    }

    return updatedUser;

    // llama a la funcion updateUser de UserRepository y actualiza el usuario en la base de datos
};


export const deleteUser = async (id) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de usuario es requerido."
        );

    }

    validateObjectId(id);

    let deletedUser;

    try {

        deletedUser = await UserRepository.deleteUser(id);

    } catch {

        throw createError("DELETE_ERROR");

    }

    if (!deletedUser) {

        throw createError(
            "USER_NOT_FOUND"
        );

    }

    return deletedUser;

    // llama a la funcion deleteUser de UserRepository y elimina el usuario de la base de datos
};
