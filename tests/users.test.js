
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

        const response = await requester.post("/api/users")

            // field porque la petición es multipart/form-data.

            .field("firstName", faker.person.firstName())
            .field("lastName", faker.person.lastName())
            .field("email", faker.internet.email())
            .field("password", "123456")
            .field("role", USER_ROLES.CUSTOMER)
            .field(
                "addresses",
                JSON.stringify([
                    {
                        label: faker.helpers.arrayElement(["home", "work"]),
                        address: faker.location.streetAddress(),
                        reference: faker.location.secondaryAddress()
                    }
                ])
            )
            .field("type", DOCUMENT_TYPES.USER_DOCUMENT)
            
            // Simula la subida de un archivo PDF
            .attach(
                "document",
                Buffer.from("%PDF-1.4\n% Archivo PDF de prueba"),
                "documento-test.pdf"
            );

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

        expect(response.body.payload.documents[0]).to.have.property("originalName");
        expect(response.body.payload.documents[0]).to.have.property("fileName");
        expect(response.body.payload.documents[0]).to.have.property("path");
        expect(response.body.payload.documents[0]).to.have.property("mimeType");
        expect(response.body.payload.documents[0]).to.have.property("size");
        expect(response.body.payload.documents[0]).to.have.property("type");

        expect(response.body.payload.documents[0].type)
            .to.equal(DOCUMENT_TYPES.USER_DOCUMENT);

        expect(response.body.payload.addresses[0]).to.have.property("label");
        expect(response.body.payload.addresses[0]).to.have.property("address");
        expect(response.body.payload.addresses[0]).to.have.property("reference");
    });



    it("Debe actualizar correctamente un usuario", async () => {

        const usersResponse = await requester.get("/api/users");

        const userId = usersResponse.body.payload[0]._id;

        const response = await requester.put(`/api/users/${userId}`)

        
        .field("firstName", faker.person.firstName())
        .field("lastName", faker.person.lastName())
        .field("email", faker.internet.email())
        .field("password", "123456")
        .field("role", USER_ROLES.CUSTOMER)
        .field(
            "addresses",
            JSON.stringify([
                {
                    label: faker.helpers.arrayElement(["home", "work"]),
                    address: faker.location.streetAddress(),
                    reference: faker.location.secondaryAddress()
                }
            ])
        )
        
        .field("type", DOCUMENT_TYPES.USER_DOCUMENT)

        // Nuevo documento.
        // Los documentos anteriores se conservan y este se agrega al final.

        .attach(
            "document",
            Buffer.from("%PDF-1.4\n% Documento PDF actualizado de prueba"),
            "documento-actualizado-test.pdf"
        );

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

        // El documento nuevo se agrega al final.
        const documents = response.body.payload.documents;
        const document = documents[documents.length - 1];

        expect(document).to.have.property("originalName");
        expect(document).to.have.property("fileName");
        expect(document).to.have.property("path");
        expect(document).to.have.property("mimeType");
        expect(document).to.have.property("size");
        expect(document).to.have.property("type");

        expect(document.type).to.equal(DOCUMENT_TYPES.USER_DOCUMENT);

        expect(document.originalName).to.equal(
            "documento-actualizado-test.pdf"
        );

        expect(response.body.payload.addresses[0]).to.have.property("label");
        expect(response.body.payload.addresses[0]).to.have.property("address");
        expect(response.body.payload.addresses[0]).to.have.property("reference");

    });




    it("Debe agregar correctamente un documento a un usuario", async () => {

        const usersResponse = await requester.get("/api/users");

        const user = usersResponse.body.payload[0];

        const userId = user._id;

        // Cantidad de documentos antes de agregar el nuevo
        const documentsBefore = user.documents.length;

        const response = await requester.post(`/api/users/${userId}/documents`)
        .field("type", DOCUMENT_TYPES.USER_DOCUMENT)
        .attach(
            "document",
            Buffer.from("%PDF-1.4\n% Documento PDF de prueba"),
            "documento-agregado-test.pdf"
        );

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");

        expect(response.body.message).to.equal("Documento agregado correctamente!");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", userId);

        expect(response.body.payload).to.have.property("documents");

        expect(response.body.payload.documents).to.be.an("array");

        // Verifica que se agregó un documento
        // y que los documentos anteriores se conservaron.
        expect(response.body.payload.documents).to.have.lengthOf(documentsBefore + 1);

        // El último documento debe ser el recién agregado.
        const document =
            response.body.payload.documents[
                response.body.payload.documents.length - 1
            ];

        expect(document).to.have.property("originalName");
        expect(document).to.have.property("fileName");
        expect(document).to.have.property("path");
        expect(document).to.have.property("mimeType");
        expect(document).to.have.property("size");
        expect(document).to.have.property("type");

        expect(document.originalName).to.equal("documento-agregado-test.pdf");

        expect(document.fileName).to.be.a("string").and.not.empty;
        
        expect(document.path).to.be.a("string").and.not.empty;

        expect(document.mimeType).to.equal("application/pdf");

        expect(document.size).to.be.a("string");

        expect(Number(document.size)) .to.be.greaterThan(0);

        expect(document.type).to.equal(DOCUMENT_TYPES.USER_DOCUMENT);
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