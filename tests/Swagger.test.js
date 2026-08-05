
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";


const requester = supertest(app);


describe("Testing funcional - test de Swagger", function () {

    this.timeout(15000);


    before(async () => {
        await connectDB();
    });


    after(async () => {
        await mongoose.connection.close();
    });

    it("Debe retornar la documentación de Swagger", async () => {

        const response = await requester.get("/api/docs/");

        expect(response.status).to.equal(200);
        expect(response.text).to.include("Swagger UI")});

});