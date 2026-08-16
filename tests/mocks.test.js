import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

const requester = supertest(app);

describe("Testing funcional del módulo Mocking", function () {

    this.timeout(15000);

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("Debe obtener correctamente los usuarios simulados", async () => {

        const response = await requester.get("/api/mocks/mockingusers");

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Mock usuarios obtenidos");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.length.greaterThan(0);

        expect(response.body.payload[0]).to.have.property("firstName");
        expect(response.body.payload[0]).to.have.property("lastName");
        expect(response.body.payload[0]).to.have.property("email");
        expect(response.body.payload[0]).to.have.property("password");
        expect(response.body.payload[0]).to.have.property("role");

        expect(response.body.payload[0]).to.have.property("addresses");
        expect(response.body.payload[0].addresses).to.be.an("array");
        expect(response.body.payload[0].addresses).to.have.length.greaterThan(0);

        expect(response.body.payload[0].addresses[0]).to.have.property("label");
        expect(response.body.payload[0].addresses[0]).to.have.property("address");
        expect(response.body.payload[0].addresses[0]).to.have.property("reference");

    });


    it("Debe obtener correctamente los productos simulados", async () => {

        const response = await requester.get("/api/mocks/mockingproducts");

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Mock productos obtenidos");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.length.greaterThan(0); //Esa línea verifica que el array no esté vacío.

        expect(response.body.payload[0]).to.have.property("title");
        expect(response.body.payload[0]).to.have.property("description");
        expect(response.body.payload[0]).to.have.property("price");
        expect(response.body.payload[0]).to.have.property("stock");
        expect(response.body.payload[0]).to.have.property("category");
        expect(response.body.payload[0]).to.have.property("images");

        expect(response.body.payload[0].images).to.be.an("array");
        expect(response.body.payload[0].images).to.have.length.greaterThan(0);

    });

    it("Debe obtener correctamente las órdenes simuladas", async () => {

        const response = await requester.get("/api/mocks/mockingorders");

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Mock órdenes obtenidas");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.length.greaterThan(0);

        expect(response.body.payload[0]).to.have.property("buyer");
        expect(response.body.payload[0]).to.have.property("store");
        expect(response.body.payload[0]).to.have.property("products");
        expect(response.body.payload[0]).to.have.property("deliveryAddress");
        expect(response.body.payload[0]).to.have.property("total");
        expect(response.body.payload[0]).to.have.property("status");
        expect(response.body.payload[0]).to.have.property("priority");

        expect(response.body.payload[0].products).to.be.an("array");
        expect(response.body.payload[0].products).to.have.length.greaterThan(0);

        expect(response.body.payload[0].products[0]).to.have.property("name");
        expect(response.body.payload[0].products[0]).to.have.property("image");
        expect(response.body.payload[0].products[0]).to.have.property("price");
        expect(response.body.payload[0].products[0]).to.have.property("quantity");

        expect(response.body.payload[0].deliveryAddress).to.have.property("label");
        expect(response.body.payload[0].deliveryAddress).to.have.property("address");
        expect(response.body.payload[0].deliveryAddress).to.have.property("reference");

    });


    it("Debe obtener tiendas mock correctamente", async () => {

        const response = await requester.get("/api/mocks/mockingstores");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");

        expect(response.body.message).to.equal("Mock tiendas obtenidas");

        expect(response.body.payload).to.be.an("array");

        expect(response.body.payload).to.have.length.greaterThan(0);

        expect(response.body.payload[0]).to.have.property("name");

        expect(response.body.payload[0]).to.have.property("description");

        expect(response.body.payload[0]).to.have.property("address");

        expect(response.body.payload[0]).to.have.property("phone");
        
        expect(response.body.payload[0]).to.have.property("email");

        expect(response.body.payload[0]).to.have.property("images");

        expect(response.body.payload[0].images).to.be.an("array");

        expect(response.body.payload[0].images).to.have.length.greaterThan(0);

        expect(response.body.payload[0]).to.have.property("isActive");

    });

    it("Debe obtener correctamente todos los datos mock", async () => {

        const response = await requester.get("/api/mocks/mockingall");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Mock data disponible");

        expect(response.body.payload).to.have.property("users");
        expect(response.body.payload).to.have.property("products");
        expect(response.body.payload).to.have.property("stores");
        expect(response.body.payload).to.have.property("orders");


        // Validación usuarios

        expect(response.body.payload.users).to.be.an("array");

        expect(response.body.payload.users).to.have.length.greaterThan(0);

        expect(response.body.payload.users[0]).to.have.property("firstName");

        expect(response.body.payload.users[0]).to.have.property("lastName");

        expect(response.body.payload.users[0]).to.have.property("email");

        expect(response.body.payload.users[0]).to.have.property("password");

        expect(response.body.payload.users[0]).to.have.property("role");

        expect(response.body.payload.users[0]).to.have.property("addresses");

        expect(response.body.payload.users[0]).to.have.property("documents");


        // Validación productos

        expect(response.body.payload.products).to.be.an("array");

        expect(response.body.payload.products).to.have.length.greaterThan(0);

        expect(response.body.payload.products[0]).to.have.property("title");

        expect(response.body.payload.products[0]).to.have.property("price");

        expect(response.body.payload.products[0]).to.have.property("category");

        expect(response.body.payload.products[0].images).to.be.an("array");


        // Validación tiendas

        expect(response.body.payload.stores).to.be.an("array");

        expect(response.body.payload.stores).to.have.length.greaterThan(0);

        expect(response.body.payload.stores[0]).to.have.property("name");

        expect(response.body.payload.stores[0]).to.have.property("email");

        expect(response.body.payload.stores[0].images).to.be.an("array");


        // Validación órdenes

        expect(response.body.payload.orders).to.be.an("array");

        expect(response.body.payload.orders).to.have.length.greaterThan(0);

        expect(response.body.payload.orders[0]).to.have.property("products");

        expect(response.body.payload.orders[0]).to.have.property("total");

        expect(response.body.payload.orders[0]).to.have.property("status");

        expect(response.body.payload.orders[0]).to.have.property("priority");

        expect(response.body.payload.orders[0].products).to.be.an("array");

    });


    it("Debe generar correctamente datos de prueba", async () => {

        const response = await requester.post("/api/mocks/generateData");

        expect(response.status).to.equal(201);

        expect(response.body.status).to.equal("success");

        expect(response.body.message).to.equal("Datos de prueba generados y guardados correctamente");

        expect(response.body.payload).to.have.property("users");

        expect(response.body.payload).to.have.property("products");

        expect(response.body.payload).to.have.property("stores");

        expect(response.body.payload).to.have.property("orders");

        expect(response.body.payload.users).to.be.a("number").and.greaterThan(0);

        expect(response.body.payload.products).to.be.a("number").and.greaterThan(0);

        expect(response.body.payload.stores).to.be.a("number").and.greaterThan(0);

        expect(response.body.payload.orders).to.be.a("number").and.greaterThan(0);

    });


});