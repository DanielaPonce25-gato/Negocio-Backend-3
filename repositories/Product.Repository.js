
import Product from "../models/Product.js";
import "../models/User.js";


// Crea un nuevo producto en la base de datos.
// Recibe los datos del producto y lo guarda en la base de datos.

export const createProduct = async (data) => {
    return await Product.create(data);
};



// Obtiene todos los productos de la base de datos.
// seller es un ObjectId que hace referencia al modelo User

export const getProducts = async () => {
    return await Product.find().populate("seller", "firstName lastName email");
};

export const getProductCategories = async () => {
    return await Product.distinct("category");
};


// Obtiene un producto por su ID de la base de datos.
// si no lo encuentra, devuelve null.

export const getProductById = async (id) => {
    return await Product.findById(id).populate(
        "seller",
        "firstName lastName email"
    );
};


// Actualiza un producto por su ID en la base de datos.
// devuelve el producto viejo y guarda la actualizacion del producto 
// en la base de datos. 

export const updateProduct = async (id, data) => {
    return await Product.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};


// Elimina un producto por su ID de la base de datos.
export const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};