import * as ProductService from "../services/Product.Service.js";
import { apiResponse } from "../utils/apiResponse.js";


const parseImageUrls = (req) => {  // esta funcion contiene todas las imágenes enviadas en la petición 
    
    const images = [];  // Aquí se guardarán todas las imágenes.


    if (req.body.imageUrls) {  
        
        const raw = req.body.imageUrls; //  guarda el valor original para procesarlo después.

        if (Array.isArray(raw)) {

            images.push(...raw.map((url) => String(url).trim()).filter(Boolean)); 
            // Convierte cada elemento a cadena y elimina espacios antes/después.

        } else { // si es una cadena 

            images.push( // agrega resultado a la lista de imágenes.
                ...String(raw)  // convierte el valor a cadena.
                    .split(",") // la separa por comas. 
                    .map((url) => url.trim())  // elimina espacios antes/después de cada URL.
                    .filter(Boolean) // descarta entradas vacías.
            );
        }
    }

    if (req.files?.length) { // Verifica si existen archivos en req.files y si hay al menos uno.

        const uploadedUrls = req.files.map((file) => { // sube el archivo
            const host = req.get("host");
            const protocol = req.protocol;

            return `${protocol}://${host}/uploads/${file.filename}`;
            // genera un URL pública
        });

        images.push(...uploadedUrls); // Agrega esas URLs generada a la lista de imágenes.
    }

    return images; // Devuelve el arreglo final
};


// armar un objeto producto, molde

const buildProductPayload = (req) => {
    const { title, description, price, stock, category, seller } = req.body;
    const payload = { title, description, price, stock, category, seller };

    const imageUrls = parseImageUrls(req);
    if (imageUrls.length) {
        payload.images = imageUrls;
    }

    return payload;
};




// creacion del producto

export const createProduct = async (req, res, next) => {
    try {

        req.logger.info("Intentando crear producto");

        const productData = buildProductPayload(req);  // utilizado del molde
        const product = await ProductService.createProduct(productData);

        req.logger.info( `Producto creado correctamente: ${product.title}` );

        return apiResponse(res, {
            statusCode: 201,  // Código de estado HTTP para "Creado"
            message: "Producto creado exitosamente", 
            payload: product
        });

    } catch (err) {

        req.logger.error(`Error crear Producto: ${err.message}`);

        next(err); // Pasa el error al middleware de manejo de errores
    }
};


// ver lista de productos

export const getProducts = async (req, res, next) => { 
    try {

        req.logger.info("Obteniendo lista de productos");

        const products = await ProductService.getProducts();

        req.logger.info( `Productos obtenidos: ${products.length}` );

        return apiResponse(res, {
            statusCode: 200,  // Código de estado HTTP para "OK"
            message: "Productos obtenidos exitosamente",
            payload: products
        });

    } catch (err) {

        req.logger.error(`Error al obtener los Producto: ${err.message}`);

        next(err); 
    }
};


// ver un producto por ID

export const getProductById = async (req, res, next) => {
    try {

        req.logger.info( `Buscando producto id: ${req.params.id}`);

        const product = await ProductService.getProductById(req.params.id);


        if (!product) {

            req.logger.warning( `Producto no encontrado id: ${req.params.id}` );

            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }


        req.logger.info( `Producto encontrado: ${product.title}` );


        return apiResponse(res, {
            statusCode: 200,
            message: "Producto obtenido exitosamente",
            payload: product
        });

    } catch (err) {

        req.logger.error(`Error al buscar un Producto: ${err.message}`);

        next(err);
    }
};

export const getCategories = async (req, res, next) => {
    try {

        req.logger.info("Obteniendo categorías");

        const categories = await ProductService.getProductCategories();

        req.logger.info( `Categorías obtenidas: ${categories.length}` );

        return apiResponse(res, {
            statusCode: 200,
            message: "Categorías obtenidas exitosamente",
            payload: categories
        });

    } catch (err) {

        req.logger.error(`Error al obtener las Categorias: ${err.message}`);

        next(err);
    }
};


// actualizar un producto por ID

export const updateProduct = async (req, res, next) => {
    try {

        req.logger.info( `Actualizando producto id: ${req.params.id}` );

        const productData = buildProductPayload(req);
        const product = await ProductService.updateProduct(req.params.id, productData);

        req.logger.info( `Producto actualizado correctamente: ${product.title}` );

        return apiResponse(res, {
            statusCode: 200,
            message: "Producto actualizado exitosamente", 
            payload: product
        });
    
    } catch (err) {

        req.logger.error(`Error al actualizar el Producto: ${err.message}`);

        next(err); 
    }
};


// eliminar un producto por ID

export const deleteProduct = async (req, res, next) => {
    try {

        req.logger.warning( `Eliminando producto id: ${req.params.id}` );

        await ProductService.deleteProduct(req.params.id);

        req.logger.info( `Producto eliminado correctamente id: ${req.params.id}` );

        return apiResponse(res, {
            statusCode: 200,
            message: "Producto eliminado exitosamente", 
            payload: null
        });


    } catch (err) {

        req.logger.error(`Error al eliminar el Producto: ${err.message}`);

        next(err);
    }
};
