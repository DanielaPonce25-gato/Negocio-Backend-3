import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";


const requester = supertest(app);


describe("Testing funcional - Casos de error módulo Users", function () {

    this.timeout(15000);


    before(async () => {
        await connectDB();
    });


    after(async () => {
        await mongoose.connection.close();
    });



    it("No debe crear un usuario sin datos obligatorios", async () => {

        const response = await requester.post("/api/users")
            .send({
                email: "usuarioerror@test.com"
            });

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;

    });


    it("No debe obtener un usuario con un ID inexistente", async () => {


        const fakeId = "000000000000000000000000";


        const response = await requester.get(`/api/users/${fakeId}`);

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe obtener un usuario con un ID inválido", async () => {


        const response = await requester.get("/api/users/idincorrecto");

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe actualizar un usuario inexistente", async () => {


        const fakeId = "000000000000000000000000";


        const response = await requester.put(`/api/users/${fakeId}`)
            .send({
                firstName: "Usuario",
                lastName: "Error",
                email: "error@test.com"
            });

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe eliminar un usuario inexistente", async () => {


        const fakeId = "000000000000000000000000";

        const response = await requester.delete(`/api/users/${fakeId}`);


        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("Ruta no encontrada debe retornar 404", async () => {

        const response = await requester.get("/api/ruta-no-existente");

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });


});