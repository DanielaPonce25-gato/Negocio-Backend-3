// importa todas las funciones del archivo UserRepository.js y las asigna al objeto UserRepository.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as UserRepository from "../repositories/User.Repository.js";
import { USER_ROLES, DOCUMENT_TYPES } from "../constants/index.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // valida el gmail
const roles = Object.values(USER_ROLES); // obtiene los perfiles definidos en USER_ROLES
const documentTypes = Object.values(DOCUMENT_TYPES);

const validateStringField = (value, fieldName, { required = false, max = 200 } = {}) => {

    if (required && (!value || typeof value !== "string" || value.trim().length === 0)) { 

        throw new Error(`El ${fieldName} es requerido.`);
    }

    if (value !== undefined) { 

        if (typeof value !== "string") {
            throw new Error(`El ${fieldName} debe ser una cadena de texto.`);
        }

        if (value.trim().length === 0) {
            throw new Error(`El ${fieldName} no puede estar vacío.`);
        }

        if (value.trim().length > max) {
            throw new Error(`El ${fieldName} no puede exceder ${max} caracteres.`);
        }
        return value.trim();
    }

    return value;
};

const validateDocuments = (documents) => {
    if (!Array.isArray(documents)) {
        throw new Error("Los documentos deben ser un arreglo.");
    }
    const invalidDocument = documents.find(
        (document) => typeof document !== "string" || !documentTypes.includes(document)
    );
    if (invalidDocument) {
        throw new Error(`Cada documento debe ser uno de los tipos válidos: ${documentTypes.join(", ")}.`);
    }
    return documents;
};

const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("El id de usuario no es válido.");
    }
};

// Se exporta una función crear usuario

export const createUser = async (userData) => {

    // Validaciones de negocio
    
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        throw new Error("El usuario debe tener nombre, apellido, email y contraseña.");
    }

    userData.firstName = validateStringField(userData.firstName, "nombre", { required: true, max: 100 });
    userData.lastName = validateStringField(userData.lastName, "apellido", { required: true, max: 100 });
    userData.email = validateStringField(userData.email, "email", { required: true, max: 200 });
    userData.address = validateStringField(userData.address, "dirección", { required: true, max: 200 });

    if (!emailRegex.test(userData.email)) {
        throw new Error("El email no es válido.");
    }

    if (typeof userData.password !== "string" || userData.password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }

    if (userData.role !== undefined && !roles.includes(userData.role)) {
        throw new Error("El rol de usuario no es válido.");
    }

    if (userData.documents !== undefined) {
        userData.documents = validateDocuments(userData.documents);
    }

    // Verificar que el email no exista
    const existingUser = await UserRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("El email ya está registrado.");
    }

    const payload = { ...userData };
    if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
    }

    return await UserRepository.createUser(payload);
};

export const getUsers = async () => {
    return await UserRepository.getUsers(); 
    
    // llama a la funcion getUsers de UserRepository y visualiza los usuarios de la base de datos
};

export const getUserById = async (id) => {
    if (!id) {
        throw new Error("El id de usuario es requerido.");
    }
    validateObjectId(id);

    const user = await UserRepository.getUserById(id);
    if (!user) {
        throw new Error("Usuario no encontrado.");
    }

    return user;
};

export const findUserByEmail = async (email) => {
    if (!email) {
        throw new Error("El email es requerido.");
    }

    return await UserRepository.findUserByEmail(email);

    // llama a la funcion findUserByEmail de UserRepository
};

export const updateUser = async (id, data) => {
    if (!id) {
        throw new Error("El id de usuario es requerido.");
    }
    validateObjectId(id);

    if (data.email !== undefined) {
        data.email = validateStringField(data.email, "email", { required: true, max: 200 });
        if (!emailRegex.test(data.email)) {
            throw new Error("El email no es válido.");
        }

        const existingUser = await UserRepository.findUserByEmail(data.email);
        if (existingUser && existingUser._id.toString() !== id) {
            throw new Error("El email ya está registrado.");
        }
    }

    if (data.firstName !== undefined) {
        data.firstName = validateStringField(data.firstName, "nombre", { required: true, max: 100 });
    }

    if (data.lastName !== undefined) {
        data.lastName = validateStringField(data.lastName, "apellido", { required: true, max: 100 });
    }

    if (data.address !== undefined) {
        data.address = validateStringField(data.address, "dirección", { required: true, max: 200 });
    }

    if (data.password !== undefined) {
        if (typeof data.password !== "string" || data.password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }
    }

    if (data.role !== undefined && !roles.includes(data.role)) {
        throw new Error("El rol de usuario no es válido.");
    }

    if (data.documents !== undefined) {
        data.documents = validateDocuments(data.documents);
    }

    const payload = { ...data };
    if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
    }

    return await UserRepository.updateUser(id, payload);

    // llama a la funcion updateUser de UserRepository y actualiza el usuario en la base de datos
};

export const deleteUser = async (id) => {
    if (!id) {
        throw new Error("El id de usuario es requerido.");
    }
    validateObjectId(id);

    return await UserRepository.deleteUser(id);

    // llama a la funcion deleteUser de UserRepository y elimina el usuario de la base de datos
};
