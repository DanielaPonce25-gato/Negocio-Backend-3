
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

import { faker } from "@faker-js/faker";


const requester = supertest(app);


describe("Testing funcional del módulo Products", function () {

    this.timeout(15000);

    let productId; // guarda el id

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("Debe crear correctamente un producto", async () => {

        const usersResponse = await requester.get("/api/users");

        expect(usersResponse.body.payload).to.have.length.greaterThan(0);

        const sellerId = usersResponse.body.payload[0]._id;

        const productData = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.helpers.arrayElement([
                "Ropa",
                "Eletrodomesticos",
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
            ]),
            images: [
                faker.image.url()
            ],
            seller: sellerId
        };


        const response = await requester.post("/api/products").send(productData);


        expect(response.status).to.equal(201);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Producto creado exitosamente");

        productId = response.body.payload._id;

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("title");
        expect(response.body.payload).to.have.property("description");
        expect(response.body.payload).to.have.property("price");
        expect(response.body.payload).to.have.property("stock");
        expect(response.body.payload).to.have.property("category");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("seller");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.images).to.be.an("array");

        expect(response.body.payload.seller).to.be.a("string");

    });



    it("Debe obtener correctamente un producto por ID", async () => {

        const response = await requester.get(`/api/products/${productId}`);


        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Producto obtenido exitosamente");


        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", productId);
        expect(response.body.payload).to.have.property("title");
        expect(response.body.payload).to.have.property("description");
        expect(response.body.payload).to.have.property("price");
        expect(response.body.payload).to.have.property("stock");
        expect(response.body.payload).to.have.property("category");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("seller");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");


        expect(response.body.payload.images).to.be.an("array");


        expect(response.body.payload.seller).to.be.an("object");

        expect(response.body.payload.seller).to.have.property("_id");
        expect(response.body.payload.seller).to.have.property("firstName");
        expect(response.body.payload.seller).to.have.property("lastName");
        expect(response.body.payload.seller).to.have.property("email");

    });


    it("Debe obtener correctamente los productos", async () => {

        const response = await requester.get("/api/products");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Productos obtenidos exitosamente");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.length.greaterThan(0);

        const product = response.body.payload.find(product => product.seller);

        expect(product).to.exist;

        expect(product).to.have.property("_id");
        expect(product).to.have.property("title");
        expect(product).to.have.property("description");
        expect(product).to.have.property("price");
        expect(product).to.have.property("stock");
        expect(product).to.have.property("category");
        expect(product).to.have.property("images");
        expect(product).to.have.property("seller");
        expect(product).to.have.property("createdAt");
        expect(product).to.have.property("updatedAt");

        expect(product.images).to.be.an("array");

        expect(product.seller).to.be.an("object");
        expect(product.seller).to.have.property("_id");
        expect(product.seller).to.have.property("firstName");
        expect(product.seller).to.have.property("lastName");
        expect(product.seller).to.have.property("email");

    });


    it("Debe obtener correctamente las categorías de productos", async () => {

        const response = await requester.get("/api/products/categories");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Categorías obtenidas exitosamente");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.length.greaterThan(0);

        response.body.payload.forEach(category => {
            expect(category).to.be.a("string");
        });

    });


    it("Debe actualizar correctamente un producto por ID", async () => {

        const updatedData = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
            stock: faker.number.int({ min: 1, max: 100 }),
            category: faker.helpers.arrayElement([
                "Ropa",
                "Eletrodomesticos",
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
            ]),
            images: [
                faker.image.url()
            ]
        };

        const response = await requester.put(`/api/products/${productId}`).send(updatedData);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Producto actualizado exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", productId);
        expect(response.body.payload).to.have.property("title", updatedData.title);
        expect(response.body.payload).to.have.property("description", updatedData.description);
        expect(response.body.payload).to.have.property("price", updatedData.price);
        expect(response.body.payload).to.have.property("stock", updatedData.stock);
        expect(response.body.payload).to.have.property("category", updatedData.category);
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("seller");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.seller).to.be.a("string");

    });


    it("Debe eliminar correctamente un producto por ID", async () => {

        const response = await requester.delete(`/api/products/${productId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Producto eliminado exitosamente");  
    });


});
