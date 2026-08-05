
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";


const requester = supertest(app);


describe("Testing funcional - Casos de error módulo Products", function () {

    this.timeout(15000);


    before(async () => {
        await connectDB();
    });


    after(async () => {
        await mongoose.connection.close();
    });



    it("No debe crear un producto sin datos obligatorios", async () => {

        const response = await requester.post("/api/products")
            .send({
                title: "Producto incompleto"
            });


        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });




    it("No debe crear un producto con precio inválido", async () => {

        const response = await requester
            .post("/api/products")
            .send({

                title: "Producto error",

                description: "Producto con precio incorrecto",

                price: "precio",

                stock: 10,

                category: "Tecnologia",

                images: [],

                seller: "000000000000000000000000"

            });

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe obtener un producto con un ID inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.get(`/api/products/${fakeId}`);

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe obtener un producto con un ID inválido", async () => {

        const response = await requester.get("/api/products/idincorrecto");

        expect(response.status).to.equal(400);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe actualizar un producto inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.put(`/api/products/${fakeId}`)
            .send({

                title: "Producto actualizado",

                price: 1000

            });


        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("No debe eliminar un producto inexistente", async () => {

        const fakeId = "000000000000000000000000";

        const response = await requester.delete(`/api/products/${fakeId}`);

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });


    it("Ruta no encontrada debe retornar 404", async () => {

        const response = await requester.get("/api/ruta-products-no-existe");

        expect(response.status).to.equal(404);

        expect(response.body.status).to.equal("error");

        expect(response.body.message).to.exist;


    });



});