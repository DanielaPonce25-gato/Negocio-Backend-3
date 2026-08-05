
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

const requester = supertest(app);

describe("Testing funcional - Casos de error módulo Mocks", function () {

    this.timeout(15000);

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("No debe generar datos con una cantidad negativa", async () => {

        const response = await requester
            .post("/api/mocks/generateData")
            .send({
                quantity: -1
            });

        expect(response.status).to.be.oneOf([400, 500]);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;

    });

    it("No debe generar datos con una cantidad inválida", async () => {

        const response = await requester
            .post("/api/mocks/generateData")
            .send({
                quantity: "texto"
            });

        expect(response.status).to.be.oneOf([400, 500]);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;

    });

    it("No debe acceder a una ruta inexistente del módulo Mocks", async () => {

        const response = await requester.get("/api/mocks/ruta-no-existe");

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;

    });

    it("Ruta inexistente general debe retornar 404", async () => {

        const response = await requester.get("/api/ruta-mocks-no-existe");

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;

    });

});