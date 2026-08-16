
import Product from "../models/Product.js";
import "../models/User.js";

import logger from "../config/logger.js";


// Crea un nuevo producto en la base de datos.
// Recibe los datos del producto y lo guarda en la base de datos.

export const createProduct = async (data) => {
    try {

        return await Product.create(data);

    } catch (error) {

        logger.error(`Error al crear producto: ${error.message}`);
        throw error;
    }
};



// Obtiene todos los productos de la base de datos.
// seller es un ObjectId que hace referencia al modelo User

export const getProducts = async () => {
    try {

        return await Product.find().populate("seller", "firstName lastName email");

    } catch (error) {

        logger.error(`Error al obtener productos: ${error.message}`);
        throw error;
    }
};

export const getProductCategories = async () => {
    try {

        return await Product.distinct("category");

    } catch (error) {

        logger.error(`Error al obtener categorías de productos: ${error.message}`);
        throw error;
    }
};


// Obtiene un producto por su ID de la base de datos.
// si no lo encuentra, devuelve null.

export const getProductById = async (id) => {
    try {

        return await Product.findById(id)
            .populate("seller", "firstName lastName email");

    } catch (error) {

        logger.error(`Error al obtener producto por ID: ${error.message}`);
        throw error;
    }
};


// Actualiza un producto por su ID en la base de datos.
// devuelve el producto viejo y guarda la actualizacion del producto 
// en la base de datos. 

export const updateProduct = async (id, data) => {
    try {

        return await Product.findByIdAndUpdate(id, data, { new: true });

    } catch (error) {

        logger.error(`Error al actualizar producto: ${error.message}`);
        throw error;
    }
};


// Elimina un producto por su ID de la base de datos.
export const deleteProduct = async (id) => {
    try {

        return await Product.findByIdAndDelete(id);

    } catch (error) {

        logger.error(`Error al eliminar producto: ${error.message}`);
        throw error;
    }
};