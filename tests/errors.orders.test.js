import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

const requester = supertest(app);

describe("Testing funcional - Casos de error módulo Orders", function () {

    this.timeout(15000);

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("No debe crear una orden sin datos obligatorios", async () => {

        const response = await requester
            .post("/api/orders")
            .send({});

        expect(response.status).to.equal(400);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

    it("No debe obtener una orden con un ID inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.get(`/api/orders/${fakeId}`);

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

    it("No debe obtener una orden con un ID inválido", async () => {

        const response = await requester.get("/api/orders/idincorrecto");

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

    it("No debe actualizar el estado de una orden inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester
            .put(`/api/orders/${fakeId}/status`)
            .send({
                status: "delivered"
            });

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

    it("No debe eliminar una orden inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.delete(`/api/orders/${fakeId}`);

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

    it("Ruta no encontrada debe retornar 404", async () => {

        const response = await requester.get("/api/ruta-orders-no-existe");

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });

});