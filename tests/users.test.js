
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

import { faker } from "@faker-js/faker";

import { DOCUMENT_TYPES } from "../constants/DOCUMENT_TYPES.js";

import { USER_ROLES } from "../constants/USER_ROLES.js";

const requester = supertest(app);

describe("Testing funcional del módulo Users", function () {

    this.timeout(15000);

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("Debe obtener correctamente los usuarios", async () => {

        const response = await requester.get("/api/users");

        expect(response.status).to.equal(200);

                expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Usuarios obtenidos exitosamente");

        expect(response.body.payload).to.be.an("array");
        expect(response.body.payload).to.have.length.greaterThan(0);

        expect(response.body.payload[0]).to.have.property("_id");
        expect(response.body.payload[0]).to.have.property("firstName");
        expect(response.body.payload[0]).to.have.property("lastName");
        expect(response.body.payload[0]).to.have.property("email");
        expect(response.body.payload[0]).to.have.property("images");
        expect(response.body.payload[0]).to.have.property("addresses");
        expect(response.body.payload[0]).to.have.property("role");
        expect(response.body.payload[0]).to.have.property("documents");

        expect(response.body.payload[0].images).to.be.an("array");
        expect(response.body.payload[0].addresses).to.be.an("array");
        expect(response.body.payload[0].documents).to.be.an("array");
    
    });

    it("Debe obtener correctamente un usuario por su ID", async () => {

        const usersResponse = await requester.get("/api/users");

        const userId = usersResponse.body.payload[0]._id;

        const response = await requester.get(`/api/users/${userId}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Usuario obtenido exitosamente");

        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload).to.have.property("_id", userId);

        expect(response.body.payload).to.have.property("firstName");
        expect(response.body.payload).to.have.property("lastName");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("addresses");
        expect(response.body.payload).to.have.property("role");
        expect(response.body.payload).to.have.property("documents");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.addresses).to.be.an("array");
        expect(response.body.payload.documents).to.be.an("array");

        expect(response.body.payload.addresses[0]).to.have.property("label");
        expect(response.body.payload.addresses[0]).to.have.property("address");
        expect(response.body.payload.addresses[0]).to.have.property("reference");
    
    });


    it("Debe crear correctamente un usuario", async () => {

        const newUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            images: [faker.image.url()],
            email: faker.internet.email(),
            password: "123456",
            addresses: [
                {
                    label: faker.helpers.arrayElement(["home", "work"]),
                    address: faker.location.streetAddress(),
                    reference: faker.location.secondaryAddress()
                }
            ],
            role: USER_ROLES.CUSTOMER,
            documents: [DOCUMENT_TYPES.USER_DOCUMENT]
        };

        const response = await requester.post("/api/users").send(newUser);

        expect(response.status).to.equal(201);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Usuario creado exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("firstName");
        expect(response.body.payload).to.have.property("lastName");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("addresses");
        expect(response.body.payload).to.have.property("role");
        expect(response.body.payload).to.have.property("documents");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.addresses).to.be.an("array");
        expect(response.body.payload.documents).to.be.an("array");

        expect(response.body.payload.addresses[0]).to.have.property("label");
        expect(response.body.payload.addresses[0]).to.have.property("address");
        expect(response.body.payload.addresses[0]).to.have.property("reference");

    
    });


    it("Debe actualizar correctamente un usuario", async () => {

        const usersResponse = await requester.get("/api/users");

        const userId = usersResponse.body.payload[0]._id;

        const response = await requester
            .put(`/api/users/${userId}`)
            .send({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                images: [faker.image.url()],
                email: faker.internet.email(),
                password: "123456",
                addresses: [
                {
                    label: faker.helpers.arrayElement(["home", "work"]),
                    address: faker.location.streetAddress(),
                    reference: faker.location.secondaryAddress()
                }
            ],
            role: USER_ROLES.CUSTOMER,
            documents: [DOCUMENT_TYPES.USER_DOCUMENT]
        });

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Usuario actualizado exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("firstName");
        expect(response.body.payload).to.have.property("lastName");
        expect(response.body.payload).to.have.property("email");
        expect(response.body.payload).to.have.property("images");
        expect(response.body.payload).to.have.property("addresses");
        expect(response.body.payload).to.have.property("role");
        expect(response.body.payload).to.have.property("documents");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

        expect(response.body.payload.images).to.be.an("array");
        expect(response.body.payload.addresses).to.be.an("array");
        expect(response.body.payload.documents).to.be.an("array");

        expect(response.body.payload.addresses[0]).to.have.property("label");
        expect(response.body.payload.addresses[0]).to.have.property("address");
        expect(response.body.payload.addresses[0]).to.have.property("reference");

    });


    it("Debe eliminar correctamente un usuario", async () => {

        const usersResponse = await requester.get("/api/users");

        const userId = usersResponse.body.payload[0]._id;

        const response = await requester.delete(`/api/users/${userId}`);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Usuario eliminado exitosamente");

    });


});