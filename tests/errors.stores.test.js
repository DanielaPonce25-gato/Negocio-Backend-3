import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

const requester = supertest(app);

describe("Testing funcional - Casos de error módulo Stores", function () {

    this.timeout(15000);

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("No debe crear una tienda sin propietario", async () => {

        const response = await requester.post("/api/stores")
            .send({
                name: "Tienda error",
                description: "Sin propietario",
                address: "Dirección falsa",
                phone: "123456789",
                email: "tiendaerror@test.com",
                images: []
            });

        expect(response.status).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });


    it("No debe obtener una tienda con un ID inválido", async () => {

        const response = await requester.get("/api/stores/idincorrecto");

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;

    });


    it("No debe actualizar una tienda inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.put(`/api/stores/${fakeId}`)
            .send({
                name: "Tienda actualizada",
                description: "Error actualización"
            });

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });


    it("No debe eliminar una tienda inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.delete(`/api/stores/${fakeId}`);

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });


    it("Ruta no encontrada debe retornar 404", async () => {

        const response = await requester.get("/api/ruta-stores-no-existe");

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

});