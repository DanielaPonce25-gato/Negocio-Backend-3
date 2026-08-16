

import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

import app from "../app.js";
import connectDB from "../config/db.js";

import { faker } from "@faker-js/faker";

import { ORDER_STATUS } from "../constants/index.js";

import { DELIVERY_PRIORITY } from "../constants/DELIVERY_PRIORITY.js";


const requester = supertest(app);



describe("Testing funcional del módulo Orders", function () {

    this.timeout(15000);

    let orderId; // guarda el id

    let buyerId; // guarda el id del comprador

    let storeId; // guarda el id de la tienda

    before(async () => {
        await connectDB();
    });

    after(async () => {
        await mongoose.connection.close();
    });


    it("Debe crear correctamente una orden", async () => {

        // Obtener un comprador
        const usersResponse = await requester.get("/api/users");

        expect(usersResponse.status).to.equal(200);
        expect(usersResponse.body.payload).to.have.length.greaterThan(0);

        const buyer = usersResponse.body.payload[0];

        // Obtener una tienda
        const storesResponse = await requester.get("/api/stores");

        expect(storesResponse.status).to.equal(200);
        expect(storesResponse.body.payload).to.have.length.greaterThan(0);

        const store = storesResponse.body.payload[0];

        // Obtener un producto
        const productsResponse = await requester.get("/api/products");

        expect(productsResponse.status).to.equal(200);
        expect(productsResponse.body.payload).to.have.length.greaterThan(0);

        const product = productsResponse.body.payload[0];

        const quantity = faker.number.int({ min: 1, max: 5 });


        const orderData = {
            buyer: buyer._id,
            store: store._id,
            products: [
                {
                    product: product._id,
                    image: product.images[0],
                    name: product.title,
                    price: product.price,
                    quantity: quantity
                }
            ],
            deliveryAddress: {
                label: "Casa",
                address: faker.location.streetAddress(),
                reference: faker.location.secondaryAddress()
            },
                total: product.price * quantity,
                status: ORDER_STATUS.CREATED,
                priority: DELIVERY_PRIORITY.NORMAL
        };


        const response = await requester.post("/api/orders").send(orderData);


        expect(response.status).to.equal(201);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Orden creada exitosamente");

        expect(response.body.payload).to.be.an("object");


        orderId = response.body.payload._id;

        buyerId = response.body.payload.buyer; 

        storeId = response.body.payload.store; 


        expect(response.body.payload).to.have.property("_id");
        expect(response.body.payload).to.have.property("buyer", buyer._id);
        expect(response.body.payload).to.have.property("store", store._id);
        expect(response.body.payload).to.have.property("products");
        expect(response.body.payload).to.have.property("deliveryAddress");
        expect(response.body.payload).to.have.property("total");
        expect(response.body.payload).to.have.property("status", ORDER_STATUS.CREATED);
        expect(response.body.payload).to.have.property("priority");
        expect(response.body.payload).to.have.property("proof");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");


        expect(response.body.payload.products).to.be.an("array");
        expect(response.body.payload.products).to.have.lengthOf(1);


        expect(response.body.payload.products[0]).to.have.property("product", product._id);

        expect(response.body.payload.products[0]).to.have.property("image", product.images[0]);

        expect(response.body.payload.products[0]).to.have.property("name", product.title);

        expect(response.body.payload.products[0]).to.have.property("price", product.price);

        expect(response.body.payload.products[0]).to.have.property("quantity", quantity);


        expect(response.body.payload.deliveryAddress).to.be.an("object");

        expect(response.body.payload.deliveryAddress).to.have.property("label");

        expect(response.body.payload.deliveryAddress).to.have.property("address");

        expect(response.body.payload.deliveryAddress).to.have.property("reference");


        expect(response.body.payload.total).to.equal(product.price * quantity);

        expect(response.body.payload.priority).to.be.a("string");

    });

    it("Debe obtener las órdenes", async () => {

        const response = await requester.get("/api/orders");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Órdenes obtenidas exitosamente");

        expect(response.body.payload).to.be.an("array");

        if (response.body.payload.length > 0) {

            const order = response.body.payload[0];

            expect(order).to.have.property("_id");
            expect(order).to.have.property("buyer");
            expect(order).to.have.property("store");
            expect(order).to.have.property("products");
            expect(order.products).to.be.an("array");

            expect(order.products[0]).to.have.property("product");
            expect(order.products[0]).to.have.property("image");
            expect(order.products[0]).to.have.property("name");
            expect(order.products[0]).to.have.property("price");
            expect(order.products[0]).to.have.property("quantity");

            expect(order).to.have.property("deliveryAddress");
            expect(order.deliveryAddress).to.have.property("label");
            expect(order.deliveryAddress).to.have.property("address");
            expect(order.deliveryAddress).to.have.property("reference");

            expect(order).to.have.property("total");
            expect(order).to.have.property("status");
            expect(order).to.have.property("priority");
            expect(order).to.have.property("createdAt");
            expect(order).to.have.property("updatedAt");
        }

    });

    it("Debe obtener una orden por su ID", async () => {

        const response = await requester.get(`/api/orders/${orderId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");

        expect(response.body.message).to.equal("Orden obtenida exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", orderId);

        expect(response.body.payload).to.have.property("buyer");
        expect(response.body.payload).to.have.property("store");
        expect(response.body.payload).to.have.property("products");
        expect(response.body.payload.products).to.be.an("array");

        expect(response.body.payload.products[0]).to.have.property("product");
        expect(response.body.payload.products[0]).to.have.property("image");
        expect(response.body.payload.products[0]).to.have.property("name");
        expect(response.body.payload.products[0]).to.have.property("price");
        expect(response.body.payload.products[0]).to.have.property("quantity");

        expect(response.body.payload).to.have.property("deliveryAddress");
        expect(response.body.payload.deliveryAddress).to.have.property("label");
        expect(response.body.payload.deliveryAddress).to.have.property("address");
        expect(response.body.payload.deliveryAddress).to.have.property("reference");

        expect(response.body.payload).to.have.property("total");
        expect(response.body.payload).to.have.property("status");
        expect(response.body.payload).to.have.property("priority");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");
    
    });


    it("Debe obtener las órdenes de un comprador", async () => {
        
        const response = await requester.get(`/api/orders/buyer/${buyerId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Órdenes del comprador obtenidas exitosamente");

        expect(response.body.payload).to.be.an("array");

        if (response.body.payload.length > 0) {
            const order = response.body.payload[0];

            expect(order).to.have.property("_id");
            expect(order).to.have.property("buyer", buyerId);
            expect(order).to.have.property("store");
            expect(order).to.have.property("products");
            expect(order.products).to.be.an("array");
            expect(order).to.have.property("deliveryAddress");
            expect(order).to.have.property("total");
            expect(order).to.have.property("status");
            expect(order).to.have.property("priority");

            expect(order).to.have.property("createdAt");
            expect(order).to.have.property("updatedAt");

            expect(order.deliveryAddress).to.have.property("label");
            expect(order.deliveryAddress).to.have.property("address");
            expect(order.deliveryAddress).to.have.property("reference");

            expect(order.products[0]).to.have.property("product");
            expect(order.products[0]).to.have.property("image");
            expect(order.products[0]).to.have.property("name");
            expect(order.products[0]).to.have.property("price");
            expect(order.products[0]).to.have.property("quantity");
        }

    });


    it("Debe obtener las órdenes de una tienda", async () => {

        const response = await requester.get(`/api/orders/store/${storeId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Órdenes de la tienda obtenidas exitosamente");

        expect(response.body.payload).to.be.an("array");

        if (response.body.payload.length > 0) {

            const order = response.body.payload[0];

            expect(order).to.have.property("_id");
            expect(order).to.have.property("buyer");
            expect(order).to.have.property("store", storeId);
            expect(order).to.have.property("products");
            expect(order.products).to.be.an("array");
            expect(order).to.have.property("deliveryAddress");
            expect(order).to.have.property("total");
            expect(order).to.have.property("status");
            expect(order).to.have.property("priority");

            expect(order.products[0]).to.have.property("product");
            expect(order.products[0]).to.have.property("image");
            expect(order.products[0]).to.have.property("name");
            expect(order.products[0]).to.have.property("price");
            expect(order.products[0]).to.have.property("quantity");

            expect(order).to.have.property("createdAt");
            expect(order).to.have.property("updatedAt");

            expect(order.deliveryAddress).to.have.property("label");
            expect(order.deliveryAddress).to.have.property("address");
            expect(order.deliveryAddress).to.have.property("reference");

        }

    });


    it("Debe actualizar el estado de una orden", async () => {

        const statuses = Object.values(ORDER_STATUS);

        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

        const response = await requester.patch(`/api/orders/${orderId}/status`)
        .send({
            status: newStatus
        });

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Estado de la orden actualizado exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", orderId);
        expect(response.body.payload).to.have.property("buyer");
        expect(response.body.payload).to.have.property("store");
        expect(response.body.payload).to.have.property("products");
        expect(response.body.payload.products).to.be.an("array");

        expect(response.body.payload.products[0]).to.have.property("product");
        expect(response.body.payload.products[0]).to.have.property("image");
        expect(response.body.payload.products[0]).to.have.property("name");
        expect(response.body.payload.products[0]).to.have.property("price");
        expect(response.body.payload.products[0]).to.have.property("quantity");

        expect(response.body.payload).to.have.property("deliveryAddress");
        expect(response.body.payload.deliveryAddress).to.have.property("label");
        expect(response.body.payload.deliveryAddress).to.have.property("address");
        expect(response.body.payload.deliveryAddress).to.have.property("reference");

        expect(response.body.payload).to.have.property("total");

        // el estado se actualizado
        expect(response.body.payload).to.have.property("status",newStatus);

        expect(response.body.payload).to.have.property("priority");
        expect(response.body.payload).to.have.property("proof");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");

    });

    
    it("Debe actualizar la prioridad de una orden", async () => {

        const priorities = Object.values(DELIVERY_PRIORITY);

        const newPriority = priorities[Math.floor(Math.random() * priorities.length)];

        const response = await requester.patch(`/api/orders/${orderId}/priority`)
        .send({
            priority: newPriority
        });

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Prioridad de la orden actualizada exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", orderId);
        expect(response.body.payload).to.have.property("buyer");
        expect(response.body.payload).to.have.property("store");
        expect(response.body.payload).to.have.property("products");
        expect(response.body.payload.products).to.be.an("array");

        expect(response.body.payload.products[0]).to.have.property("product");
        expect(response.body.payload.products[0]).to.have.property("image");
        expect(response.body.payload.products[0]).to.have.property("name");
        expect(response.body.payload.products[0]).to.have.property("price");
        expect(response.body.payload.products[0]).to.have.property("quantity");

        expect(response.body.payload).to.have.property("deliveryAddress");
        expect(response.body.payload.deliveryAddress).to.have.property("label");
        expect(response.body.payload.deliveryAddress).to.have.property("address");
        expect(response.body.payload.deliveryAddress).to.have.property("reference");

        expect(response.body.payload).to.have.property("total");

        // la prioridad actualizada
        expect(response.body.payload).to.have.property("priority", newPriority);

        expect(response.body.payload).to.have.property("status");
        expect(response.body.payload).to.have.property("proof");
        expect(response.body.payload).to.have.property("createdAt");
        expect(response.body.payload).to.have.property("updatedAt");    

    });

    it("Debe actualizar el comprobante de pago de una orden", async () => {

        const response = await requester.patch(`/api/orders/${orderId}/proof`)
        .attach("proof", "tests/fixtures/comprobante.pdf");

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");

        expect(response.body.message).to.equal("Comprobante de la orden actualizado exitosamente");

        expect(response.body.payload).to.be.an("object");

        expect(response.body.payload).to.have.property("_id", orderId);
        expect(response.body.payload).to.have.property("buyer");
        expect(response.body.payload).to.have.property("store");
        expect(response.body.payload).to.have.property("products");

        expect(response.body.payload.products).to.be.an("array");

        expect(response.body.payload.products[0]).to.have.property("product");

        expect(response.body.payload.products[0]).to.have.property("image");

        expect(response.body.payload.products[0]).to.have.property("name");

        expect(response.body.payload.products[0]).to.have.property("price");

        expect(response.body.payload.products[0]).to.have.property("quantity");

        expect(response.body.payload).to.have.property("deliveryAddress");

        expect(response.body.payload.deliveryAddress).to.have.property("label");

        expect(response.body.payload.deliveryAddress).to.have.property("address");

        expect(response.body.payload.deliveryAddress).to.have.property("reference");

        expect(response.body.payload).to.have.property("total");

        expect(response.body.payload).to.have.property("status");

        expect(response.body.payload).to.have.property("priority");

        expect(response.body.payload).to.have.property("proof");

        expect(response.body.payload.proof).to.be.an("object");

        expect(response.body.payload.proof).to.have.property("originalName");

        expect(response.body.payload.proof).to.have.property("fileName");

        expect(response.body.payload.proof).to.have.property("path");

        expect(response.body.payload.proof).to.have.property("mimeType", "application/pdf");

        expect(response.body.payload.proof).to.have.property("size");

        expect(response.body.payload).to.have.property("createdAt");

        expect(response.body.payload).to.have.property("updatedAt");
    });
    


    it("Debe eliminar una orden", async () => {

        const response = await requester.delete(`/api/orders/${orderId}`);

        expect(response.status).to.equal(200);

        expect(response.body.status).to.equal("success");
        expect(response.body.message).to.equal("Orden eliminada exitosamente");

    });


});
