import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";


const requester = supertest(app);


describe("Testing funcional - Casos de error de Swagger", function () {

    this.timeout(15000);


    before(async () => {
        await connectDB();
    });


    after(async () => {
        await mongoose.connection.close();
    });

    it("Ruta inexistente debe retornar 404", async () => {

        const response = await requester.get("/api/swagger-error");

        expect(response.status).to.equal(404);
        expect(response.body.status).to.equal("error");
        expect(response.body.message).to.exist;

    });;

});