
// importa todas las funciones del archivo ProductRepository.js y las asigna al objeto ProductRepository.

import * as ProductRepository from "../repositories/Product.Repository.js";

/*
const ProductRepository = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
*/


// Se exporta una función crear producto

export const createProduct = async (productData) => {

    // Validaciones de negocio
    
    if (!productData.title || !productData.price) {
        throw new Error("El producto debe tener título y precio.");
    }

    if (!productData.seller) {
        throw new Error("Se requiere un usuario registrado para crear el producto.");
    }

    if (productData.price < 0) {
        throw new Error("El precio no puede ser negativo.");
    }

    return await ProductRepository.createProduct(productData); 
    
    // llama a la funcion createProduct de ProductRepository y guarda a la base de datos
};

export const getProducts = async () => {
    return await ProductRepository.getProducts(); 
    
    // llama a la funcion getProducts de ProductRepository y visualiza los productos de la base de datos
};

export const getProductCategories = async () => {
    return await ProductRepository.getProductCategories();
};

export const getProductById = async (id) => {
    if (!id) {
        throw new Error("El id de producto es requerido.");
    }

    const product = await ProductRepository.getProductById(id);
    if (!product) {
        throw new Error("Producto no encontrado.");
    }

    return product;
};



export const updateProduct = async (id, data) => {
    if (!id) {
        throw new Error("El id de producto es requerido.");
    }

    if (data.price != null && data.price < 0) {
        throw new Error("El precio no puede ser negativo.");
    }

    return await ProductRepository.updateProduct(id, data);

    // llama a la funcion updateProduct de ProductRepository y actualiza el producto en la base de datos
};

export const deleteProduct = async (id) => {
    if (!id) {
        throw new Error("El id de producto es requerido.");
    }

    return await ProductRepository.deleteProduct(id);

    // llama a la funcion deleteProduct de ProductRepository y elimina el producto de la base de datos
};
