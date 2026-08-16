
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

import { faker } from "@faker-js/faker";


const requester = supertest(app);


describe("Testing funcional del módulo Stores", function () {

    this.timeout(15000);

    let storeId; // guarda el id

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("Debe crear correctamente una tienda", async () => {

        const usersResponse = await requester.get("/api/users");

        expect(usersResponse.status).to.equal(200);
        expect(usersResponse.body.payload).to.have.length.greaterThan(0);

        const ownerId = usersResponse.body.payload[0]._id;

        const storeData = {
            name: faker.company.name(),
            description: faker.company.catchPhrase(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            images: [
                faker.image.url()
            ],
            owner: ownerId
        };

        const response = await requester.post("/api/stores").send(storeData);

        expect(response.status).to.equal(201);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Tienda creada exitosamente");

        storeId = response.body.payload._id;

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("owner");
        expect(response.body.payload).to.have.property("name");
        expect(response.body.payload).to.have.property("description");
        expect(response.body.payload).to.have.property("address");
        expect(response.body.payload).to.have.property("phone");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("isActive");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.owner).to.equal(ownerId);
        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.isActive).to.equal(true);

    });


    it("Debe obtener correctamente todas las tiendas", async () => {

        const response = await requester.get("/api/stores");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Tiendas obtenidas exitosamente");

        expect(response.body.payload).to.be.an("array");

        expect(response.body.payload.length).to.be.greaterThan(0);

        const store = response.body.payload.find(store => store._id === storeId);

        expect(store).to.exist;

        expect(store).to.have.property("_id", storeId);
        expect(store).to.have.property("owner");
        expect(store).to.have.property("name");
        expect(store).to.have.property("description");
        expect(store).to.have.property("address");
        expect(store).to.have.property("phone");
        expect(store).to.have.property("email");
        expect(store).to.have.property("images");
        expect(store).to.have.property("isActive");
        expect(store).to.have.property("createdAt");
        expect(store).to.have.property("updatedAt");

        expect(store.owner).to.be.an("object");
        expect(store.owner).to.have.property("_id");
        expect(store.owner).to.have.property("firstName");
        expect(store.owner).to.have.property("lastName");
        expect(store.owner).to.have.property("email");

    });


    it("Debe obtener correctamente una tienda por ID", async () => {

        const response = await requester.get(`/api/stores/${storeId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Tienda obtenida exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", storeId);
        expect(response.body.payload).to.have.property("owner");
        expect(response.body.payload).to.have.property("name");
        expect(response.body.payload).to.have.property("description");
        expect(response.body.payload).to.have.property("address");
        expect(response.body.payload).to.have.property("phone");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("isActive");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.owner).to.be.an("object");
        expect(response.body.payload.owner).to.have.property("_id");
        expect(response.body.payload.owner).to.have.property("firstName");
        expect(response.body.payload.owner).to.have.property("lastName");
        expect(response.body.payload.owner).to.have.property("email");

        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.isActive).to.be.a("boolean");

    });

    it("Debe obtener correctamente las tiendas por ID del propietario", async () => {

        const usersResponse = await requester.get("/api/users");

        expect(usersResponse.status).to.equal(200);
        expect(usersResponse.body.payload).to.have.length.greaterThan(0);

        const ownerId = usersResponse.body.payload[0]._id;

        // Obtener las tiendas de ese propietario
        const response = await requester.get(`/api/stores/owner/${ownerId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Tiendas del propietario obtenidas exitosamente");

        expect(response.body.payload).to.be.an("array");

        // Si el propietario tiene tiendas
        if (response.body.payload.length > 0) {

            const store = response.body.payload[0];

            expect(store).to.have.property("_id");
            expect(store).to.have.property("owner", ownerId);
            expect(store).to.have.property("name");
            expect(store).to.have.property("description");
            expect(store).to.have.property("address");
            expect(store).to.have.property("phone");
            expect(store).to.have.property("email");
            expect(store).to.have.property("images");
            expect(store).to.have.property("isActive");
            expect(store).to.have.property("createdAt");
            expect(store).to.have.property("updatedAt");

            expect(store.images).to.be.an("array");
            expect(store.isActive).to.be.a("boolean");
        }

    });


    it("Debe actualizar correctamente una tienda", async () => {

        const updatedData = {
            name: faker.company.name(),
            description: faker.company.catchPhrase(),
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            images: [
                faker.image.url()
            ]
        };

        const response = await requester.put(`/api/stores/${storeId}`).send(updatedData);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Tienda actualizada exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", storeId);
        expect(response.body.payload).to.have.property("owner");
        expect(response.body.payload).to.have.property("name", updatedData.name);
        expect(response.body.payload).to.have.property("description", updatedData.description);
        expect(response.body.payload).to.have.property("address", updatedData.address);
        expect(response.body.payload).to.have.property("phone", updatedData.phone);
        expect(response.body.payload).to.have.property("email", updatedData.email);
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("isActive");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.owner).to.be.a("string");
        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.isActive).to.be.a("boolean");

    });


    it("Debe eliminar correctamente una tienda", async () => {

        const response = await requester.delete(`/api/stores/${storeId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Tienda eliminada exitosamente");
    
    });


});
