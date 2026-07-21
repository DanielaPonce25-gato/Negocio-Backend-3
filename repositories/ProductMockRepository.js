
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

const categories = [
    "Ropa",
    "Eletródomesticos",
    "Hogar",
    "libros",
    "Deportes",
    "Tecnologia",
    "Belleza",
    "Perfumeria",
    "Juguetes",
    "Alimentos",
    "Alimento de Mascota",
    "Juguetes para Mascotas"
];

/**
 * Repository - Generador de datos mock para productos
 * Esta capa maneja la generación de datos ficticios
 */
export const generateMockProduct = (sellerId) => {
    const title = faker.commerce.productName();

    return {
        title,
        description: faker.commerce.productDescription(),
        price: Number(
            faker.commerce.price({ min: 10, max: 200, dec: 2 }) 
        ),
        stock: faker.number.int({ min: 1, max: 50 }),
        category: faker.helpers.arrayElement(categories),
        images: [
            `https://picsum.photos/seed/${faker.string.uuid()}/300/300`
        ],
        seller: sellerId
    };
};

export const generateMockProducts = (quantity = 1, sellerId) => {
    return Array.from({ length: quantity }, () =>
        generateMockProduct(sellerId)
    );
}

export default {
    generateMockProduct,
    generateMockProducts
};
