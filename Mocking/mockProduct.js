import { faker } from "@faker-js/faker";

const categories = [
    "Ropa",
    "Electrónica",
    "Hogar",
    "Deportes",
    "Belleza",
    "Juguetes",
    "Alimentos"
];



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


const mock = generateMockProduct('seller123');
console.log(JSON.stringify(mock, null, 2));
