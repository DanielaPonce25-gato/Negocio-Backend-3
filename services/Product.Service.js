import mongoose from "mongoose";
import * as ProductRepository from "../repositories/Product.Repository.js";
import { createError } from "../utils/apiResponse.js";

const validateObjectId = (id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de producto no es válido."
        );

    }

};

// Se exporta una función crear producto

export const createProduct = async (productData) => {

    if (!productData) {

        throw createError(
            "VALIDATION_ERROR",
            "Los datos del producto son obligatorios."
        );

    }

    if (!productData.title) {

        throw createError(
            "VALIDATION_ERROR",
            "El título del producto es obligatorio."
        );

    }

    if (productData.price === undefined || productData.price === null) {

        throw createError(
            "VALIDATION_ERROR",
            "El precio del producto es obligatorio."
        );

    }

    if (typeof productData.price !== "number") {

        throw createError(
            "VALIDATION_ERROR",
            "El precio debe ser un número."
        );

    }

    if (!productData.seller) {

        throw createError(
            "VALIDATION_ERROR",
            "Se requiere un usuario registrado para crear el producto."
        );

    }

    if (productData.price < 0) {

        throw createError(
            "VALIDATION_ERROR",
            "El precio no puede ser negativo."
        );

    }

    try {

        return await ProductRepository.createProduct(productData);

    } catch {

        throw createError("CREATE_ERROR");

    }

};

export const getProducts = async () => {

    try {

        return await ProductRepository.getProducts();

    } catch {

        throw createError("GET_ALL_ERROR");

    }

};


export const getProductCategories = async () => {

    try {

        return await ProductRepository.getProductCategories();

    } catch {

        throw createError("GET_ALL_ERROR");

    }

};



export const getProductById = async (id) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de producto es requerido."
        );

    }

    validateObjectId(id);

    let product;

    try {

        product = await ProductRepository.getProductById(id);

    } catch {

        throw createError("GET_ERROR");

    }

    if (!product) {

        throw createError("PRODUCT_NOT_FOUND");

    }

    return product;

};



export const updateProduct = async (id, data) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de producto es requerido."
        );

    }

    validateObjectId(id);

    if (!data || Object.keys(data).length === 0) {

        throw createError(
            "VALIDATION_ERROR",
            "No hay datos para actualizar."
        );

    }

    if (data.price !== undefined) {

        if (typeof data.price !== "number") {

            throw createError(
                "VALIDATION_ERROR",
                "El precio debe ser un número."
            );

        }

        if (data.price < 0) {

            throw createError(
                "VALIDATION_ERROR",
                "El precio no puede ser negativo."
            );

        }

    }

    let updatedProduct;

    try {

        updatedProduct = await ProductRepository.updateProduct(id, data);

    } catch {

        throw createError("UPDATE_ERROR");

    }

    if (!updatedProduct) {

        throw createError("PRODUCT_NOT_FOUND");

    }

    return updatedProduct;

};

export const deleteProduct = async (id) => {

    if (!id) {

        throw createError(
            "VALIDATION_ERROR",
            "El id de producto es requerido."
        );

    }

    validateObjectId(id);

    let deletedProduct;

    try {

        deletedProduct = await ProductRepository.deleteProduct(id);

    } catch {

        throw createError("DELETE_ERROR");

    }

    if (!deletedProduct) {

        throw createError("PRODUCT_NOT_FOUND");

    }

    return deletedProduct;

};