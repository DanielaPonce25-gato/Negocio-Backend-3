import { Router } from "express";

import {
    getMockUsers,
    getMockProducts,
    getMockOrders,
    getMockStores,
    getAllMockData,
    generateData
} from "../controllers/MockData.Controller.js";


const router = Router();

// Solo generan datos (NO guardan en la base)

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Genera usuarios falsos sin guardarlos en la base de datos.
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Usuarios generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Usuarios simulados generados exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MockUser'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

router.get("/mockingusers", getMockUsers);

/**
 * @swagger
 * /api/mocks/mockingproducts:
 *   get:
 *     summary: Genera productos falsos sin guardarlos en la base de datos.
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Productos generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Productos simulados generados exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MockProduct'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

router.get("/mockingproducts", getMockProducts);


/**
 * @swagger
 * /api/mocks/mockingorders:
 *   get:
 *     summary: Genera órdenes falsas sin guardarlas en la base de datos.
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Órdenes generadas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Órdenes simuladas generadas exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MockOrder'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

router.get("/mockingorders", getMockOrders);

/**
 * @swagger
 * /api/mocks/mockingstores:
 *   get:
 *     summary: Genera tiendas falsas sin guardarlas en la base de datos.
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Tiendas generadas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Tiendas simuladas generadas exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MockStore'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

router.get("/mockingstores", getMockStores);


/**
 * @swagger
 * /api/mocks/mockingall:
 *   get:
 *     summary: Genera usuarios, productos, órdenes y tiendas falsas.
 *     tags:
 *       - Mocks
 *     responses:
 *       200:
 *         description: Datos simulados generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Datos simulados generados exitosamente.
 *                 payload:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/MockUser'
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/MockProduct'
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/MockOrder'
 *                     stores:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/MockStore'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

router.get("/mockingall", getAllMockData);



// Genera y guarda en MongoDB

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Genera datos falsos y los guarda en MongoDB.
 *     tags:
 *       - Mocks
 *     responses:
 *       201:
 *         description: Datos generados y guardados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Datos generados y guardados exitosamente.
 *                 payload:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: integer
 *                       example: 50
 *                     products:
 *                       type: integer
 *                       example: 100
 *                     stores:
 *                       type: integer
 *                       example: 20
 *                     orders:
 *                       type: integer
 *                       example: 100
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
*/

router.post("/generateData", generateData);


export default router;

